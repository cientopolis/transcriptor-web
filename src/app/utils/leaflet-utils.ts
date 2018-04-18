import * as $ from 'jquery';

export class LeafletUtils {
  
  public static addToolbar() {
    let controlBarElement="<div class='leaflet-draw-section'><div class='leaflet-draw-toolbar leaflet-bar'></div></div>";
    return $(controlBarElement).appendTo('.leaflet-draw.leaflet-control').find('.leaflet-draw-toolbar.leaflet-bar');
  }
  
  public static addToolbarAction(toolbar, title = '', iconClass = '', buttonClass = '') {
    let button = "<a class='"+ buttonClass + "' title='" + title 
                + "' style='cursor: pointer; background-image: none;'><span class='" + iconClass + "'></span></a>";
    return $(button).appendTo(toolbar);
  }
}
