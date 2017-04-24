import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';
import { ContactComponent } from './contact/contact.component';
import { PersonRequiringAssistanceComponent } from './person-requiring-assistance/person-requiring-assistance.component';
import { DangerousMaterialComponent } from './dangerous-material/dangerous-material.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent,
    PersonRequiringAssistanceComponent,
    DangerousMaterialComponent
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent,
    PersonRequiringAssistanceComponent,
  ],
  providers: [
      ]
})
export class SurveyModule { }
