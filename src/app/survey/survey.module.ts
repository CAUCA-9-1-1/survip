import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {BuildingComponent} from './building/building.component';
import {BuildingDetailComponent} from './building-detail/building-detail.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    BuildingDetailComponent,
    BuildingComponent
  ],
  declarations: [
    BuildingDetailComponent,
    BuildingComponent,
  ],
  providers: [
      ]
})
export class SurveyModule { }
