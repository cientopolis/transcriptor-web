import { LatLng, Layer } from 'leaflet';

export class Mark {
  
  text:string;
  type:string;
  layerType:string;
  coords:LatLng[];
  layer:Layer;
  
  constructor(layer,layerType){
    this.layer = layer;
    this.coords = layer.getLatLngs();
    this.layerType = layerType;
  }
  
}
