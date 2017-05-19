import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../../test.module';
import {BuildingDetailComponent} from './building-detail.component';
import {InterventionPlanBuildingService} from '../shared/services/intervention-plan-building.service';
import {ConstructionTypeService} from '../shared/services/construction-type.service';
import {AlarmPanelTypeService} from '../shared/services/alarm-panel-type.service';
import {UnitOfMeasureService} from '../../intervention-survey/shared/services/unit-of-measure.service';
import {PictureService} from '../../shared/services/picture.service';

describe('BuildingDetailComponent', () => {
  let component: BuildingDetailComponent;
  let fixture: ComponentFixture<BuildingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, RouterTestingModule],
      declarations: [ BuildingDetailComponent ],
      providers: [
        AlarmPanelTypeService,
        ConstructionTypeService,
        UnitOfMeasureService,
        PictureService,
        InterventionPlanBuildingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
