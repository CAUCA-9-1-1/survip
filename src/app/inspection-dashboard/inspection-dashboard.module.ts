import {NgModule} from '@angular/core';
import {DxDataGridModule, DxLoadPanelModule} from 'devextreme-angular';
import {MatButtonToggleModule, MatDialogModule, MatSelectModule, MatOptionModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {InspectionDashboardComponent} from './inspection-dashboard.component';
import {AskBatchDescriptionComponent} from './ask-batch-description/ask-batch-description.component';


@NgModule({
    declarations: [
        InspectionDashboardComponent,
        AskBatchDescriptionComponent,
    ],
    entryComponents: [
        AskBatchDescriptionComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        DxDataGridModule,
        DxLoadPanelModule
    ],
})
export class InspectionDashboardModule { }
