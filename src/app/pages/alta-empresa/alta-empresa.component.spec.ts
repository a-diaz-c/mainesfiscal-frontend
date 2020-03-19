import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEmpresaComponent } from './alta-empresa.component';

describe('AltaEmpresaComponent', () => {
  let component: AltaEmpresaComponent;
  let fixture: ComponentFixture<AltaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
