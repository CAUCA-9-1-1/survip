import { NgModule } from '@angular/core';
// import { DxDataGridModule } from 'devextreme-angular';

import { SharedModule } from '../shared/shared.module';
import { ManagementSurveyComponent } from './management-survey.component';

@NgModule({
  imports: [
    SharedModule,
    // DxDataGridModule
  ],
  declarations: [ManagementSurveyComponent]
})
export class ManagementSurveyModule { }
