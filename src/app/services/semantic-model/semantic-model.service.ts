import { SchemeUtils } from './../../utils/schema-utils';
import { HttpService } from './../http/http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
declare var jsonld;
@Injectable({
  providedIn: 'root'
})
export class SemanticModelService {

  constructor(private httpService: HttpService) { }




  public getAllTypes() {
    const userAction = async () => {
      const response = await fetch(SchemeUtils.schema_tree);
      const json = await response.json(); 
      return json;
    }
     return userAction();
    
  }
  public getType(scheme) {
    const userAction = async () => {
      const response = await fetch(SchemeUtils.schema_prefix + scheme + '.jsonld');
      const json = await response.json(); 
      return json;
    }
    return  userAction();
  }

  public triplets(doc){
    const nquads = jsonld.toRDF(doc, { format: 'application/n-quads' });
    nquads.then(
      function (success) {
        console.log(success);
        return success;
      }
    );
    return nquads;
  }
  public compacted(doc, context){
      const compacted = jsonld.compact(doc, context);
      return compacted;
    }

  
  generateCompacted(scheme,properties){
    var doc = {};
    var context = {};
    var noteEntityContext = {
      "@context": {
        "schema": "http://schema.org/"
      }
    }
    doc = this.processProperties(scheme,properties,context);
    let response ;

//    response = this.compacted(doc, context);
    //noteEntitydoc.set("https://schema.org/mainEntity", doc);
    var noteEntitydoc = {
      "@context": {
        "schema": "http://schema.org/",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
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
    response = this.compacted(noteEntitydoc, noteEntityContext);
    //this.triplets(noteEntitydoc);
    return response;
  }

  processProperties(type,properties,context) {
    var contextMap = new Map();
    var docMap = new Map();
    var doc = {};
    for (var p in properties) {
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
      doc['rdfs:label'] = doc['http://schema.org/name'];
      doc['@id'] = SchemeUtils.prefix + doc['http://schema.org/name'].split(' ').join('_');
      return doc;
    }




  
}
