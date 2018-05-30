import {NgModule} from '@angular/core';
import {DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementAccessComponent} from './management-access.component';
import {ApisactionComponent} from './apisaction/apisaction.component';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {PermissionComponent} from './permission/permission.component';
import {WebuserComponent} from './webuser/webuser.component';
import {FirestationComponent} from './firestation/firestation.component';


@NgModule({
    declarations: [
        ManagementAccessComponent,
        ApisactionComponent,
        FireSafetyDepartmentComponent,
        PermissionComponent,
        WebuserComponent,
        FirestationComponent,
    ],
    exports: [],
    imports: [
        SharedModule,
        DxDataGridModule,
        DxFormModule,
        DxTreeViewModule,
    ],
    providers: []
})
export class ManagementAccessModule { }
