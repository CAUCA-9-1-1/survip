import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
//import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';
//import {DxTabPanelModule, DxTextBoxModule} from 'devextreme-angular';
import {environment} from '../../environments/environment';

import {
  IgoModule,
  provideConfigOptions,
} from 'igo2';

import {
  CauseModule,
  provideConfig,
} from 'cause-lib';

//import {MenuComponent} from './components/menu/menu.component';
//import {MenuItemComponent} from './components/menu-item/menu-item.component';*/
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
//import {ToolbarBackComponent} from './components/toolbar-back/toolbar-back.component';
//import {FilterByPipe} from './pipes/filter.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ToolbarComponent,
    /*MenuComponent,
    MenuItemComponent,
    ToolbarBackComponent,
    FilterByPipe,*/
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    //FormsModule,
    FlexLayoutModule,
    //ReactiveFormsModule,
    IgoModule,
    CauseModule,

    ToolbarComponent,
    //MenuComponent,
    //ToolbarBackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    //FormsModule,
    FlexLayoutModule,
    //ReactiveFormsModule,
    //DxTabPanelModule,
    //DxTextBoxModule,
    IgoModule.forRoot(),
    CauseModule.forRoot(),
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      // path: './assets/config-igo.json'
    }),
    provideConfig({
      default: environment.cause,
      // path: './assets/config-cause.json'
    }),
  ]
})
export class SharedModule { }
