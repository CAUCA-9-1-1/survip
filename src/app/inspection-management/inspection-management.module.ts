import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';

import {InspectionManagementComponent} from './inspection-management.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        InspectionManagementComponent
    ],
    imports: [
        SharedModule,
        DxDataGridModule,
    ],
})
export class InspectionManagementModule { }
