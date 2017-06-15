import {NgModule} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {
  DxButtonModule,
  DxChartModule,
  DxDataGridModule,
  DxFormModule, DxTabPanelModule,
  DxTreeViewModule
} from 'devextreme-angular';

import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterTestingModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
    DxTabPanelModule,
    DxTreeViewModule,
  ],
  exports: [
    SharedModule,
    RouterTestingModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
    DxTabPanelModule,
    DxTreeViewModule,
  ],
  providers: [
  ]
})
export class TestModule { }
