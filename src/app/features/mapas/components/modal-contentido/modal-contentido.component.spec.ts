import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentidoComponent } from './modal-contentido.component';

describe('ModalContentidoComponent', () => {
  let component: ModalContentidoComponent;
  let fixture: ComponentFixture<ModalContentidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContentidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContentidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
