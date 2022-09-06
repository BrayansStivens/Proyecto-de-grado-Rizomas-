import { TestBed } from '@angular/core/testing';

import { MapasService } from './puntos.service';

describe('MapasService', () => {
  let service: MapasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
