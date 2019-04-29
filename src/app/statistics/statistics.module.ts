import { NgModule } from '@angular/core';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import {
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTagBoxModule
} from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';


@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    imports: [
        SharedModule,
        DxChartModule,
        DxPieChartModule,
        DxFormModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxTagBoxModule
    ],
})
export class StatisticsModule { }
