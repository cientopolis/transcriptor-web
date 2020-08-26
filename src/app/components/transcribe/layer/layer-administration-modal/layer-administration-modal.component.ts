import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { LayerService } from 'app/services/layer/layer.service';

@Component({
  selector: 'app-layer-administration-modal',
  templateUrl: './layer-administration-modal.component.html',
  styleUrls: ['./layer-administration-modal.component.scss']
})
export class LayerAdministrationModalComponent implements OnInit {

  @Input() page;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @Input() onSaveFunction;
  @ViewChild('modal') modal;
  @Output() close = new EventEmitter();
  @Output() saveLayer = new EventEmitter();

  constructor(private layerService: LayerService) { }

  ngOnInit() {
  }

  open() {
    this.modal.openModal();
  }

  closeModal() {
    this.close.emit();
  }

}
