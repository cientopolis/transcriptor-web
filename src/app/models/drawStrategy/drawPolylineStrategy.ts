import { DrawStrategy } from './drawStrategy';

import * as L from 'leaflet';
import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS } from 'leaflet';

export class DrawPolylineStrategy extends DrawStrategy {
  
  draw(e, map: Map) {
    return true;
  }
  
}
