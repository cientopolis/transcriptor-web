import { Component, OnInit, ViewChild } from '@angular/core';
import { Mark } from 'app/models/mark';
import { SchemeUtils } from 'app/utils/schema-utils';

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS, FeatureGroup } from 'leaflet';
import { environment } from 'environments/environment';
import { RenderedMark } from 'app/models/renderedMark';

@Component({
  selector: 'app-reference-detail-modal',
  templateUrl: './reference-detail-modal.component.html',
  styleUrls: ['./reference-detail-modal.component.scss']
})
export class ReferenceDetailModalComponent implements OnInit {

  @ViewChild('modal') modal;
  mark: Mark
  detailMark:any
  referenceInfo: any
  map: Map
  bounds: LatLngBounds;
  pageLayer: any;
  drawnLayers = new L.FeatureGroup();

  options = {
    crs: L.CRS.Simple,
    maxZoom: 3,
    minZoom: -4,
    zoom: 0,
    zoomSnap: 0.25,
    zoomDelta: 0.25,
    center: latLng(0, 0),
    zoomControl: false
  };

  shapeOptions = {
    color: '#e65100',
    weight: 6,
    opacity: 0.5
  }

  constructor() { }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    // sets the edit featureGroup to map
    this.drawnLayers.addTo(this.map);

    // this.addPageToMap(this.referenceInfo.base_image)

    // this.addWaterMark();
    // this.addLeafletHandlers();
    // this.addMapListeners();

    // this.changeDetector.detectChanges();
  }

  addPageToMap(pageImage) {
    if (this.pageLayer) {
      this.map.removeLayer(this.pageLayer)
      this.drawnLayers.clearLayers()
    }

    var h = -1910;
    var w = 1570;
    var southWest = this.map.unproject([0, h], -2);
    var northEast = this.map.unproject([w, 0], - 2);
    this.bounds = new L.LatLngBounds(southWest, northEast);

    this.pageLayer = L.imageOverlay(environment.apiUrl + pageImage, this.bounds);
    var that = this
    $('.mark-detail-map .map-loading').fadeIn()
    this.pageLayer.on('load',function() {
      console.log("Loaded")
      that.map.invalidateSize()
      setTimeout(function() {
        that.addMark()
        $('.mark-detail-map .map-loading').fadeOut()
      }, 1000)
    })
    this.pageLayer.addTo(this.map);

    // set limits of page view
    this.map.setMaxBounds(this.bounds);
    // this.map.fitBounds(this.bounds);
  }

  addMark() {
    let renderedMark = new RenderedMark(this.mark);
    renderedMark.render(this.map, this.shapeOptions);
    this.drawnLayers.addLayer(renderedMark.layer);
    this.fitToLayer(renderedMark.layer)
  }

  recalculate(coordinatesArray, constant) {
    var coordinates = coordinatesArray
    var procesedCoordinates = []
    for (var i = 0; i < coordinates.length; i++) {
      procesedCoordinates.push({ lat: coordinates[i].lat / constant, lng: coordinates[i].lng / constant })
    }
    return procesedCoordinates
  }

  fitToLayer(layer) {
    this.map.fitBounds(layer.getBounds(), { padding: [10, 10] });
  }

  getMarksAsNoteDigitalDocument(markParam) {
    let mark = JSON.parse(JSON.stringify(markParam));
    if (mark && mark.semanticContribution) {
      mark.schema_type = mark.semanticContribution.schema_type;
      let propertiesSelected = new Array<any>();
      let sContribution = JSON.parse(mark.semanticContribution.text);
      propertiesSelected = SchemeUtils.getMarksAsNoteDigitalDocument(mark, sContribution);
      mark.semanticContribution = propertiesSelected;
    }
    return mark
  }


  open(mark, referenceInfo = null) {
    this.referenceInfo = referenceInfo
    this.mark = mark
    this.mark.schema_type=this.mark.semanticContribution.schema_type;
    this.mark.type = this.mark.semanticContribution.schema_type;
    this.detailMark = null
 //   this.detailMark = this.getMarksAsNoteDigitalDocument(mark);
    this.detailMark = this.mark;
    console.log(mark);
    if (referenceInfo) {
      this.map.invalidateSize()
      this.addPageToMap(this.referenceInfo.base_image)      
    }
    this.modal.openModal();
  }

}
