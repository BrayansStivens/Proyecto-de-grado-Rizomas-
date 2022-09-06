import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleDateComponent } from './double-date.component';

describe('DoubleDateComponent', () => {
  let component: DoubleDateComponent;
  let fixture: ComponentFixture<DoubleDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
