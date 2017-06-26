import { NgModule } from '@angular/core';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';

import { ManagementInterventionPlanComponent } from './management-intervention-plan.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmPanelTypeComponent } from './alarm-panel-type/alarm-panel-type.component';
import { ConstructionTypeComponent } from './construction-type/construction-type.component';
import {PersonRequiringAssistanceTypeComponent} from './person-requiring-assistance-type/person-requiring-assistance-type.component';

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
    AlarmPanelTypeComponent,
    ConstructionTypeComponent,
    PersonRequiringAssistanceTypeComponent,
  ]
})
export class ManagementInterventionPlanModule { }
