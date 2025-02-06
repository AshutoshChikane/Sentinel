import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBoundarydashComponent } from './mboundarydash.component';

describe('MBoundarydashComponent', () => {
  let component: MBoundarydashComponent;
  let fixture: ComponentFixture<MBoundarydashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBoundarydashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBoundarydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
