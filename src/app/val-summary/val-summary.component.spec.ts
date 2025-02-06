import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValSummaryComponent } from './val-summary.component';

describe('ValSummaryComponent', () => {
  let component: ValSummaryComponent;
  let fixture: ComponentFixture<ValSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
