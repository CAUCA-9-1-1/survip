import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { InterventionMapsComponent } from './intervention-maps/intervention-maps.component';
import { InterventionReportComponent } from './intervention-report/intervention-report.component';
import { InterventionSurveyComponent } from './intervention-survey/intervention-survey.component';
import { PreventionSurveyComponent } from './prevention-survey/prevention-survey.component';

const pagesRoutes: Routes = [{
  path: 'intervention',
  canActivate: [AuthGuard],
  children: [
    {path: 'maps', component: InterventionMapsComponent},
    {path: 'report', component: InterventionReportComponent},
    {path: 'survey', component: InterventionSurveyComponent}
  ]
},
{
  path: 'prevention',
  canActivate: [AuthGuard],
  children: [
    {path: 'survey', component: PreventionSurveyComponent}
  ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(pagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})

export class PagesRoutingModule {}
