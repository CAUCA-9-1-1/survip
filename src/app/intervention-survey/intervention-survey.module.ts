import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';
import { ContactComponent } from '../intervention-building/contact/contact.component';
import { PersonRequiringAssistanceComponent } from '../intervention-building/person-requiring-assistance/person-requiring-assistance.component';
import { DangerousMaterialComponent } from '../intervention-building/dangerous-material/dangerous-material.component';
import { FireProtectionComponent } from './fire-protection/fire-protection.component';
import { FireHydrantComponent } from './fire-hydrant/fire-hydrant.component';
import { ParticularRiskComponent } from './particular-risk/particular-risk.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { CardLayoutFactoryDirective } from './shared/control-factory.directive';
import { BuildingContactService } from './shared/services/building-contact.service';
import {BuildingHazardousMaterialService} from './shared/services/building-hazardous-material.service';
import {HazardousMaterialService} from './shared/services/hazardous-material.service';
import {UnitOfMeasureService} from './shared/services/unit-of-measure.service';
import {FireHydrantTypeService} from './shared/services/fire-hydrant-type.service';
import {LocationTypeService} from './shared/services/location-type.service';
import {InterventionPlanFireHydrantService} from './shared/services/intervention-plan-fire-hydrant.service';
import {LaneService} from './shared/services/lane.service';
import {PersonRequiringAssistanceTypeService} from './shared/services/person-requiring-assistance-type.service';
import {BuildingPersonRequiringAssistanceService} from './shared/services/building-person-requiring-assistance.service';
import {PictureService} from '../shared/services/picture.service';
import {InterventionPlanService} from './shared/services/intervention-plan.service';
import {CourseComponent} from './course/course.component';
import {InterventionPlanCourseService} from './shared/services/intervention-plan-course.service';
import {CourseLaneComponent} from './course-lane/course-lane.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    BuildingComponent,
    ImplantationPlanComponent,
    FireProtectionComponent,
    FireHydrantComponent,
    ParticularRiskComponent,
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    FireProtectionComponent,
    FireProtectionComponent,
    FireHydrantComponent,
    ParticularRiskComponent,
    CourseComponent,
    CourseLaneComponent,
  ],
  entryComponents: [
    FireHydrantComponent,
  ],
  providers: [
    UnitOfMeasureService,
    FireHydrantTypeService,
    LocationTypeService,
    InterventionPlanFireHydrantService,
    LaneService,
    PictureService,
    InterventionPlanService,
    InterventionPlanCourseService
  ]
})
export class InterventionSurveyModule { }
