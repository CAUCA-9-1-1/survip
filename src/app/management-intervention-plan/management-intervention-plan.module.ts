import { NgModule } from '@angular/core';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';

import { ManagementInterventionPlanComponent } from './management-intervention-plan.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmPanelTypeComponent } from './alarm-panel-type/alarm-panel-type.component';
import { ConstructionTypeComponent } from './construction-type/construction-type.component';

@NgModule({
  declarations: [
    ManagementInterventionPlanComponent,
    AlarmPanelTypeComponent,
    ConstructionTypeComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
  ],
  providers: [],
})
export class ManagementInterventionPlanModule { }
