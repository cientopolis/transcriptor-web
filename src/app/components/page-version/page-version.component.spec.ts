import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVersionComponent } from './page-version.component';

describe('PageVersionComponent', () => {
  let component: PageVersionComponent;
  let fixture: ComponentFixture<PageVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
