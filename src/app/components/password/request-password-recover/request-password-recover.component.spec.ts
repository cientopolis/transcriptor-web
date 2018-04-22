import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordRecoverComponent } from './request-password-recover.component';

describe('RequestPasswordRecoverComponent', () => {
  let component: RequestPasswordRecoverComponent;
  let fixture: ComponentFixture<RequestPasswordRecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPasswordRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
