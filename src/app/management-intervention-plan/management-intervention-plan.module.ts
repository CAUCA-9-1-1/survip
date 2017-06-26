import { NgModule } from '@angular/core';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';

import { ManagementInterventionPlanComponent } from './management-intervention-plan.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmPanelComponent } from './alarmpanel/alarmpanel.component';
import {ConstructionTypeComponent} from './constructiontype/construction-type.component';

@NgModule({
  imports: [
    SharedModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
  ],
  declarations: [
    ManagementInterventionPlanComponent,
    AlarmPanelComponent,
    ConstructionTypeComponent,
  ]
})
export class ManagementInterventionPlanModule { }