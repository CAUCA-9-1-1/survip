import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {DangerousMaterialComponent} from './dangerous-material/dangerous-material.component';
import {PersonRequiringAssistanceComponent} from './person-requiring-assistance/person-requiring-assistance.component';
import {ContactComponent} from './contact/contact.component';
import {LocationTypeService} from '../intervention-survey/shared/services/location-type.service';
import {UnitOfMeasureService} from '../intervention-survey/shared/services/unit-of-measure.service';
import {HazardousMaterialService} from '../intervention-survey/shared/services/hazardous-material.service';
import {BuildingHazardousMaterialService} from '../intervention-survey/shared/services/building-hazardous-material.service';
import {BuildingContactService} from '../intervention-survey/shared/services/building-contact.service';
import {LaneService} from '../intervention-survey/shared/services/lane.service';
import {PersonRequiringAssistanceTypeService} from '../intervention-survey/shared/services/person-requiring-assistance-type.service';
import {BuildingPersonRequiringAssistanceService} from '../intervention-survey/shared/services/building-person-requiring-assistance.service';
import {PictureService} from '../shared/services/picture.service';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import {InterventionPlanBuildingService} from './shared/services/intervention-plan-building.service';
import {ConstructionTypeService} from './shared/services/construction-type.service';
import {AlarmPanelTypeService} from './shared/services/alarm-panel-type.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ContactComponent,
    PersonRequiringAssistanceComponent,
    DangerousMaterialComponent,
    BuildingDetailComponent
  ],
  declarations: [
    ContactComponent,
    PersonRequiringAssistanceComponent,
    DangerousMaterialComponent,
    BuildingDetailComponent,
  ],
  entryComponents: [
    ContactComponent,
    DangerousMaterialComponent,
    PersonRequiringAssistanceComponent
  ],
  providers: [
    BuildingContactService,
    BuildingHazardousMaterialService,
    HazardousMaterialService,
    UnitOfMeasureService,
    LocationTypeService,
    LaneService,
    PersonRequiringAssistanceTypeService,
    BuildingPersonRequiringAssistanceService,
    PictureService,
    InterventionPlanBuildingService,
    ConstructionTypeService,
    AlarmPanelTypeService
  ]
})
export class InterventionBuildingModule { }
