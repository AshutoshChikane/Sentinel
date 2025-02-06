import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundarysComponent } from './boundarys.component';

describe('BoundarysComponent', () => {
  let component: BoundarysComponent;
  let fixture: ComponentFixture<BoundarysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundarysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundarysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
