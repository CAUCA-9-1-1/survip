import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SurveyComponent} from './survey/survey.component';

const preventionRoutes: Routes = [{
  path: 'prevention',
  // canActivate: [AuthGuard],
  children: [
    {path: 'survey', component: SurveyComponent}
  ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(preventionRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        // AuthGuard
    ]
})

export class PreventionRoutingModule {}
