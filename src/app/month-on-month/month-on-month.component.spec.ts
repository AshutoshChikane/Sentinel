import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthOnMonthComponent } from './month-on-month.component';

describe('MonthOnMonthComponent', () => {
  let component: MonthOnMonthComponent;
  let fixture: ComponentFixture<MonthOnMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthOnMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthOnMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
