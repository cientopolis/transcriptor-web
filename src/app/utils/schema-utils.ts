export class SchemeUtils {
    public static prefix = "http://transcriptor-dev.com/"
    public static schema_prefix = "https://schema.org/"
    public static schema_tree = "https://schema.org/docs/tree.jsonld"

    public static getSlug(id){
        var res = "";
        if(id!=null){
            res = id.substring(SchemeUtils.prefix.length, id.length);
        }
        return res;
    }


    public static getMarksAsNoteDigitalDocument(mark,semanticContribution) {
        let propertiesSelected = new Array<any>();
        if (semanticContribution['schema:mainEntity']) {
            semanticContribution = semanticContribution['schema:mainEntity'];
            }
        console.log(semanticContribution);
        for (let key in semanticContribution) {
            console.log(semanticContribution[key]);
            const item = semanticContribution[key];
                if (item['@type']) {
                    console.log("es una relacion");
                    let propOfScheme = new Array<any>();
                    for (let itemKey in item) {
                        console.log(item[itemKey]);
                        if (itemKey != '@type' && itemKey != '@id' && itemKey != 'rdfs:label') {
                            propOfScheme.push({ name: itemKey, value: item[itemKey], model: item[itemKey] });
                        }
                    }
                    propertiesSelected.push({ name: key, value: propOfScheme, model: propOfScheme, isArray: true, schema_type: item['@type'] });
                } else {
                    if (key == "schema:name") {
                        mark.name = item
                    }
                    if (key != '@type' && key != '@id' && key != 'rdfs:label') {
                        propertiesSelected.push({ name: key, value: item, model: item, isArray: false, schema_type: null });
                    }
                }
            }
            return propertiesSelected;
        
    }


    public static  getAtributes(properties) {
        let basicTypes = ['Time', 'Text', 'Date', 'Boolean', 'DateTime', 'Number', 'measuredValue'];
        let propertiesSelected = new Array<any>();
        let relationships = new Array<any>();
        console.log("processLastLevel");
        for (var prop in properties) {
            if (properties[prop]['@type'] != "rdfs:Class" && properties[prop]['schema:rangeIncludes']) {
                let types = new Array<any>();
                console.log(properties[prop]['@id'].split(':')[1]);
                if (properties[prop]['schema:rangeIncludes'] != null && properties[prop]['schema:rangeIncludes'].length) {
                    properties[prop]['schema:rangeIncludes'].forEach(element => {
                        if (basicTypes.includes(element['@id'].split(':')[1])) {
                            types.push(element['@id'].split(':')[1]);
                            }
                        });
                } else {
                    if (basicTypes.includes(properties[prop]['schema:rangeIncludes']['@id'].split(':')[1])) {
                        //agregar si es name, pushearlo y no ponerlo como atributo elegible
                        console.log(properties[prop]['@id'].split(':')[1]);
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
        console.log(relationships);
        console.log(propertiesSelected);
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

