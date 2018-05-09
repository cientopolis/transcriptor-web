import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTextEditorComponent } from './basic-text-editor.component';

describe('BasicTextEditorComponent', () => {
  let component: BasicTextEditorComponent;
  let fixture: ComponentFixture<BasicTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
