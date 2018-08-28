import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {InspectionDashboardComponent} from './inspection-dashboard/inspection-dashboard.component';
import {InspectionBatchComponent} from './inspection-batch/inspection-batch.component';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementBuildingComponent} from './management-building/management-building.component';
import {ManagementFireHydrantComponent} from './management-fire-hydrant/management-fire-hydrant.component';
import {ManagementSurveyComponent} from './management-survey/management-survey.component';
import {LoginComponent} from './user-access/login/login.component';
import {InspectionApprovalComponent} from './inspection-approval/inspection-approval.component';
import {InspectionManagementComponent} from './inspection-management/inspection-management.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ReportConfigurationComponent} from './report-configuration/report-configuration.component';
import {PermissionService} from './management-access/shared/services/permission.service';


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
    }, {
        path: 'management',
        component: InspectionManagementComponent
    }]
}, {
    path: 'management',
    canActivate: [AuthGuardService],
    children: [{
        path: 'survey',
        component: ManagementSurveyComponent
    }, {
        path: 'building',
        component: ManagementBuildingComponent
    }, {
        path: 'address',
        component: ManagementAddressComponent
    }, {
        path: 'firehydrant',
        component: ManagementFireHydrantComponent
    }, {
        path: 'access',
        component: ManagementAccessComponent,
    }]
}, {
    path: 'report-configuration',
    component: ReportConfigurationComponent
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
