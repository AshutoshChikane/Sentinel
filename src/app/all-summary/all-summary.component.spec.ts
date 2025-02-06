import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSummaryComponent } from './all-summary.component';

describe('AllSummaryComponent', () => {
  let component: AllSummaryComponent;
  let fixture: ComponentFixture<AllSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
