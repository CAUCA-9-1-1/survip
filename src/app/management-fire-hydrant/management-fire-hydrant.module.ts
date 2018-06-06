import { NgModule } from '@angular/core';
import { DxTextBoxModule, DxDataGridModule } from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { ManagementFireHydrantComponent } from './management-fire-hydrant.component';
import { ListComponent } from './list/list.component';
import { ConnectionTypeComponent } from './connection-type/connection-type.component';
import { TypeComponent } from './type/type.component';
import { OperatorTypeComponent } from './operator-type/operator-type.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';

@NgModule({
    declarations: [
        ManagementFireHydrantComponent,
        ListComponent,
        OperatorTypeComponent,
        UnitOfMeasureComponent,
        ConnectionTypeComponent,
        TypeComponent
    ],
    imports: [
        SharedModule,
        DxDataGridModule,
        DxTextBoxModule,
    ],
})
export class ManagementFireHydrantModule { }
