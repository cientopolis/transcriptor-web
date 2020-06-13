import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-scheme-inputs',
  templateUrl: './scheme-inputs.component.html',
  styleUrls: ['./scheme-inputs.component.scss']
})
export class SchemeInputsComponent implements OnInit {
  @Input() model:any;
  @Output() public modelDeleted = new EventEmitter<any>();
  @Output() public inputChange = new EventEmitter<any>();
  

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
    today: 'Hoy' // Today button text
  };
  constructor() { }

  ngOnInit() {
  
  }

  deleteModel(model){
    this.modelDeleted.emit({model:this.model})
  }
  handleChange(model = null){
    console.log(this.model);
    console.log('handre change from inpur');
    if (!this.model || this.model.model =='' ) {
      this.inputChange.emit({ model: this.model, valid: false });
      console.log('No es valido');
    } else {
      this.inputChange.emit({ model: this.model,valid:true});
      console.log('es validazo');
    } 
  }

}
