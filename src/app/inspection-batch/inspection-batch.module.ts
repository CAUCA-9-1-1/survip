import {NgModule} from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxListModule, DxPopupModule, DxSelectBoxModule, DxToolbarModule} from 'devextreme-angular';

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
        DxPopupModule,
        DxToolbarModule,
    ],
})
export class InspectionBatchModule { }
