import { Mark } from './mark';

import * as L from 'leaflet';
import { Map, LatLng, LatLngBounds, Layer } from 'leaflet';

export class RenderedMark {
    
    mark:Mark;
    layer:Layer;
    
    constructor(mark:Mark = null, layer = null){
      this.mark = mark;
      this.layer = layer;
    }
    
    render(map:Map){
      switch (this.mark.shape_type) {
        case 'polyline':
          this.layer = L.polyline(this.mark.coordinates).addTo(map);
          break;
        case 'rectangle':
          this.layer = L.rectangle(L.latLngBounds(this.mark.coordinates)).addTo(map);
          break;
      }
    }
}
