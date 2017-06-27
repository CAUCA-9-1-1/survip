import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth-guard.service';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementBuildingComponent} from './management-building/management-building.component';
import {ManagementSurveyComponent} from './management-survey/management-survey.component';
import {ManagementInspectionComponent} from './management-inspection/management-inspection.component';
import {ManagementInterventionPlanComponent} from './management-intervention-plan/management-intervention-plan.component';
import {ManagementFireHydrantComponent} from './management-fire-hydrant/management-fire-hydrant.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/management/survey',
  pathMatch: 'full'
}, {
  path: 'management',
  canActivate: [AuthGuard],
  children: [{
    path: 'interventionplan',
    component: ManagementInterventionPlanComponent
  }, {
    path: 'inspection',
    component: ManagementInspectionComponent
  }, {
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
    component: ManagementAccessComponent
  }]
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule {}
