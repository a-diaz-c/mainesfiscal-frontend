import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRFCComponent } from './alta-rfc.component';

describe('AltaRFCComponent', () => {
  let component: AltaRFCComponent;
  let fixture: ComponentFixture<AltaRFCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaRFCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRFCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
