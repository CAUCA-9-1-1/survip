import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {InspectionDashboardComponent} from './inspection-dashboard/inspection-dashboard.component';
import {InspectionBatchComponent} from './inspection-batch/inspection-batch.component';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
// import {ManagementBuildingComponent} from './management-building/management-building.component';
import {ManagementFireHydrantComponent} from './management-fire-hydrant/management-fire-hydrant.component';
import {ManagementSurveyComponent} from './management-survey/management-survey.component';
import {LoginComponent} from './user-access/login/login.component';
import {InspectionApprovalComponent} from './inspection-approval/inspection-approval.component';


const appRoutes: Routes = [{
    path: '',
    redirectTo: '/inspection/dashboard',
    pathMatch: 'full',
}, {
    path: 'login',
    component: LoginComponent,
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
        path: 'survey',
        component: ManagementSurveyComponent
    }, {
        path: 'building',
        component: ManagementAddressComponent// ManagementBuildingComponent
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
        AuthGuardService
    ]
})

export class AppRoutingModule {}
