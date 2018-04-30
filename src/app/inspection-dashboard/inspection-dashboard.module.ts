import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { MatButtonToggleModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { InspectionDashboardComponent } from './inspection-dashboard.component';


@NgModule({
    declarations: [
        InspectionDashboardComponent
    ],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        DxDataGridModule,
    ],
})
export class InspectionDashboardModule { }
