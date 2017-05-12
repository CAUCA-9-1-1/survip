import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';
import { ManagementAddressComponent } from './management-address/management-address.component';
import {InterventionBuildingComponent} from './intervention-building/intervention-building.component';
import {InterventionListComponent} from './intervention-list/intervention-list.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/intervention/maps',
  pathMatch: 'full'
}, {
  path: 'intervention',
  canActivate: [AuthGuard],
  children: [{
    path: 'maps',
    component: InterventionMapsComponent
  }, {
    path: 'report',
    component: InterventionReportComponent
  }, {
    path: 'list',
    component: InterventionListComponent
  }, {
    path: 'survey/:id',
    component: InterventionSurveyComponent
  }, {
    path: 'building/:id',
    component: InterventionBuildingComponent
  }]
},
{
  path: 'prevention',
  canActivate: [AuthGuard],
  children: [{
    path: 'survey',
    component: PreventionSurveyComponent
  }, {
    path: 'survey/:id',
    component: PreventionSurveyComponent
  }]
},
{
  path: 'management',
  canActivate: [AuthGuard],
  children: [{
    path: 'address',
    component: ManagementAddressComponent
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
