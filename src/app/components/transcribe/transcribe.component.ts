import { Component, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS } from 'leaflet';

import { DrawStrategy } from '../../models/drawStrategy/drawStrategy';
import { DrawMarkerStrategy } from '../../models/drawStrategy/drawMarkerStrategy';
import { DrawPolylineStrategy } from '../../models/drawStrategy/drawPolylineStrategy';


@Component({
  selector: 'app-transcribe',
  templateUrl: './transcribe.component.html',
  styleUrls: ['./transcribe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TranscribeComponent implements OnInit, OnDestroy {

  map:Map; 
  // drawStrategy:any = new DrawMarkerStrategy();


  options = {
    crs: L.CRS.Simple,
    maxZoom: 5,
  	minZoom: -5,
    zoom: 0,
  	center: latLng(0, 0)
  };
  
  constructor(private changeDetector: ChangeDetectorRef, private global: SimpleGlobal) { 
    this.global['hideFooter']=true;
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.global['hideFooter']=false;
  }
  
  onMapReady(map: Map) {
    this.map=map;
    var h= -1910;
    var w= 1570;
    var southWest = map.unproject([0, h], map.getZoom()-2);
    var northEast = map.unproject([w, 0], map.getZoom()-2);
    var bounds = new L.LatLngBounds(southWest, northEast);
    
    L.imageOverlay('assets/img/manuscript2.jpg', bounds).addTo(map);
    
    map.setMaxBounds(bounds);
    // map.fitBounds(bounds);
    map.setView(bounds.getNorthEast(), -2);
    map.on('click', this.onMapClick);
    this.changeDetector.detectChanges();
  }
  
  onMapClick(e) {
    alert(e.latlng)
    // this.drawStrategy.draw(e, this.map);
  }
}
