import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { IgoModule } from 'igo2';

import { SharedModule } from './shared/shared.module';
import { FormModule } from './form/form.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';
import {
  InterventionModule,
  InterventionRoutingModule
} from './pages';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    IgoModule.forRoot(),

    SharedModule,
    FormModule,

    InterventionModule,
    InterventionRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
