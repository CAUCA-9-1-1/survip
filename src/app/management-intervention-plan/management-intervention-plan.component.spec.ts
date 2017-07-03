import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { ManagementInterventionPlanComponent } from './management-intervention-plan.component';
import { AlarmPanelTypeComponent } from './alarm-panel-type/alarm-panel-type.component';
import { ConstructionTypeComponent } from './construction-type/construction-type.component';

describe('ManagementInterventionPlanComponent', () => {
  let component: ManagementInterventionPlanComponent;
  let fixture: ComponentFixture<ManagementInterventionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementInterventionPlanComponent,
        AlarmPanelTypeComponent,
        ConstructionTypeComponent,
      ]
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
