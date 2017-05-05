import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';
import { ContactComponent } from './contact/contact.component';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance/person-requiring-assistance.component';
import { DangerousMaterialComponent } from './dangerous-material/dangerous-material.component';
import { FireProtectionComponent } from './fire-protection/fire-protection.component';
import { FireHydrantComponent } from './fire-hydrant/fire-hydrant.component';
import { ParticularRiskComponent } from './particular-risk/particular-risk.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { CardLayoutFactoryDirective } from './shared/control-factory.directive';
import { BuildingContactService } from './shared/services/building-contact.service';
import {BuildingHazardousMaterialService} from './shared/services/building-hazardous-material.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent,
    PersonRequiringAssistanceComponent,
    DangerousMaterialComponent,
    FireProtectionComponent,
    PersonRequiringAssistanceComponent,
    FireHydrantComponent,
    ParticularRiskComponent,
    CardLayoutComponent
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent,
    PersonRequiringAssistanceComponent,
    FireProtectionComponent,
    DangerousMaterialComponent,
    FireProtectionComponent,
    FireHydrantComponent,
    ParticularRiskComponent,
    CardLayoutComponent,
    CardLayoutFactoryDirective,
  ],
  entryComponents: [
    ContactComponent,
    DangerousMaterialComponent
  ],
  providers: [
    BuildingContactService,
    BuildingHazardousMaterialService
  ]
})
export class InterventionSurveyModule { }
