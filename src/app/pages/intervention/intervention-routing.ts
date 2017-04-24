import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapsComponent} from './maps/maps.component';
import {ReportComponent} from './report/report.component';
import {SurveyComponent} from './survey/survey.component';

const interventionRoutes: Routes = [{
  path: 'intervention',
  // canActivate: [AuthGuard],
  children: [
    {path: 'maps', component: MapsComponent},
    {path: 'report', component: ReportComponent},
    {path: 'survey', component: SurveyComponent}
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
