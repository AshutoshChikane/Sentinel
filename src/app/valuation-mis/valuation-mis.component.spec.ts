import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationMisComponent } from './valuation-mis.component';

describe('ValuationMisComponent', () => {
  let component: ValuationMisComponent;
  let fixture: ComponentFixture<ValuationMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
