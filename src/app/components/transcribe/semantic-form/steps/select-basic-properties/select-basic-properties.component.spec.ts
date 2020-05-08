import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBasicPropertiesComponent } from './select-basic-properties.component';

describe('SelectBasicPropertiesComponent', () => {
  let component: SelectBasicPropertiesComponent;
  let fixture: ComponentFixture<SelectBasicPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBasicPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBasicPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
