import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {DangerousMaterialComponent} from '../intervention-survey/dangerous-material/dangerous-material.component';
import {PersonRequiringAssistanceComponent} from '../intervention-survey/person-requiring-assistance/person-requiring-assistance.component';
import {ContactComponent} from '../intervention-survey/contact/contact.component';
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
    PictureService
  ]
})
export class InterventionBuildingModule { }
