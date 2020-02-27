import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticTextEditorComponent } from './semantic-text-editor.component';

describe('SemanticTextEditorComponent', () => {
  let component: SemanticTextEditorComponent;
  let fixture: ComponentFixture<SemanticTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
