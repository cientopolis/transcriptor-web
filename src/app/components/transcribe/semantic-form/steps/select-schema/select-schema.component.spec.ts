import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchemaComponent } from './select-schema.component';

describe('SelectSchemaComponent', () => {
  let component: SelectSchemaComponent;
  let fixture: ComponentFixture<SelectSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
