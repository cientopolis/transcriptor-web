import { LatLng, Layer } from 'leaflet';

export class Mark {
  
  id:number;
  transcription_text:string;
  translation_text:string;
  semantic_text: string;
  schema_type:string;
  shape_type:string;
  text_type:string;
  coordinates:LatLng[];
  page_id:number;
  layer_id: number;
  transcription:any;
  translation:any;
  semanticContribution: any;
  
  constructor(page,layer,layerType,transcriptorLayer = null){
    this.page_id = page.id;
    this.layer_id = transcriptorLayer ? transcriptorLayer.id : null;
    this.coordinates = layer.getLatLngs();
    this.shape_type = layerType;
  }
  
}
