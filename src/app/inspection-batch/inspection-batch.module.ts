import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxListModule, DxSelectBoxModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {InspectionBatchComponent} from './inspection-batch.component';


@NgModule({
    declarations: [
        InspectionBatchComponent
    ],
    imports: [
        SharedModule,
        DxButtonModule,
        DxDataGridModule,
        DxListModule,
        DxSelectBoxModule,
    ],
})
export class InspectionBatchModule { }
