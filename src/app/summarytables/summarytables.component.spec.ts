import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarytablesComponent } from './summarytables.component';

describe('SummarytablesComponent', () => {
  let component: SummarytablesComponent;
  let fixture: ComponentFixture<SummarytablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarytablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarytablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
