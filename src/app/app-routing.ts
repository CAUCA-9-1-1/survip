import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {InspectionDashboardComponent} from './inspection-dashboard/inspection-dashboard.component';
import {InspectionBatchComponent} from './inspection-batch/inspection-batch.component';
import {ManagementDepartmentComponent} from './management-department/management-department.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementTypeSystemComponent} from './management-type-system/management-type-system.component';
import {ManagementSurveyComponent} from './management-survey/management-survey.component';
import {LoginComponent} from './user-access/login/login.component';
import {InspectionApprovalComponent} from './inspection-approval/inspection-approval.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ReportConfigurationComponent} from './report-configuration/report-configuration.component';
import {SelectTemplateComponent} from './report-configuration/select-template/select-template.component';
import {PermissionService} from './user-access/shared/services/permission.service';
import {ManagementSystemComponent} from './management-system/management-system.component';


const appRoutes: Routes = [{
    path: '',
    redirectTo: '/inspection/dashboard',
    pathMatch: 'full',
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'statistics',
    canActivate: [AuthGuardService],
    component: StatisticsComponent
}, {
    path: 'inspection',
    canActivate: [AuthGuardService],
    children: [{
        path: 'dashboard',
        component: InspectionDashboardComponent
    }, {
        path: 'dashboard/:idInspection',
        component: InspectionApprovalComponent
    }, {
        path: 'batch',
        component: InspectionBatchComponent
    }, {
        path: 'batch/:idBatch',
        component: InspectionBatchComponent
    }]
}, {
    path: 'management',
    canActivate: [AuthGuardService],
    children: [{
        path: 'department',
        component: ManagementDepartmentComponent,
    }, {
        path: 'survey',
        component: ManagementSurveyComponent
    }, {
        path: 'address',
        component: ManagementAddressComponent
    }, {
        path: 'system',
        component: ManagementSystemComponent,
    }, {
        path: 'typesystem',
        component: ManagementTypeSystemComponent
    }]
}, {
    path: 'report-configuration',
    component: SelectTemplateComponent,
}, {
    path: 'report-edition/:idReport',
    component: ReportConfigurationComponent,
}, {
    path: '**',
    component: PageNotFoundComponent,
}];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuardService,
        PermissionService,
    ]
})

export class AppRoutingModule {}
