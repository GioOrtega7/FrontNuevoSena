import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirNominaComponent } from './subir-nomina.component';

describe('SubirNominaComponent', () => {
  let component: SubirNominaComponent;
  let fixture: ComponentFixture<SubirNominaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirNominaComponent]
    });
    fixture = TestBed.createComponent(SubirNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
