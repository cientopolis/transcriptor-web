import { latLng, Layer, tileLayer, LatLngBounds, Map, CRS } from 'leaflet';

export abstract class DrawStrategy {

    abstract draw(e, map: Map): any;
    
}
