import {NgModule} from '@angular/core';
import {DxChartModule, DxPieChartModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {StatisticsComponent} from './statistics.component';


@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    imports: [
        SharedModule,
        DxChartModule,
        DxPieChartModule,
    ],
})
export class StatisticsModule { }
