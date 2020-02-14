import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { environment } from '../../../environments/environment';

import * as $ from 'jquery';
import * as _ from "lodash";

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS, FeatureGroup } from 'leaflet';

import { LeafletUtils } from '../../utils/leaflet-utils';

import { ModalTranscriptionStrategy } from './transcription-strategies/modal-transcription-strategy';
import { TextEditorTranscriptionStrategy } from './transcription-strategies/text-editor-transcription-strategy';

import { TranscriptorLayer } from '../../models/transcriptorLayer';
import { Mark } from '../../models/mark';
import { RenderedMark } from '../../models/renderedMark';

import { MarkService } from '../../services/mark/mark.service';
import { LayerService } from '../../services/layer/layer.service';
import { PageService } from '../../services/page/page.service';
import { TranscriptionService } from '../../services/transcription/transcription.service';
import { FlashMessagesService } from '../../services/util/flash-messages/flash-messages.service';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TranscribeComponent implements OnInit, OnDestroy {

  page: any;

  map: Map;
  bounds: LatLngBounds;

  renderedMark: RenderedMark = null;
  vote= [];
  renderedMarks: RenderedMark[] = [];

  transcriptionLayers: TranscriptorLayer[];

  @ViewChild('markModal') markModal: any;
  @ViewChild('markDetailsModal') markDetailsModal: any;
  @ViewChild('markTranscriptionsList') markTranscriptionsList: any;
  @ViewChild('transcriptionForm') transcriptionForm: any;
  @ViewChild('textEditor') textEditor: any;

  options = {
    crs: L.CRS.Simple,
    maxZoom: 3,
  	minZoom: -3,
    zoom: 0,
  	center: latLng(0, 0),
  };

  shapeOptions = {
    color: '#e65100',
    weight: 6,
    opacity: 0.5
  }

  drawnLayers = new L.FeatureGroup();

  drawOptions:any = {
    position: 'topright',
    draw: {
      polyline: {
        showLength: false,
        shapeOptions: this.shapeOptions
      },
      rectangle: {
        shapeOptions: this.shapeOptions
      },
      polygon: false,
      circle: false,
      circlemarker:false,
      marker: false
    },
    edit: {
      featureGroup: this.drawnLayers,
      edit: false,
      remove: false
    }
  };

  editing:boolean = false;

  transcribeStrategy:any = ModalTranscriptionStrategy;

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0, // Opacity of modal background
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      $('.modal-overlay').hide();
      $('.leaflet-draw').fadeOut();
    },
    complete: () => {
      $('.leaflet-draw').fadeIn();
    } // Callback for Modal close
  };

  transcribeOptions = {
    hideTextEditor: false,
    autoZoom: true
  }

  classicMode:boolean = environment.transcribe.classicMode;

  constructor(
    private transcriptionService:TranscriptionService,
    private pageService: PageService,
    private markService: MarkService,
    private layerService: LayerService,
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    public global: SimpleGlobal) {
    this.global['hideFooter']=true;
    this.transcribeOptions=this.getTranscribeOptions();
    if(this.classicMode){
      this.drawOptions.draw.polyline = false;
      this.drawOptions.draw.rectangle = false;
    }
  }

  ngOnInit() {
    window.scrollTo(0,0);
    $("body").css("overflow", "hidden");
  }

  ngOnDestroy() {
    this.global['hideFooter']=false;
    this.global['routeBack'] = null;
    $("body").css("overflow", "auto");
  }

  ngAfterViewInit() {
    let component = this;

    // prevents scroll to anchor deleting references to "#" in map
    $('a[href="#"]').removeAttr("href").css( 'cursor', 'pointer' );

    if(!this.classicMode){
      let leftToolbar = LeafletUtils.addLeftToolbar();
      // add autoZoom button
      let buttonStatusClass = this.transcribeOptions.autoZoom?'primary-color-text':'icon-color';
      let autoZoomButton = LeafletUtils.addToolbarAction(leftToolbar, 'Auto-Zoom', 'fa fa-crosshairs fa-lg toggleIcon ' + buttonStatusClass);
      autoZoomButton.click(function(){
        var toggleIcon = $(this).find('.toggleIcon');
        toggleIcon.toggleClass('icon-color');
        toggleIcon.toggleClass('primary-color-text');
        component.transcribeOptions.autoZoom = !component.transcribeOptions.autoZoom;
        component.saveTranscribeOptions();
      })
      // add layersList button
      // let rightToolbar = LeafletUtils.addRightToolbar();
      // let layersListButton = LeafletUtils.addToolbarAction(rightToolbar, 'Layers', 'mdi mdi-18px mdi-layers');
    }
  }

  /**
  /* do some configuration stuff before map initializes
  */
  onMapReady(map: Map) {
    this.map=map;

    // sets the edit featureGroup to map
    this.drawnLayers.addTo(this.map);

    this.loadPage();

    this.addWaterMark();
    this.addLeafletHandlers();
    this.addMapListeners();

    this.changeDetector.detectChanges();
  }

  loadPage() {
    const pageId = +this.route.snapshot.paramMap.get('pageId');

    this.pageService.get(pageId)
        .subscribe(page => {
          this.page = page;

          this.global['routeBack'] = "work/"+this.page.work_id;
          console.log(this.global['routeBack']);
          this.changeDetector.detectChanges();
          this.addPageToMap();
          this.loadMarks();
          this.loadLayers();
        });
  }

  addPageToMap() {
    var h= -1910;
    var w= 1570;
    var southWest = this.map.unproject([0, h], this.map.getZoom()-2);
    var northEast = this.map.unproject([w, 0], this.map.getZoom()-2);
    this.bounds = new L.LatLngBounds(southWest, northEast);

    L.imageOverlay(this.pageService.imagePath(this.page), this.bounds).addTo(this.map);

    // set limits of page view
    this.map.setMaxBounds(this.bounds);
    this.resetView();
  }

  loadMarks() {
    var component = this;
    this.markService.listByPage(this.page.id)
        .subscribe(marks => {
          marks.forEach(mark => {
            let renderedMark = new RenderedMark(mark);
            renderedMark.render(this.map, this.shapeOptions);
            renderedMark.layer.on('click', function(){
              component.editing = true;
              component.fitToLayer(renderedMark.layer);
              component.openMarkModalByRole(renderedMark);
              component.textEditor.focusMark(mark.id);
            });
            this.drawnLayers.addLayer(renderedMark.layer);
            this.renderedMarks.push(renderedMark);
            console.log(this.page);
          });
        });
  }

  loadLayers() {
    var component = this;
    this.layerService.listByPage(this.page.id)
      .subscribe(layers => {
        this.transcriptionLayers = layers;
      });
  }

  addWaterMark(){
    L.Control['Watermark'] = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');
            img['src'] = 'assets/img/logo.png';
            img['id'] = 'leaflet-watermark';
            return img;
        },
        onRemove: function(map) {
            // Nothing to do here
        }
    });
    L.control['watermark'] = function(opts) {
        return new L.Control['Watermark'](opts);
    }
    L.control['watermark']({ position: 'bottomright' }).addTo(this.map);
  }

  addLeafletHandlers(){
    this.addPolylineHandler();
  }

  addMapListeners(){
    var component = this;
    var map=this.map
    //Add draw created listener
    map.on('draw:created', function (e:any) {
      var type = e.layerType;
      var layer = e.layer;

      // fits zoom to selected line
      component.fitToLayer(layer);

      // Do whatever else you need to. (save to db; add to map etc)
      var mark = new Mark(component.page, layer, type);
      var renderedMark=new RenderedMark(mark,layer);
      component.drawnLayers.addLayer(layer);
      component.transcribeStrategy.execute(renderedMark,component);
    });

    map.on('draw:toolbaropened', function(e:any){
      $('.leaflet-draw-actions>li>a').last().click(function(){
        component.map.fire('draw:drawcanceled');
      });
    });

    map.on('draw:drawcanceled', function(e:any){
      component.reset();
    });

    map.on('draw:canceled', function(e:any){
      component.reset();
    });

    map.on('draw:drawstop', function(e:any){
      component.flashMessagesService.clear();
    });
  }

  addPolylineHandler(){
    L.Draw.Polyline.prototype['addVertex']= function (latlng) {
      var markersLength = this._markers.length;
      // markersLength must be greater than or equal to 2 before intersections can occur

      if (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
          this._showErrorTooltip();
          return;
      }
      else if (this._errorShown) {
          this._hideErrorTooltip();
      }

      this._markers.push(this._createMarker(latlng));

      this._poly.addLatLng(latlng);

      if (this._poly.getLatLngs().length === 2) {
          this._map.addLayer(this._poly);
      }

      this._vertexChanged(latlng, true);
      markersLength = this._markers.length;
      if (markersLength == 2) {
          this._fireCreatedEvent();
          this.disable();
      }
    };
  }

  resetView() {
    // prevents overflow-y when reset view
    $("body").css("overflow", "hidden");

    // initial view configuration(you can change between modes)
    this.map.fitBounds(this.bounds); //fits all page
    // this.map.setView(this.bounds.getNorthEast(), -2); //fits the width of page
  }

  openMarkModalByRole(renderedMark: RenderedMark) {
    this.renderedMark = renderedMark;
    this.changeDetector.detectChanges();
    let currentTranscription = this.renderedMark.mark.transcription;
    if(currentTranscription != null){
      this.openMarkDetailsModal();
    } else {
      this.openMarkModal();
    }
  }

  openMarkModal() {
    this.markModal.open();
  }

  openMarkDetailsModal() {
    this.markDetailsModal.open();
  }

  openMarkTranscriptionsList() {
    this.markTranscriptionsList.open();
  }

  openTranscriptionsForm() {
    this.transcriptionForm.open();
  }

  addModalMark() {
    var component=this;
    var renderedMark = this.renderedMark;
    this.markService.create(this.renderedMark.mark)
        .subscribe(mark => {
          this.renderedMark.mark= mark;
          this.renderedMark.layer.on('click', function(){
            component.editing = true;
            component.fitToLayer(renderedMark.layer);
            component.openMarkModalByRole(renderedMark)
            component.textEditor.focusMark(mark.id);
          });
          this.renderedMarks.push(this.renderedMark);
          this.textEditor.addMarkText(this.renderedMark.mark);
          this.reset();
        });
  }

  editModalMark() {
    this.markService.edit(this.renderedMark.mark)
        .subscribe(mark => {
          this.renderedMark.mark= mark;
          this.renderedMarks.push(this.renderedMark);
          this.reset();
        });
  }

  deleteModalMark() {
    var component = this;
    this.markService.delete(this.renderedMark.mark)
        .subscribe(mark => {
          _.remove(this.renderedMarks, function(m){
            return m.mark.id == component.renderedMark.mark.id
          });
          this.renderedMark.layer.remove();
          this.reset();
        });
  }

  cancelModal() {
    if(!this.editing){
      this.renderedMark.layer.remove();
    }
    this.reset();
  }

  reset() {
    this.editing = false;
    this.renderedMark = null;
    this.transcribeStrategy = ModalTranscriptionStrategy;
    this.textEditor.blurMark();
    this.textEditor.enableEditor();
    this.resetView();
  }

  fitToLayer(layer) {
    if(this.transcribeOptions.autoZoom && this.transcribeStrategy.allowAutoZoom){
      this.map.fitBounds(layer.getBounds(), {padding: [100, 100]});
    }
  }

  selectMark(markId){
    var selectedMark = _.find(this.renderedMarks, function(renderedMark){
      return renderedMark.mark.id == markId;
    });
    this.editing = true;
    this.fitToLayer(selectedMark.layer);
    this.openMarkModalByRole(selectedMark);
  }

  // panel logic
  toggleEditor(){
    this.transcribeOptions.hideTextEditor = !this.transcribeOptions.hideTextEditor;

    if(this.transcribeOptions.hideTextEditor){
      $('.editor-wrapper').addClass('animated fadeOutRight');
      $('.transcribe-screen').addClass('collapsed');
    } else {
      $('.editor-wrapper').removeClass('animated fadeOutRight');
      $('.transcribe-screen').removeClass('collapsed');
    }
    this.map['_onResize']();

    this.saveTranscribeOptions();
  }

  // looks in localstorage for options to set
  getTranscribeOptions(){
    let transcribeOptions=localStorage.getItem('transcribeOptions');
    return transcribeOptions != null? JSON.parse(transcribeOptions) : this.transcribeOptions;
  }

  saveTranscribeOptions(){
    localStorage.setItem('transcribeOptions', JSON.stringify(this.transcribeOptions));
  }
  
  updateTextEditor(){
    if(!environment.usePusher){
      this.textEditor.update();
    }
  }

}
