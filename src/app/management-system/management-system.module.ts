import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSelectModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxTreeViewModule,
  DxColorBoxModule,
  DxTagBoxModule,
  DxListModule, DxCheckBoxModule
} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementSystemComponent} from './management-system.component';
import {AddUserInGroupComponent} from './add-user-in-group/add-user-in-group.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {AskRemoveItemComponent} from './ask-remove-item/ask-remove-item.component';
import {PermissionComponent} from './permission/permission.component';
import {WebuserComponent} from './webuser/webuser.component';
import {DepartmentComponent} from './department/department.component';
import {HazardousMaterialComponent} from './hazardous-material/hazardous-material.component';
import {RiskLevelComponent} from './risk-level/risk-level.component';
import {UtilisationCodeComponent} from './utilisation-code/utilisation-code.component';
import {CauseManagementModule} from '@cause-911/management';
import config from '../../assets/config/config.json';
import {CauseDxModule} from '@cause-911/devextreme';
@NgModule({
    declarations: [
        ManagementSystemComponent,
        AddUserInGroupComponent,
        AddGroupComponent,
        AskRemoveItemComponent,
        DepartmentComponent,
        HazardousMaterialComponent,
        RiskLevelComponent,
        UtilisationCodeComponent,
        PermissionComponent,
        WebuserComponent,
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
        MatTabsModule,
        CauseDxModule,
        MatSnackBarModule,

        DxButtonModule,
        DxDataGridModule,
        DxFormModule,
        DxTreeViewModule,
        DxColorBoxModule,
        DxTagBoxModule,
        DxListModule,
        DxCheckBoxModule,
        CauseManagementModule.forRoot({
          apiUrl: config.apiUrl
        })
    ],
    providers: [],
})
export class ManagementSystemModule { }
