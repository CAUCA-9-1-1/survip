import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth-guard.service';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ManagementAddressComponent} from './management-address/management-address.component';
import {ManagementAccessComponent} from './management-access/management-access.component';
import {ManagementBuildingComponent} from './management-building/management-building.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/management/building',
  pathMatch: 'full'
}, {
  path: 'management',
  canActivate: [AuthGuard],
  children: [{
    path: 'building',
    component: ManagementBuildingComponent
  }, {
    path: 'address',
    component: ManagementAddressComponent
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
