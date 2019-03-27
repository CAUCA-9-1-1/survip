import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DxDataGridModule} from 'devextreme-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatFormFieldModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatListModule} from '@angular/material';

import {ReportConfigurationComponent} from './report-configuration.component';
import {TranslateModule} from '@ngx-translate/core';
import {SelectTemplateComponent} from './select-template/select-template.component';
import {ReportTemplateService} from '../shared/services/report-template.service';
import {ReportConfigurationModule as ReportEditorModule} from '@cause-911/report-configuration';

@NgModule({
  imports: [
    BrowserModule,
    ReportEditorModule,
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
