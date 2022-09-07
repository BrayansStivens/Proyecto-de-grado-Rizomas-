import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMapaComponent } from './menu-mapa.component';

describe('MenuMapaComponent', () => {
  let component: MenuMapaComponent;
  let fixture: ComponentFixture<MenuMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
