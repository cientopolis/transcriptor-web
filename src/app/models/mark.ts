import { LatLng } from 'leaflet';

export class Mark {
  
  text:string;
  type:string;
  layerType:string;
  coords:LatLng[];
  
  constructor(layer,layerType){
    this.coords = layer.getLatLngs();
    this.layerType = layerType;
  }
  
}
