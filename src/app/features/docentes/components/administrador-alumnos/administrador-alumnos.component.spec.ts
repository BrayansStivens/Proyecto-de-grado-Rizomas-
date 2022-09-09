import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAlumnosComponent } from './administrador-alumnos.component';

describe('AdministradorAlumnosComponent', () => {
  let component: AdministradorAlumnosComponent;
  let fixture: ComponentFixture<AdministradorAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
