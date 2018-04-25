import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { MatButtonToggleModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { DashboardInspectionComponent } from './dashboard-inspection.component';


@NgModule({
    declarations: [
        DashboardInspectionComponent
    ],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        DxDataGridModule,
    ],
})
export class DashboardInspectionModule { }
