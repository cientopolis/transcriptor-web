import { LatLng, Layer } from 'leaflet';

export class Mark {
  
  text:string;
  type:string;
  shape_type:string;
  text_type:string;
  coordinates:LatLng[];
  
  constructor(layer,layerType){
    this.coordinates = layer.getLatLngs();
    this.shape_type = layerType;
  }
  
}
