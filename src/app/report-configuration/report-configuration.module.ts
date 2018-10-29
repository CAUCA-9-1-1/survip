import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatButtonToggleModule, MatDialogModule, MatSelectModule, MatOptionModule, MatInputModule, MatListModule} from '@angular/material';

import {ReportConfigurationComponent} from './report-configuration.component';
import {TranslateModule} from '@ngx-translate/core';
import {SelectTemplateComponent} from './select-template/select-template.component';
import {TextEditorModule} from 'cause-report-configuration';
import {ReportTemplateService} from '../shared/services/report-template.service';

@NgModule({
  imports: [
    BrowserModule,
    TextEditorModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    TranslateModule,
    DxDataGridModule,
    MatButtonToggleModule,
  ],
  declarations: [
    ReportConfigurationComponent,
    SelectTemplateComponent
  ],
  providers: [
    ReportTemplateService,
  ]
})
export class ReportConfigurationModule { }
