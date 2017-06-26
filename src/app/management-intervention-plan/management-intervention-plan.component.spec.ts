import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementInterventionPlanComponent } from './management-intervention-plan.component';

describe('ManagementInterventionPlanComponent', () => {
  let component: ManagementInterventionPlanComponent;
  let fixture: ComponentFixture<ManagementInterventionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementInterventionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementInterventionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
