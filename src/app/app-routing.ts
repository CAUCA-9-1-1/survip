import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
//import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
//import {ManagementBuildingComponent} from './management-building/management-building.component';
//import {ManagementFireHydrantComponent} from './management-fire-hydrant/management-fire-hydrant.component';
//import {ManagementInspectionComponent} from './management-inspection/management-inspection.component';
//import {ManagementInterventionPlanComponent} from './management-intervention-plan/management-intervention-plan.component';
//import {ManagementSurveyComponent} from './management-survey/management-survey.component';
import { LoginComponent } from './user-access/login/login.component';


const appRoutes: Routes = [{
    path: '',
    redirectTo: '/management/address',
    pathMatch: 'full',
}, {
    path: 'login',
    component: LoginComponent,
}, {
    path: 'management',
    canActivate: [AuthGuardService],
    children: [{
        path: 'inspection',
        component: LoginComponent//ManagementInspectionComponent
    }, {
        path: 'interventionplan',
        component: LoginComponent//ManagementInterventionPlanComponent
    }, {
        path: 'survey',
        component: LoginComponent//ManagementSurveyComponent
    }, {
        path: 'building',
        component: LoginComponent//ManagementBuildingComponent
    }, {
        path: 'address',
        component: ManagementAddressComponent
    }, {
        path: 'firehydrant',
        component: LoginComponent//ManagementFireHydrantComponent
    }, {
        path: 'access',
        component: LoginComponent//ManagementAccessComponent,
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
