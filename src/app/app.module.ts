import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { IgoModule } from 'igo2';

import { FormModule } from './form/form.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    IgoModule.forRoot(),

    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
