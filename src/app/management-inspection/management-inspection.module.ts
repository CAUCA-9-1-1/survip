import {NgModule} from '@angular/core';
import {DxButtonModule, DxChartModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementInspectionComponent} from './management-inspection.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {StatisticsComponent} from './statistics/statistics.component';

@NgModule({
  imports: [
    SharedModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
  ],
  declarations: [
    ManagementInspectionComponent,
    ListComponent,
    CreateComponent,
    StatisticsComponent,
  ],
  entryComponents: [
    CreateComponent,
  ]
})
export class ManagementInspectionModule { }
