import { LatLng, Layer } from 'leaflet';

export class Mark {
  
  id:number;
  transcription_text:string;
  translation_text:string;
  shape_type:string;
  text_type:string;
  coordinates:LatLng[];
  page_id:number;
  transcription:any;
  translation:any;
  
  constructor(page,layer,layerType){
    this.page_id = page.id;
    this.coordinates = layer.getLatLngs();
    this.shape_type = layerType;
  }
  
}
