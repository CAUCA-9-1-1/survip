import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSelectModule} from '@angular/material';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxFormModule, DxLoadPanelModule,
  DxLookupModule,
  DxPopupModule,
  DxTreeViewModule
} from 'devextreme-angular';

import {SharedModule} from '../shared/shared.module';
import {ManagementDepartmentComponent} from './management-department.component';
import {FirestationComponent} from './firestation/firestation.component';
import {FirehydrantComponent} from './firehydrant/firehydrant.component';
import {BuildingComponent} from './building/building.component';
import {ManageContactsComponent} from './manage-contacts/manage-contacts.component';
import {ManagePnapsComponent} from './manage-pnaps/manage-pnaps.component';
import {ManageHazardousMaterialComponent} from './manage-hazardous-material/manage-hazardous-material.component';
import {LaneComponent} from './lane/lane.component';
import {DepartmentRiskLevelComponent} from './department-risk-level/department-risk-level.component';
import {ObjectiveComponent} from './objective/objective.component';
import {ObjectiveManagementComponent} from './objective/objective-management/objective-management.component';


@NgModule({
    declarations: [
        ManagementDepartmentComponent,
        BuildingComponent,
        ManageContactsComponent,
        ManagePnapsComponent,
        ManageHazardousMaterialComponent,
        FirestationComponent,
        FirehydrantComponent,
        LaneComponent,
        DepartmentRiskLevelComponent,
        ObjectiveComponent,
        ObjectiveManagementComponent,
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
        DxLookupModule,
        DxTreeViewModule,
        DxPopupModule,
        DxDropDownBoxModule,
        DxLoadPanelModule,
    ],
    providers: []
})
export class ManagementDepartmentModule { }
