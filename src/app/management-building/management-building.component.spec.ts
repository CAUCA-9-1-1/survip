import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module';
import {ManagementBuildingComponent} from './management-building.component';
import {ListComponent} from './list/list.component';
import {RiskLevelComponent} from './risk-level/risk-level.component';
import {UtilisationCodeComponent} from './utilisation-code/utilisation-code.component';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type/person-requiring-assistance-type.component';
import {HazardousMaterialComponent} from './hazardous-material/hazardous-material.component';

describe('ManagementBuildingComponent', () => {
  let component: ManagementBuildingComponent;
  let fixture: ComponentFixture<ManagementBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementBuildingComponent,
        ListComponent,
        RiskLevelComponent,
        UtilisationCodeComponent,
        PersonRequiringAssistanceTypeComponent,
        HazardousMaterialComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
