import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ApplicationRef, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import * as $ from 'jquery';

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS } from 'leaflet';

import { Mark } from '../../models/mark';

@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TranscribeComponent implements OnInit, OnDestroy {

  map: Map; 
  bounds: LatLngBounds;
  
  mark: Mark = null;
  marks: Mark[] = [];
  
  @ViewChild('markModal') markModal: any;

  options = {
    crs: L.CRS.Simple,
    maxZoom: 5,
  	minZoom: -3,
    zoom: 0,
  	center: latLng(0, 0),
  };
  
  shapeOptions = {
    color: '#e65100',
    weight: 6
  }
  
  drawOptions = {
    position: 'topright',
    draw: {
      // marker: {
      //   icon: L.icon({
      //     iconSize: [ 25, 41 ],
      //     iconAnchor: [ 13, 41 ],
      //     iconUrl: 'assets/img/icons/marker-icon.png',
      //     shadowUrl: 'assets/img/icons/marker-shadow.png'
      //   })
      // },
      polyline: {
        showLength: false,
        shapeOptions: this.shapeOptions
      },
      rectangle: {
        shapeOptions: this.shapeOptions
      }
      polygon: false,
      circle: false,
      circlemarker:false,
      marker: false
    }
  };
  
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
  
  constructor(private changeDetector: ChangeDetectorRef, private global: SimpleGlobal) { 
    this.global['hideFooter']=true;
    window['ngComponent'] = this;
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.global['hideFooter']=false;
    window['angularComponent'] = null;
  }
  
  /**
  /* do some configuration stuff before map initializes
  */
  onMapReady(map: Map) {
    this.map=map;
    var h= -1910;
    var w= 1570;
    var southWest = map.unproject([0, h], map.getZoom()-2);
    var northEast = map.unproject([w, 0], map.getZoom()-2);
    this.bounds = new L.LatLngBounds(southWest, northEast);
    
    L.imageOverlay('assets/img/manuscript2.jpg', this.bounds).addTo(map);    
    
    // set limits of page view
    map.setMaxBounds(this.bounds);
    this.resetView();
    
    this.addWaterMark();
    this.addLeafletHandlers();
    this.addMapListeners(map);
    
    this.changeDetector.detectChanges();
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
  
  addMapListeners(map:Map){
    //Add draw created listener
    map.on('draw:created', function (e:any) {
      // fits zoom to selected line
      map.fitBounds(e.layer.getBounds(), {padding: [100, 100]});

      console.log(e);
      var type = e.layerType;
      var layer = e.layer;
      
      // Do whatever else you need to. (save to db; add to map etc)
      var mark=new Mark(layer,type);
      window['ngComponent'].openMarkModal(mark);
    });
    
    // Add click listener
    map.on('click', this.onMapClick);
  }
  
  private addPolylineHandler(){
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
  
  private onMapClick(e) {
    // alert(e.latlng)
  }
  
  resetView() {
    // initial view configuration(you can change between modes)
    // map.fitBounds(this.bounds); //fits all page
    this.map.setView(this.bounds.getNorthEast(), -2); //fits the width of page
  }
  
  openMarkModal(mark: Mark) {
    this.mark = mark;
    this.changeDetector.detectChanges();
    this.markModal.open();
  }
  
  addModalMark() {
    this.marks.push(this.mark);
    this.resetView();
  }
  
  cancelModal() {
    this.mark.layer.remove();
    this.mark = null;
    this.resetView();
  }
}
