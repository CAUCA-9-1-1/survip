import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSelectModule} from '@angular/material';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementAccessComponent} from './management-access.component';
import {FireSafetyDepartmentComponent} from './firesafetydepartment/firesafetydepartment.component';
import {PermissionComponent} from './permission/permission.component';
import {WebuserComponent} from './webuser/webuser.component';
import {FirestationComponent} from './firestation/firestation.component';
import {AddUserInGroupComponent} from './add-user-in-group/add-user-in-group.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {AskRemoveItemComponent} from './ask-remove-item/ask-remove-item.component';


@NgModule({
    declarations: [
        ManagementAccessComponent,
        FireSafetyDepartmentComponent,
        PermissionComponent,
        WebuserComponent,
        FirestationComponent,
        AddUserInGroupComponent,
        AddGroupComponent,
        AskRemoveItemComponent,
    ],
    entryComponents: [
        AddUserInGroupComponent,
        AddGroupComponent,
        AskRemoveItemComponent,
    ],
    exports: [],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,

        DxButtonModule,
        DxDataGridModule,
        DxFormModule,
        DxTreeViewModule,
    ],
    providers: []
})
export class ManagementAccessModule { }
