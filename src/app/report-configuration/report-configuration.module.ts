import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ReportConfigurationComponent} from './report-configuration.component';
import {TextEditorModule} from 'report-configuration';

@NgModule({
  imports: [
    BrowserModule,
    TextEditorModule
  ],
  declarations: [
    ReportConfigurationComponent
  ]
})
export class ReportConfigurationModule { }
