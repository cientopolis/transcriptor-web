import * as $ from 'jquery';

export class LeafletUtils {
  
  public static addRightToolbar() {
    let controlBarElement="<div class='leaflet-draw-section'><div class='leaflet-draw-toolbar leaflet-bar'></div></div>";
    return $(controlBarElement).appendTo('.leaflet-draw.leaflet-control').find('.leaflet-draw-toolbar.leaflet-bar');
  }

  public static addLeftToolbar() {
    let controlBarElement = "<div class='leaflet-bar leaflet-control'></div>";
    return $(controlBarElement).appendTo('.leaflet-top.leaflet-left');
  }
  
  public static addToolbarAction(toolbar, title = '', iconClass = '', buttonClass = '') {
    let formattedIconClass = iconClass.split('|')[0];
    let iconContent = iconClass.split('|')[1] ? iconClass.split('|')[1] : "";
    let button = `<a class="${buttonClass}" title="${title}" style="cursor: pointer; background-image: none;"><span class="${formattedIconClass}">${iconContent}</span></a>`
    return $(button).appendTo(toolbar);
  }
}
