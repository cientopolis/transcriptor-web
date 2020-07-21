import { MarkSemanticRelation } from './../../models/marksemanticrelation';
import { Observable } from 'rxjs';
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
  private postRelationPath = '/api/semantic_entity/add_relation';


  constructor(private httpService: HttpService) { }

/*   getTypesTreejson(params,options = {}):Observable<OntologyClass[]> {
    return this.httpService.lpost(this.listClassesOntologyPath, params, { responseDataType: OntologyClass }) as Observable<OntologyClass[]>;
  }
 */
  addRelation(relation:MarkSemanticRelation,options = {}){

    return this.httpService.post(this.postRelationPath, {
      "subject_id": relation.subject_id,
      "predicate_id": relation.predicate_id,
      "object_id": relation.object_id
    }, { responseDataType: MarkSemanticRelation }) as Observable<MarkSemanticRelation>;;
  }
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
  setContext(ontologyInstance: ontologyClassInstance = null){
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
    if (ontologyInstance){
      let ontology = ontologyInstance.ontologyClass.ontology;
      context["@context"][ontology.prefix] = ontology.url;
    } 
    return context;
  }


  generateJsonld(ontologyInstance:ontologyClassInstance = null,entityPreviousSaved = null){
    console.log('param received');
    console.log(ontologyInstance);
    let context = this.setContext(ontologyInstance);
    let instance = {};
    let noteEntitydoc = this.setContext(ontologyInstance);

    if(!entityPreviousSaved){
      this.processBasicProperties(ontologyInstance.properties,ontologyInstance.ontologyClass.ontology,instance);
      this.processRelationships(ontologyInstance.relations, ontologyInstance.ontologyClass.ontology, instance)
      instance['@type']=ontologyInstance.name;

    }else{
      instance = entityPreviousSaved;
    }
/*     noteEntitydoc['@type'] = ontologyInstance.ontologyClass.ontology.prefix+':'+ "NoteDigitalDocument"; */
    noteEntitydoc['@id'] = `${environment.semantic_transcription.prefix}`+"semantic-contribution-" + Date.now();
    noteEntitydoc['rdfs:label'] = instance['rdfs:label'];
    noteEntitydoc['schema:mainEntity'] = instance;
    console.log('instance',instance);
    let response = this.compacted(noteEntitydoc, context);
    response.then(docCompacted => {
      console.log('compacted',docCompacted);
    })
    return response;

  }

  processBasicProperties(properties: Array<DataPropertieValue>,ontology:Ontology,instance,isRelation=false) {
    var basicPropertieMap = new Map();
    properties.forEach(propertie => {
      console.log('propertie de data propertie es:',propertie.property);
      if (propertie.name!='label'){
        basicPropertieMap.set(propertie.property,propertie.value);
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
      console.log('propertie de relation propertie es:', relation.property);
      if (relation.searchRelationship){
        relationMap.set(relation.property, relation.relationPersisted);
        instance[relation.property] = relation.relationPersisted;
      }else{
        var relationInstance = {};
        let body = this.processBasicProperties(relation.properties, ontology, relationInstance,true);
        relationInstance['@type'] = relation.type;
        instance[relation.property] = relationInstance;
        relationMap.set(relation.property,body);
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
    //https://himalia.ddns.net:8080/api/semantic_entity/describe?entity_id=slu&use_default_schema=true&is_contribution=true
    getEntity(entityId, useDefaultSchema,isContribution = false, options = {}) {
      var getEntityPathWithParams = `${this.getEntityPath}?entity_id=${entityId}`
      getEntityPathWithParams = useDefaultSchema ? `${getEntityPathWithParams}&use_default_schema=${useDefaultSchema}` : getEntityPathWithParams
      getEntityPathWithParams = isContribution ? `${getEntityPathWithParams}&is_contribution=${isContribution}` : `${getEntityPathWithParams}&is_contribution=${isContribution}`;
      return this.httpService.lget(getEntityPathWithParams, options);
    }
}
