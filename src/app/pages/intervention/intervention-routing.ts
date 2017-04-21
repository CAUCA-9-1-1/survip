import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapsComponent} from './maps/maps.component';
import {ReportComponent} from './report/report.component';

const interventionRoutes: Routes = [{
  path: 'intervention',
  // canActivate: [AuthGuard],
  children: [
    {path: 'maps', component: MapsComponent},
    {path: 'report', component: ReportComponent}
  ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(interventionRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        // AuthGuard
    ]
})

export class InterventionRoutingModule {}
