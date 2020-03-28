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
    var contextMap = new Map();
    var docMap = new Map();
    var doc = {};
    var context = {};

    for (var p in properties) {
      contextMap.set(properties[p].name, "http://schema.org/" + properties[p].name);
      docMap.set("http://schema.org/" + properties[p].name, properties[p].model)
    }
    contextMap.forEach((value, key) => {
      context[key] = value;
    });
    docMap.forEach((value, key) => {
      doc[key] = value;
    });
    let response ;
    response = this.compacted(doc, context);

    
    return response;
  }







  
}
