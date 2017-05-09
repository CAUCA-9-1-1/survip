import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { FireHydrantComponent } from './fire-hydrant.component';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {LocationTypeService} from '../shared/services/location-type.service';
import {LaneService} from '../shared/services/lane.service';
import {InterventionPlanFireHydrantService} from '../shared/services/intervention-plan-fire-hydrant.service';

describe('FireHydrantComponent', () => {
  let component: FireHydrantComponent;
  let fixture: ComponentFixture<FireHydrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ FireHydrantComponent ],
      providers: [
        FireHydrantTypeService,
        UnitOfMeasureService,
        LocationTypeService,
        LaneService,
        InterventionPlanFireHydrantService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireHydrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
