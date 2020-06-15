import { SchemeUtils } from './../../../utils/schema-utils';
import { HeaderService } from './../../../services/sharedData/header.service';
import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
declare const MStepper: any;


@Component({
  selector: 'app-semantic-form',
  templateUrl: './semantic-form.component.html',
  styleUrls: ['./semantic-form.component.scss']
})
export class SemanticFormComponent implements OnInit,OnChanges {
  loader:Boolean=true;
  showSelectSchema:Boolean=false;
  showCompleteForm=false;
  schemas:Array<any>;
  scheme: any;
  schemeParents:string;
  properties:Array<any>;
  propertiesSelected= new Array<any>();
  //
  basicProperties = new Array<any>();
  relationProperties = new Array<any>();

  searchText:any;
  schema_type: String = null;
  showGeneratedScheme:Boolean = false;
  @Output() public schemeComplete = new EventEmitter<any>();
  
  @Input() public mark = null;
  @Input() public layerName = null;
  semanticContribution:any;
  parents= new Array<any>();
  renderedMarksFormatted = [];
  @Input() renderedMarks = null;
  typesSupported = new Map();
  level = 0;
  relationships = new Array<any>();
  markView=null;

  notifyNextStep1 = false;
  notifyNextStep2 = false;
  notifyNextStep3 = false;
  // deberia ser false y nulo
  //showPropertiesSelection=true;
  //schemeName:String='Person';

  showPropertiesSelection = false;
  schemeName: String;
  showActionStep1=true;
  showActionStep2 = false;
  showActionStep3 = false;
  showActionStep4 = false;
  actualStep ='step1';
  public formValid = false;
  constructor(
            private semanticService: SemanticModelService,
            private changeDetector: ChangeDetectorRef,
            private headerService: HeaderService) {
    }

/*
  selectPropertie(propertie ,$event) {
    if (propertie.selected) {
      this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: this.typesSupported.get(propertie.name) });
    }else{
      this.propertiesSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
      });
    }

  }
*/
  
  ngOnChanges(changes){
    if (changes.mark.currentValue){
      if (changes.mark.currentValue.semanticContribution == null) {
       /* this.semanticService.getAllTypes().then(result => {
          this.schemas = result.children;
          console.log("loader is true");
          console.log(this.loader);
          this.scheme = result;
          this.parents.push(result);
          this.schemas = result.children;
          this.loader = false;
          
          this.changeDetector.detectChanges();
        });*/
        var stepper = document.querySelector('.stepper');
        var stepperInstace = new MStepper(stepper, {
          // options
          firstActive: 0, // this is the default
          linearStepsNavigation: true,
          // Auto focus on first input of each step.
          autoFocusInput: false,
          // Set if a loading screen will appear while feedbacks functions are running.
          showFeedbackPreloader: true,
          // Auto generation of a form around the stepper.
          autoFormCreation: true,
          // Function to be called everytime a nextstep occurs. It receives 2 arguments, in this sequece: stepperForm, activeStepContent.
         // more about this default functions below
          // Enable or disable navigation by clicking on step-titles
          stepTitleNavigation: true,
          // Preloader used when step is waiting for feedback function. If not defined, Materializecss spinner-blue-only will be used.
          feedbackPreloader: '<div class="spinner-layer spinner-blue-only">...</div>'

        });

        this.showSelectSchema = true;
        //$('#first-step').addClass('disabled')
      } else {
        // es pobible que no se llame mas revisar
        this.getSemanticContribution();
        this.showSelectSchema = false;
        //this.showGeneratedScheme = true;
      }
    }
  }

  setHeader(){
    this.headerService.headerParagraph = this.layerName;
    this.headerService.headerSubparagraph = null;
    this.headerService.header = "Nueva Marca";
    this.headerService.showDetails = false;
    this.headerService.headerStep = true;
    this.headerService.stepNumber = 1;
  }


  ngOnInit() {
    this.setHeader();
    /*
    if (this.mark.semanticContribution==null){
      this.semanticService.getAllTypes().then(result => {
        this.loader = false;
        this.parents.push(result);
        this.schemas = result.children;
        this.parents.push();
        this.showSelectSchema = true;
      });
    }else{
      this.getSemanticContribution();
      this.loader = false;
      this.showSelectSchema = false;
      this.showGeneratedScheme=true;
    }*/
  }

  getSemanticContribution() {
    if (this.mark.semanticContribution) {
      this.schema_type = this.mark.semanticContribution.schema_type;
//      this.propertiesSelected = new Array<any>();
      let properties = new Array<any>();
      let sContribution = JSON.parse(this.mark.semanticContribution.text);
      for (let key in sContribution) {
        if(key!="@context"){
          const item = sContribution[key];
          properties.push({ name: key, value: item, model: item });
        }
      }
      this.propertiesSelected=properties;
      this.semanticContribution = this.mark.semanticContribution;
    } 
  }

validateStepOne() {
  return false;
}
selectSchema(scheme){
/*   console.log(scheme); */
//  let hierarchy = scheme.split(">");
  if(this.schemeName==scheme){
    return;
  }
  this.formValid=false;
  this.handlePropertieValidation(this.formValid);
  this.schemeName = scheme;
  this.propertiesSelected = new Array<any>(); 
  this.basicProperties = new Array<any>();
  this.relationProperties = new Array<any>();
  this.properties = new Array<any>();
  this.stepTwo();
}
stepTwo(){
  this.showPropertiesSelection = true;
  this.showCompleteForm=true;
}

handleScheme(event){
  this.addProperties(event.propertiesSelected,false);
  if (this.properties==null || this.properties.length==0){
    this.properties = event.properties;
  }

  //this.basicProperties = event.propertiesSelected;
  
  
  //this.notifyNextStep2 = false;
}
addProperties(properties,relationship){
  if (relationship){
    this.mergeRelationships(properties);
  }else{
    this.mergeProperties(properties)
  }
}

  mergeProperties(properties) {
    let indexes = new Array<any>();
    this.propertiesSelected.forEach((propSelected, index) => {
      if (!propSelected.scheme) {
        indexes.push(index);
      }
    });
    indexes.forEach(indez => {
      this.propertiesSelected.splice(indez, 1);
    });
    properties.forEach(propertie => {

      if (!propertie.scheme || (propertie.properties && properties.length > 0)) {
        this.propertiesSelected.push(propertie);
      } else {

      }
    });

  }
  mergeRelationships(properties){
    let indexes= new Array<any>();
    this.propertiesSelected.forEach((propSelected, index) => {
      //let found = false;
      if (propSelected.scheme) {
        indexes.push(index);

/*         console.log('Es relacion propSelected');
        properties.forEach(propertie => {
          console.log(propertie);
          if(propSelected.name==propertie.name){
            console.log('Encontro');
            found=true;
          }
        });
        if(!found){
          console.log('No entro');
          console.log(this.propertiesSelected);
          console.log(index);
          indexes.push(index);
//          this.propertiesSelected.slice(index,1);
          console.log(this.propertiesSelected);
        }else{
          console.log('Entro');
        } */
      }
      /*     if (item.name.toLowerCase() === propertie.name.toLowerCase()){ 
        this.relationshipsSelected.splice(index, 1);
        console.log(this.relationshipsSelected);
      } */
    });
    indexes.forEach(indez =>{
      this.propertiesSelected.splice(indez, 1);
    });
    properties.forEach(propertie => {
      if ((propertie.scheme && propertie.scheme.length > 0) || propertie.searchRelationship) {
        this.propertiesSelected.push(propertie);
      }else{

      }

    });

}

handleSchemeRelationships(event){
  /* event.relationshipsSelected.forEach(relationship => {
    this.propertiesSelected.push(relationship);
  });*/
  //deberia borrar la relacion
  this.addProperties(event.relationshipsSelected,true);
  this.showGeneratedScheme = true;
  this.saveScheme(false);
}

  
  saveScheme(confirm){
    let e = this.semanticService.generateCompacted(this.schemeName,this.propertiesSelected).then(
      function (success) {
        //console.log(component);
        return success;
      }
    );
    e.then(
      result => {
        let resultShow = JSON.parse(JSON.stringify(result));
        let show = resultShow['schema:mainEntity'];
        for (let key in show) {
          const item = show[key];
          if(item['@id']){
            for (let r in item) {
              let relation = item[r];
              let relationArray = '';
              if(Array.isArray(relation) ){
                relation.forEach( elem => {
                  if (elem['rdfs:label']){
                    if (Array.isArray(elem['rdfs:label'])){
                      relationArray = elem['rdfs:label'].join(',');
                    }else{
                      relationArray = elem['rdfs:label'];
                    }
                   }else{
                   }
                })
              }
              if (relation['@id']) {
                relationArray = relation['rdfs:label'];
              }
              if (relationArray!=''){
                item[r] = relationArray;
              }
            }
          }

          if (Array.isArray(item['@type'])) {
            item['@type'] = item['@type'][0];
          }

        }
        this.schema_type="http://schema.org/" + this.schemeName
        this.markView = { semanticContribution: { text: resultShow, schema_type: this.schema_type} };
        if(confirm){
          this.schemeComplete.emit({ schema_type: this.schema_type, semantic_text: result, contribution_slug: SchemeUtils.getSlug(result['@id'])} );
        }
        this.showCompleteForm=false;
        this.showGeneratedScheme=true;
        return result;
      }
    );
  }
  finish(){
    this.saveScheme(true);
  }

  saveProperties(){
    this.notifyNextStep2=true;
    
  }

  turnDownStepTwo(){

  }

  validateInputs(){
   // this.formValid=false;
  }
  handlePropertieValidation(event = null){

    if(event!=null){
      this.formValid = event;
    }else{
      event=true;
    }
    if(event){
      let a = $('#first-step .btn-floating');
      a.prop('disabled', false);
      a.parent().css({ pointerEvents: "auto" });
      a.removeClass('disabled');
    }else{
        let a = $('#first-step .btn-floating');
        a.parent().css({ pointerEvents: "none" });
        a.prop('disabled',true);
        a.addClass('disabled')
    }
  }
  next(step){
   
    this.actualStep=step;
    if (this.actualStep == step){
      switch (step) {
        case "step1": {
          this.actualStep = "step2";
          break;
        }
        case "step2": {
          this.actualStep = "step3";
          break;
        }
        case "step3": {
          this.actualStep = "step4";
          break;
        }
      
        }
        step=this.actualStep;
    }
    switch (step) {
      case "step2": {
        //llamar validador de inouts
        this.showActionStep1=false;
        this.showActionStep2=true;
        this.showActionStep3=false;
        this.showActionStep4 = false;
        this.notifyNextStep1=true;
        this.handlePropertieValidation(this.formValid);
        break;
      }
      case "step3": {
        this.turnDownStepTwo();
        this.saveProperties();
        this.showActionStep1 = false;
        this.showActionStep2 = false;
        this.showActionStep3 = true;

        this.showActionStep4 = false;
        break;
      }
      case "step4": {
        this.notifyNextStep3=true;
        this.showActionStep1 = false;
        this.showActionStep2 = false;
        this.showActionStep3 = false;
        this.showActionStep4 = true;
        break;
      }
  }
}
  back(step){
    this.actualStep = step;
    if (this.actualStep == step) {
      switch (step) {
        case "step2": {
          this.actualStep = "step1";
          this.handlePropertieValidation(null);
          break;
        }
        case "step3": {
          this.actualStep = "step2";
          break;
        }
        case "step4": {
          this.actualStep = "step3";
          break;
        }

      }
      step = this.actualStep;
    }
    switch (step) {
      case "step1": {
        this.showActionStep1 = true;
        this.showActionStep2 = false;
        this.showActionStep3 = false;
        this.showActionStep4 = false;
        this.notifyNextStep1 = false;
        break;
      }
      case "step2": {
        this.notifyNextStep2 = false;
        this.showActionStep1 = false;
        this.showActionStep2 = true;
        this.showActionStep3 = false;
        this.showActionStep4 = false;
      

        break;
      }
      case "step3": {
        this.notifyNextStep3 = false;
        this.showActionStep1 = false;
        this.showActionStep2 = false;
        this.showActionStep3 = true;
        this.showActionStep4 = false;
        break;
      }
      case "step4": {
        this.showActionStep1 = false;
        this.showActionStep2 = false;
        this.showActionStep3 = false;
        this.showActionStep4 = true;
        break;
      }
    }
  }



}
