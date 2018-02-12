import { DrawStrategy } from './drawStrategy';

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS } from 'leaflet';

export class DrawMarkerStrategy extends DrawStrategy {
  
  yx = L.latLng;
  xy = function(x, y) {
      if (L.Util.isArray(x)) {    // When doing this.xy([x, y]);
          return this.yx(x[1], x[0]);
      }
      return this.yx(y, x);  // When doing this.xy(x, y);
  }
  
  draw(e, map: Map) {
    var coords = this.xy(e.latlng.lng,e.latlng.lat);
    return L.marker(coords).addTo(map).bindPopup("marker");
  }
  
}
