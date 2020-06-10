import { SchemaPropertie } from './../models/scheme/propertie';
import { SchemaPrefixUtils } from './schema-prefix-utils';
import { environment } from 'environments/environment';

export class SchemeUtils {
    public static prefix = SchemaPrefixUtils.prefix
    public static keyPrefix = SchemaPrefixUtils.keyPrefix;
    public static schema_prefix = SchemaPrefixUtils.schema_prefix
    public static prefix_schema = SchemaPrefixUtils.prefix_schema
    public static schema_tree = `${environment.apiUrl}/files/tree.jsonld`
    public static schema_properties = `${environment.apiUrl}/api/schemaorg/`
    public static local_sources = false;
    public static basicTypes = [
        'http://schema.org/Integer',
        'http://schema.org/Time', 
        'http://schema.org/Text', 
        'http://schema.org/Date', 
        'http://schema.org/Boolean', 
        'http://schema.org/DateTime', 
        'http://schema.org/Number', 
        'http://schema.org/measuredValue',
        'Integer',
        'Time',
        'Text',
        'Date',
        'Boolean',
        'DateTime',
        'Number',
        'measuredValue'];

    public static getSlug(id){
        var res = id;
        if (id != null && id.includes(SchemeUtils.prefix)){
            res = id.substring(SchemeUtils.prefix.length, id.length);
        }
        if (id != null && id.includes(SchemeUtils.keyPrefix)) {
            res = id.substring(SchemeUtils.keyPrefix.length, id.length);
        }
        return res;
    }

    public static extractPrefix(str){
        return SchemaPrefixUtils.extractPrefix(str)
    }
    public static getTypeFromPrefix(str){
        return SchemaPrefixUtils.getTypeFromPrefix(str);
    }
    /** this method extract schema.org and schema: */
    public static extractAllPrefix(str){
        return SchemaPrefixUtils.extractAllPrefix(str);
    }

    public static buildProperties(graphjson){
        let schemaProperties = new Array<SchemaPropertie>();
        if(graphjson!=null){
            graphjson.forEach(propertie => {
                if (propertie['@type'] == "rdfs:Property" && propertie['schema:rangeIncludes']){
                   
                    let prop = new SchemaPropertie(propertie);
                    schemaProperties.push(prop);
                }
            });
        }
        return schemaProperties;
    }

    public static getPropertiesForType(properties,type=null,parents=null) {
        let schemaProperties = new Array < SchemaPropertie>();
        if(type){
            let types = type.split('>');
            for (let propertie in properties) {
                let prop = new SchemaPropertie(properties[propertie]);
                let found = false;
                types.forEach(type => {
                    if (!found && prop.domainIncludes.includes(type)){
                        schemaProperties.push(prop);
                        found=true;
                    }
                });
            
            }
        }else{
            for (let propertie in properties) {
                let prop = new SchemaPropertie(properties[propertie]);
                schemaProperties.push(prop);
            }
        }
        return schemaProperties; 
    }

    public static getMarksAsNoteDigitalDocument(mark,semanticContribution) {
        let propertiesSelected = new Array<any>();
        if (semanticContribution['schema:mainEntity']) {
            semanticContribution = semanticContribution['schema:mainEntity'];
            }
            console.log(semanticContribution);
        for (let key in semanticContribution) {
            const item = semanticContribution[key];
                if (item['@type']) {
                    let propOfScheme = new Array<any>();
                    for (let itemKey in item) {
                        if (itemKey != '@type' && itemKey != '@id' && itemKey != 'rdfs:label' && itemKey != 'http://www.w3.org/2000/01/rdf-schema#label') {
                            propOfScheme.push({ name: SchemeUtils.extractPrefix(itemKey), value: item[itemKey], model: item[itemKey] });
                        }
                    }
                    propertiesSelected.push({ name: SchemeUtils.extractPrefix(key), value: propOfScheme, model: propOfScheme, isArray: true, schema_type: item['@type'] });
                } else {
                    if (key == "schema:name") {
                        mark.name = item
                    }
                    if (key != '@type' && key != '@id' && key != 'rdfs:label' && key !='http://www.w3.org/2000/01/rdf-schema#label') {
                        propertiesSelected.push({ name: SchemeUtils.extractPrefix(key), value: item, model: item, isArray: false, schema_type: null });
                    }
                }
            }
            return propertiesSelected;
        
    }


    public static  getAtributes(properties) {
        let basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number', 'measuredValue'];
        let propertiesSelected = new Array<any>();
        let relationships = new Array<any>();
        for (var prop in properties) {
            if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
                let types = new Array<any>();
                if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
                    properties[prop]['schema:rangeIncludes'].forEach(element => {
                        if (basicTypes.includes(element['@id'].split(':')[1])) {
                            types.push(element['@id'].split(':')[1]);
                            }
                        });
                } else {
                    if (basicTypes.includes(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1])) {
                        //agregar si es name, pushearlo y no ponerlo como atributo elegible
                        if (properties[prop]['@id'].split(':')[1] == 'name') {
                            propertiesSelected.push({ name: properties[prop]['@id'].split(':')[1], value: '', model: '', type: types, scheme: null });
                        }
                        types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
                    }
                    else{
                        relationships.push({ name: properties[prop]['@id'].split(':')[1], description: properties[prop]['rdfs:comment'] });
                    }
                }
                if (types.length > 0) {
                   properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false, description: properties[prop]['rdfs:comment'] });
                }
            }
        }
        return { relationships: relationships, propertiesSelected:propertiesSelected,properties:properties};
    }
    
    public static processProperties(properties) {
        for (var prop in properties) {
            //     console.log(properties[prop]['rdfs:label']);
            //      console.log(properties[prop]['@type']);
            //ver el caso de Text para el esquema URL
            //properties[prop]['@type'] && 
            if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
                let types = new Array<any>();
                if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
                    properties[prop]['schema:rangeIncludes'].forEach(element => {
                        types.push(element['@id'].split(':')[1]);
                    });
                } else {
                    //            console.log(properties[prop]['schema:rangeIncludes']);
                    types.push(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1]);
                }
                //this.properties.push({ name: properties[prop]['@id'].split(':')[1], types: types, selected: false, description: properties[prop]['rdfs:comment'] });
            }
        }
    }
}

