import { Mark } from './mark';
import { LatLng, Layer } from 'leaflet';

export class RenderedMark {
    
    mark:Mark;
    layer:Layer;
    
    constructor(layer,layerType){
        this.mark = new Mark(layer,layerType);
        this.layer = layer;
    }
    
}
