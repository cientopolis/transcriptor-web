import { SemanticModelService } from './../../../services/semantic-model/semantic-model.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-semantic-form',
  templateUrl: './semantic-form.component.html',
  styleUrls: ['./semantic-form.component.scss']
})
export class SemanticFormComponent implements OnInit,OnChanges {
  loader:Boolean=true;
  showSelectSchema:Boolean=false;
  showPropertiesSelection=false;
  showCompleteForm=false;
  schemas:Array<any>;
  scheme: any;
  properties:Array<any>;
  propertiesSelected: Array<any>;
  searchText:any;
  schema_type: String = null;
  showGeneratedScheme:Boolean = false;
  @Output() public schemeComplete = new EventEmitter<any>();
  @Input() public mark = null;
  semanticContribution:any;
  parents= new Array<any>();
  renderedMarksFormatted = [];
  @Input() renderedMarks = null;
  typesSupported = new Map();
  level = 2;
  schemeName:String;

  public options: Pickadate.DateOptions = {
   /* monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
   */
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septembre', 'Octubre', 'Noviembre', 'Deciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Domingo', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    //color: '#e65100',
    clear: 'Limpiar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy' // Today button text
  };

  public timepickerOptions: Pickadate.TimeOptions = {
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: () => alert('AfterShow has been invoked.'), // function for after opening timepicker
  };

  public dateOfBirth = '2017-08-12';

  constructor(private semanticService: SemanticModelService,
             private changeDetector: ChangeDetectorRef) {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      let options = {}
      //var instances = M.Datepicker.init(elems, options);
    });

             }

  selectPropertie(propertie ,$event) {
    if (propertie.selected) {
      this.propertiesSelected.push({ name: propertie.name, value: '', model: '', type: this.typesSupported.get(propertie.name) });
    }else{
      this.propertiesSelected.forEach((item, index) => {
        if (item.name.toLowerCase() === propertie.name.toLowerCase()) this.propertiesSelected.splice(index, 1);
      });
    }

  }
  
  ngOnChanges(changes){
    if (changes.mark.currentValue){
      if (changes.mark.currentValue.semanticContribution == null) {
        this.semanticService.getAllTypes().then(result => {
          this.schemas = result.children;
          console.log("loader is true");
          console.log(this.loader);
          this.scheme = result;
          this.parents.push(result);
          this.schemas = result.children;
          this.loader = false;
          this.showSelectSchema = true;
          this.changeDetector.detectChanges();
        });
      } else {
        this.getSemanticContribution();
        this.loader = false;
        this.showSelectSchema = false;
        this.showGeneratedScheme = true;
      }
    }
  }

  setParent(parent){
    let index = this.parents.indexOf(parent);
    if(index<this.parents.length){
      index++;
    }
    this.scheme = parent;
    this.parents.splice(index);
    this.schemas = this.scheme.children;
  }
  ngOnInit() {
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
      this.propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(this.mark.semanticContribution.text);
      for (let key in sContribution) {
        if(key!="@context"){
          const item = sContribution[key];
          this.propertiesSelected.push({ name: key, value: item, model: item });
        }
      }
      this.semanticContribution = this.mark.semanticContribution;
    } 
  }

  selectType(event){
    this.parents.push(this.scheme);
    this.schemas = this.scheme.children;
  }
  selectSchema(){
    this.schemeName = this.scheme.name;
    this.showSelectSchema=false;
    this.showPropertiesSelection=true;
 
  }

  handleScheme(event){
    this.propertiesSelected = event.properties;
    this.generateScheme();
  }

  generateScheme() {
    console.log("generate scheme");
    console.log(this.propertiesSelected);
    this.showPropertiesSelection=false;
    this.showCompleteForm=true;
  }
  
  saveScheme(){
    let e = this.semanticService.generateCompacted(this.propertiesSelected).then(
      function (success) {
        //console.log(component);
        return success;
      }
    );
    e.then(
      result => {
        this.schema_type="http://schema.org/" +this.schemeName
        console.log(this.schema_type);
        this.schemeComplete.emit({ schema_type: this.schema_type, semantic_text:result} );
        this.showCompleteForm=false;
        this.showGeneratedScheme=true;
        return result;

      }
    );
    console.log(e);
  }
  back(step){
    switch (step) {
      case "showPropertiesSelection": {
        this.showPropertiesSelection=false;
        this.showSelectSchema=true;
        this.propertiesSelected = new Array();
        break;
      }
      case "showCompleteForm": {
        this.showCompleteForm=false;
        this.showPropertiesSelection=true;
        break;
      }
      case "showGeneratedScheme": {
        this.showGeneratedScheme = false;
        this.showCompleteForm = true;
        break;
      }

    } 
  }



}
