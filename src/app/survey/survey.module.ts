import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import { BuildingComponent } from './building/building.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ImplantationPlanComponent } from './implantation-plan/implantation-plan.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
    ImplantationPlanComponent,
  ],
  providers: [
      ]
})
export class SurveyModule { }
