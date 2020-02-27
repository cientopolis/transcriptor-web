import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';

import { LayerService } from '../../../../services/layer/layer.service';
import { TranscriptorLayer } from '../../../../models/transcriptorLayer';

@Component({
  selector: 'app-layer-modal',
  templateUrl: './layer-modal.component.html',
  styleUrls: ['./layer-modal.component.scss']
})
export class LayerModalComponent implements OnInit {

  @Input() page;
  @Input() modalOptions: Materialize.ModalOptions = {};
  @ViewChild('modal') modal;
  @Output() close = new EventEmitter();
  
  name:String

  constructor(private layerService: LayerService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  open() {
    this.modal.open();
  }
  
  save() {
    this.layerService.create(new TranscriptorLayer(this.page, this.name))
      .subscribe(layer => { });
  }

  closeModal() {
    this.close.emit();
  }

}