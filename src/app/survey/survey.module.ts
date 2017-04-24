import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
    ContactComponent,
  ],
  providers: [
      ]
})
export class SurveyModule { }
