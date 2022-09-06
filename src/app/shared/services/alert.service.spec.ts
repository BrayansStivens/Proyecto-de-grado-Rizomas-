import { TestBed } from '@angular/core/testing';
import { AlertsService } from 'src/app/shared/services/services/alert.service';

describe('AlertService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
