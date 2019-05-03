import { NgModule } from '@angular/core';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import {
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTagBoxModule,
    DxDropDownBoxModule,
    DxListModule,
    DxDataGridModule,
} from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { ObjectiveGridComponent } from './objective-grid/objective-grid.component';


@NgModule({
    declarations: [
        StatisticsComponent,
        ObjectiveGridComponent,
    ],
    imports: [
        SharedModule,
        DxChartModule,
        DxPieChartModule,
        DxFormModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxTagBoxModule,
        DxDropDownBoxModule,
        DxListModule,
        DxDataGridModule
    ],
})
export class StatisticsModule { }
