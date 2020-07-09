import { DataPropertieValue } from '../../../../../models/ontology/instance/dataPropertieValue';
import { Type } from 'class-transformer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-datapropertie-inputs',
  templateUrl: './datapropertie-inputs.component.html',
  styleUrls: ['./datapropertie-inputs.component.scss']
})
export class DataPropertieInputsComponent implements OnInit {
  @Input() model:DataPropertieValue;
  @Output() public modelDeleted = new EventEmitter<any>();
  @Output() public inputChange = new EventEmitter<any>();
  
  public valid=false;
  public enableValidation=true;
  public internalType = 'text';
  //[primary,select,date]
  public typeOfInput = 'primary';

  public options: Pickadate.DateOptions = {
    /* monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
     monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
     weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    */
    onClose: () => this.handleChange(),
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septembre', 'Octubre', 'Noviembre', 'Deciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Domingo', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    //color: '#e65100',
    clear: 'Limpiar', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Hoy', // Today button text
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 200
  };
  constructor() { }

  getTypeOfInput(){
    if (this.internalType.toLowerCase() == 'text' || this.internalType.toLowerCase()=='number'){
      this.typeOfInput='primary';
    }
    if (this.internalType.toLowerCase() == 'date' || this.internalType.toLowerCase() == 'datetime'){
      this.typeOfInput='date'
    }
    if (this.internalType.toLowerCase() == 'boolean'){
      this.typeOfInput='select'
    }

  }
  ngOnInit() {
    this.internalType= this.model.getInternalType();
    this.getTypeOfInput();
    if (this.typeOfInput=='select'){
      this.enableValidation=false;
      this.valid=true;
    }
  }

  deleteModel(model){
    this.modelDeleted.emit({model:this.model})
  }
  handleChange(model = null){
    if(this.enableValidation){
      if (!this.model || this.model.value =='' ) {
        this.inputChange.emit({ model: this.model, valid: false });
        this.valid=false;
      } else {
        this.valid = true;
        this.inputChange.emit({ model: this.model,valid:true});
      } 
    }
  }
}
