import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationDashboardComponent } from './valuation-dashboard.component';

describe('ValuationDashboardComponent', () => {
  let component: ValuationDashboardComponent;
  let fixture: ComponentFixture<ValuationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
