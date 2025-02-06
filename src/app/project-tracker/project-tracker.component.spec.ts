import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTrackerComponent } from './project-tracker.component';

describe('ProjectTrackerComponent', () => {
  let component: ProjectTrackerComponent;
  let fixture: ComponentFixture<ProjectTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
