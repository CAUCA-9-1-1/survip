import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../test.module';
import { DangerousMaterialComponent } from './dangerous-material.component';
import {BuildingHazardousMaterialService} from '../../intervention-survey/shared/services/building-hazardous-material.service';
import {HazardousMaterialService} from '../../intervention-survey/shared/services/hazardous-material.service';
import {UnitOfMeasureService} from '../../intervention-survey/shared/services/unit-of-measure.service';

describe('DangerousMaterialComponent', () => {
  let component: DangerousMaterialComponent;
  let fixture: ComponentFixture<DangerousMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ DangerousMaterialComponent ],
      providers: [ BuildingHazardousMaterialService, HazardousMaterialService, UnitOfMeasureService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerousMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
