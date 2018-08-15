import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ReportConfigurationComponent} from './report-configuration.component';
import {TextEditorModule} from 'report-configuration';
import {TranslateModule} from '@ngx-translate/core';
import {SelectTemplateDialogComponent} from './select-template/select-template-dialog.component';
import {MatFormFieldModule, MatDialogModule, MatSelectModule, MatOptionModule, MatInputModule, MatListModule} from '@angular/material';


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
    TranslateModule
  ],
  declarations: [
    ReportConfigurationComponent,
    SelectTemplateDialogComponent
  ],
  entryComponents: [SelectTemplateDialogComponent]
})
export class ReportConfigurationModule { }
