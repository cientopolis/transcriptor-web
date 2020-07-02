import { Ontology } from './../../models/scheme/ontology';
import { SchemeUtils } from './../../utils/schema-utils';
import { HttpService } from './../http/http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
declare var jsonld;
import * as $ from 'jquery';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemanticModelService {
  private getTreejsonld = '/files/tree.jsonld';
  private getTreejson = '/api/schemaorg/config/tree';
  private fullProperties = '/files/fullproperties.json';
  private listEntitiesPath = '/api/semantic_entity/list';
  private getEntityPath = '/api/semantic_entity/describe';
  // new
  private listOntologiesPath = '';
  
  constructor(private httpService: HttpService) { }

/*   getTypesTreejsonld(options = {})  {
    return this.httpService.get([this.getTreejsonld, {}], options);
  }
 */
  getTypesTreejson(options = {}) {
    return this.httpService.lget([this.getTreejson, {}], options);
  }

  getAllProperties(options = {}) {
    return this.httpService.get([this.fullProperties, {}], options);
  }

  getLocalSchemaProperties(options = {}) {
      return $.getJSON("assets/tmp/fullproperties.jsonld", function (datos) {
    })
  }

  getOntologies(options={}){
    console.log('getOntologies');
    this.httpService.get([this.listOntologiesPath],options);
    //por ahi recibir los prefijos asi nos ahorramos urls
    const response = [
        { 'name': 'schema', 'description': 'Esquema ontology'}, 
        { 'name': 'lalalal', 'description': 'lalaOntology'}
      ];
    let ontologies = Ontology.mapOntologies(response);
    console.log(ontologies);
    return ontologies;
  }

  public getAllTypes(ontology=null) {
    const userAction = async () => {
      console.log(SchemeUtils.schema_tree);
      const response = await fetch(SchemeUtils.schema_tree);
      const json = await response.json();
      return json;
    }
    return userAction();
  }



  public getType(scheme) {
    if (SchemeUtils.local_sources) {
       this.getLocalSchemaProperties();
    } else {
      const userAction = async () => {

//        const response = await fetch(SchemeUtils.schema_prefix + scheme + '.jsonld');
        const response = await fetch(SchemeUtils.schema_properties+scheme);
        let json = await response.json(); 
        if(json['@graph']){
          json = json['@graph'];
        }
        //return SchemeUtils.getPropertiesForType(json,scheme);
        return SchemeUtils.buildProperties(json);
        
      }
      return  userAction();
    }
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

    console.log(scheme);
    console.log(properties);
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
