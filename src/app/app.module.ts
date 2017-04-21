import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { IgoModule } from 'igo2';

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

    MaterialModule.forRoot(),
    IgoModule.forRoot(),

    InterventionModule,
    InterventionRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
