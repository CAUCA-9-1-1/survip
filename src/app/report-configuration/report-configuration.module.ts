import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {ReportConfigurationComponent} from './report-configuration.component';
import {TextEditorModule} from 'report-configuration';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    TextEditorModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    ReportConfigurationComponent
  ]
})
export class ReportConfigurationModule { }
