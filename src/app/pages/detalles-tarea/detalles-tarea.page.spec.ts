import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesTareaPage } from './detalles-tarea.page';

describe('DetallesTareaPage', () => {
  let component: DetallesTareaPage;
  let fixture: ComponentFixture<DetallesTareaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
