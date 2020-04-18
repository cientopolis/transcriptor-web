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
      const response = await fetch('https://schema.org/docs/tree.jsonld');
      const json = await response.json(); 
      console.log(json.children);
      return json;
    }
     return userAction();
    
  }
  public getType(scheme) {
    const userAction = async () => {
      const response = await fetch('https://schema.org/' + scheme + '.jsonld');
      const json = await response.json(); 
      console.log(json.children);
      return json;
    }
    return  userAction();
  }
  public compacted(doc, context){
      const compacted = jsonld.compact(doc, context);
      return compacted;
    }

  
  generateCompacted(properties){
    var doc = {};
    var context = {};
    doc = this.processProperties(properties,context);

    let response ;
    console.log("------------------");
    console.log(doc);
    console.log(context);
    console.log("------------------");
    response = this.compacted(doc, context);

    
    return response;
  }

  processProperties(properties,context) {
    console.log("processProperties");
    console.log(properties);
    console.log(context);
    var contextMap = new Map();
    var docMap = new Map();
    var doc = {};
    for (var p in properties) {
     if (properties[p].scheme) {
        docMap.set("http://schema.org/" + properties[p].name, this.processProperties(properties[p].scheme.properties,context));
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


      return doc;
    }




  
}
