import { RelationOntologyInstance } from './../../models/ontology/instance/relationOntologyInstance';
import { Ontology } from 'app/models/ontology/ontology';
import { DataPropertieValue } from './../../models/ontology/instance/dataPropertieValue';
import { ontologyClassInstance } from './../../models/ontology/instance/ontologyClassInstance';
import { SchemeUtils } from './../../utils/schema-utils';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
declare var jsonld;
import * as $ from 'jquery';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemanticModelService {



  private listEntitiesPath = '/api/semantic_entity/list';
  private getEntityPath = '/api/semantic_entity/describe';
  private listClassesOntologyPath = '/api/semantic_ontology/list_classes';
  private getBasicPropertiesPath = '/api/semantic_ontology/list_properties';
  private getRelationshipsPath = '/api/semantic_ontology/list_relations';
  
  constructor(private httpService: HttpService) { }

/*   getTypesTreejson(params,options = {}):Observable<OntologyClass[]> {
    return this.httpService.lpost(this.listClassesOntologyPath, params, { responseDataType: OntologyClass }) as Observable<OntologyClass[]>;
  }
 */
  getTypesTreejson(params,options = {}) {
    return this.httpService.lpost([this.listClassesOntologyPath, {}],params, options);
  }

  getBasicProperties(params,options = {}) {
    return this.httpService.lpost([this.getBasicPropertiesPath, {}], params, options);
  }

  getRelationships(params, options = {}){
    return this.httpService.lpost([this.getRelationshipsPath, {}], params, options);
  }

  public triplets(doc){
    const nquads = jsonld.toRDF(doc, { format: 'application/n-quads' });
    nquads.then(
      function (success) {
        return success;
      }
    );
    return nquads;
  }
  public compacted(doc, context){
      const compacted = jsonld.compact(doc, context);
      return compacted;
    }
  setContext(ontologyInstance: ontologyClassInstance){
    let ontology = ontologyInstance.ontologyClass.ontology;
    let context = {
      "@context": {
        "schema": "http://schema.org/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "transcriptor": `${environment.semantic_transcription.prefix}`
      }, 
      "@id": "http://test-lala.com/semantic-contribution-1",
      "@type":"schema:NoteDigitalDocument",
      "schema:mainEntity": {

      }
  
    }
    context["@context"][ontology.prefix] = ontology.url;
    return context;
  }

  generateJsonld(ontologyInstance:ontologyClassInstance){
    let context = this.setContext(ontologyInstance);
    let instance = {};
    let noteEntitydoc = this.setContext(ontologyInstance);
    let basicProp = this.processBasicProperties(ontologyInstance.properties,ontologyInstance.ontologyClass.ontology,instance);
    let relationProp = this.processRelationships(ontologyInstance.relations, ontologyInstance.ontologyClass.ontology, instance)
    instance['@type']=ontologyInstance.name;
/*     noteEntitydoc['@type'] = ontologyInstance.ontologyClass.ontology.prefix+':'+ "NoteDigitalDocument"; */
    noteEntitydoc['@id'] = `${environment.semantic_transcription.prefix}`+"semantic-contribution-" + Date.now();
    noteEntitydoc['rdfs:label'] = instance['rdfs:label'];
    noteEntitydoc['schema:mainEntity'] = instance;
    let response = this.compacted(noteEntitydoc, context);
    response.then(docCompacted => {
    })
    return response;

  }

  processBasicProperties(properties: Array<DataPropertieValue>,ontology:Ontology,instance,isRelation=false) {
    var basicPropertieMap = new Map();
    properties.forEach(propertie => {

      if (propertie.name!='label'){
        basicPropertieMap.set(propertie.getNameWithPrefix(),propertie.value);
      }else{
        basicPropertieMap.set('rdfs:label', propertie.value);
       
      }
    });
    if(!isRelation){
      basicPropertieMap.set('@id', `${environment.semantic_transcription.prefix}` +basicPropertieMap.get('rdfs:label').split(' ').join('_'));
    }else{
      basicPropertieMap.set('@id', `${environment.semantic_transcription.prefix}` + basicPropertieMap.get('rdfs:label').split(' ').join('_'));
    }
    basicPropertieMap.forEach((value, key) => {
      instance[key] = value;
    });
    return basicPropertieMap;
  }
  processRelationships(relationships: Array<RelationOntologyInstance>, ontology: Ontology,instance){
    var relationMap = new Map();
   // var relationInstance = {};
    relationships.forEach(relation =>{
      if (relation.searchRelationship){
        relationMap.set(relation.getName(), relation.relationPersisted);
        instance[relation.getName()] = relation.relationPersisted;
      }else{
        var relationInstance = {};
        let body = this.processBasicProperties(relation.properties, ontology, relationInstance,true);
        relationInstance['@type'] = relation.type;
        instance[relation.getName()] = relationInstance;
        relationMap.set(relation.getName(),body);
      }
    })
    return relationMap;
  }

  generateCompacted(scheme,properties,processProperties = true){
    var doc = {};
    var context = {};
    var noteEntityContext = {
      "@context": {
        "schema": "http://schema.org/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "transcriptor": `${environment.semantic_transcription.prefix}`
      }
    }


    if (processProperties){
      doc = this.processProperties(scheme,properties,context);
    }else{
      doc = properties;

    }
    let response ;

//    response = this.compacted(doc, context);
    //noteEntitydoc.set("https://schema.org/mainEntity", doc);

    var noteEntitydoc = {
      "@context": {
        "schema": "http://schema.org/",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "transcriptor": `${environment.semantic_transcription.prefix}`
      },

      "@id": "http://test-lala.com/semantic-contribution-1",
      "@type": "schema:NoteDigitalDocument",
      "http://schema.org/mainEntity": {
      
      }
    }
    noteEntitydoc['@type'] = SchemeUtils.schema_prefix+"NoteDigitalDocument";
    noteEntitydoc['@id'] = SchemeUtils.prefix + "semantic-contribution-" + Date.now();
    noteEntitydoc['http://schema.org/mainEntity']=doc;
    noteEntitydoc['rdfs:label'] = noteEntitydoc['http://schema.org/mainEntity']['rdfs:label'];
    if (properties && processProperties){
      properties.forEach((prop,key) => {
        if (prop.searchRelationship){
          noteEntitydoc['http://schema.org/mainEntity'][`${environment.semantic_transcription.prefix}`+prop.name]=prop.model
        }
      });
    }

    response = this.compacted(noteEntitydoc, noteEntityContext);
    return response;
  }

  processProperties(type,properties,context) {
    var contextMap = new Map();
    var docMap = new Map();
    var doc = {};
    var label =''
    for (var p in properties) {
      if (properties[p].searchRelationship){
        continue;
      }
      if (properties[p].name=='label'){
        label = properties[p].model;
        continue;
//        docMap.set(properties[p].name, properties[p].model);
      }
     if (properties[p].scheme) {
      //docMap.set("http://schema.org/" + properties[p].name, this.processProperties(properties[p].scheme.properties, context));
       docMap.set("http://schema.org/" + properties[p].name, this.processProperties(properties[p].type,properties[p].scheme,context));
       contextMap.set(properties[p].name, "http://schema.org/" + properties[p].type);
      }else{
          docMap.set("http://schema.org/" + properties[p].name, properties[p].model)
          contextMap.set(properties[p].name, "http://schema.org/" + properties[p].name);
        }
      }
      contextMap.forEach((value, key) => {
        context[key] = value;
      });
      docMap.forEach((value, key) => {
        doc[key] = value;
      });
      doc['@type'] = SchemeUtils.schema_prefix+type;
      doc['rdfs:label'] = label;
      doc['@id'] = SchemeUtils.prefix + label.split(' ').join('_');
      return doc;
    }

    listEntities(filter, options = {}) {
      return this.httpService.lpost(this.listEntitiesPath, filter, options);
    }

    getEntity(entityId, useDefaultSchema, options = {}) {
      var getEntityPathWithParams = `${this.getEntityPath}?entity_id=${entityId}`
      getEntityPathWithParams = useDefaultSchema ? `${getEntityPathWithParams}&use_default_schema=${useDefaultSchema}` : getEntityPathWithParams
      return this.httpService.lget(getEntityPathWithParams, options);
    }
  
}
