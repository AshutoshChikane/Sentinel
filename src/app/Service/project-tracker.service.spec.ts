import { TestBed } from '@angular/core/testing';

import { ProjectTrackerService } from './project-tracker.service';

describe('ProjectTrackerService', () => {
  let service: ProjectTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
