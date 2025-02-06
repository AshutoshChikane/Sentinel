import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllModuleGraphComponent } from './all-module-graph.component';

describe('AllModuleGraphComponent', () => {
  let component: AllModuleGraphComponent;
  let fixture: ComponentFixture<AllModuleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllModuleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllModuleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
