import { LatLng, Layer } from 'leaflet';
import { MappingUtils } from 'app/utils/mapping-utils';
import { Contribution } from './contribution';
import { Type } from 'class-transformer';

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
  @Type(() => Contribution)
  transcription:any;
  translation:any;
  semanticContribution: any;
  contribution_slug:string;
  label:string;
  type:string;
  
  constructor(page = null, layer = null, layerType = null, transcriptorLayer = null){
    this.page_id = page ? page.id : null;
    this.layer_id = transcriptorLayer ? transcriptorLayer.id : null;
    this.coordinates = layer? layer.getLatLngs() : null;
    this.shape_type = layerType;
  }

  getSemanticLabel() {
    try {
      if (this.semanticContribution && this.semanticContribution.text && this.semanticContribution.text != null) {
        let semanticContributionContent = JSON.parse(this.semanticContribution.text)
        return semanticContributionContent['schema:mainEntity']['rdfs:label']
      } else {
        return ""
      }
    } catch (error) {
      return ""
    }
  }
  
}
