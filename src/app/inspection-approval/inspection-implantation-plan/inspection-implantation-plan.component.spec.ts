import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionImplantationPlanComponent } from './inspection-implantation-plan.component';

describe('InspectionImplantationPlanComponent', () => {
  let component: InspectionImplantationPlanComponent;
  let fixture: ComponentFixture<InspectionImplantationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionImplantationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionImplantationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
