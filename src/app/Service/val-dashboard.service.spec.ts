import { TestBed } from '@angular/core/testing';

import { ValDashboardService } from './val-dashboard.service';

describe('ValDashboardService', () => {
  let service: ValDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
