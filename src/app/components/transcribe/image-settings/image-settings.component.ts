import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TranscribeComponent } from '../transcribe.component';
import { s } from '@angular/core/src/render3';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss']
})
export class ImageSettingsComponent implements OnInit {

  @Input() imageSelector;
  @Input() delegate: TranscribeComponent;
  @Input() isActive = false;
  
  editRangeAttribute = false;
  editingProperty = null;
  slider:any;
  
  propertyValues = {
    isInverted: false,
    brightness: 0,
    contrast: 0,
    saturation: 0
  }

  constructor() { }

  ngOnInit() {
    this.initSlider()

    // Prevent map dragging
    let delegate = this.delegate
    // Disable dragging when user's cursor enters the element
    $('.image-settings-menu').on('mouseover', function () {
      delegate.map.dragging.disable();
    });
    // Re-enable dragging when user's cursor leaves the element
    $('.image-settings-menu').on('mouseout', function () {
      delegate.map.dragging.enable();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && changes.isActive.currentValue == false) {
      this.editRangeAttribute = false;
      this.editingProperty = null; 
    }
  }

  initSlider() {
    if (!this.slider) {
      let component = this;
      this.slider = $('.image-settings-menu .slider')[0];
      let noUiSlider = window["noUiSlider"];
      let wNumb = window["wNumb"];
      noUiSlider.create(this.slider, {
        start: [0],
        connect: [true, false],
        step: 1,
        orientation: 'horizontal',
        range: {
          'min': -100,
          'max': 100
        },
        format: wNumb({
          decimals: 0,
          postfix: '%'
        })
      });
      this.slider['noUiSlider'].on('update', function(stringNumber) {
        component.propertyValues[component.editingProperty] = parseInt(stringNumber)
        component.updateFilters();
      })
    }
  }
  
  toggleInvert() {
    this.propertyValues.isInverted = !this.propertyValues.isInverted
    this.updateFilters()
  }

  updateFilters() {
    let invertValue = `invert(${this.propertyValues.isInverted ? 100 : 0}%)`;
    let brightnessValue = `brightness(${this.propertyValues.brightness + 100}%)`;
    let saturationValue = `saturate(${this.propertyValues.saturation + 100}%)`;
    let contrastValue = `contrast(${this.propertyValues.contrast + 100}%)`;
    $(this.imageSelector).css('filter', `${invertValue} ${brightnessValue} ${contrastValue} ${saturationValue}`)
  }

  toggleRange(value = 0) {
    this.editRangeAttribute = !this.editRangeAttribute;
    this.slider['noUiSlider'].set(value);
  }

  reset() {
    this.editRangeAttribute = false;
    this.editingProperty = null;
    this.propertyValues = {
      isInverted: false,
      brightness: 0,
      contrast: 0,
      saturation: 0
    }
    this.updateFilters()
  }

  editProperty(property) {
    if (property == 'reset') {
      this.reset()
      return
    }
    if (property != 'invert') {
      this.toggleRange(this.propertyValues[property]);
      this.editingProperty = this.editingProperty != property ? property : null; 
    }
  }
}
