import {NgModule} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {DxChartModule, DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterTestingModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
    DxTreeViewModule,
  ],
  exports: [
    SharedModule,
    RouterTestingModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
    DxTreeViewModule,
  ],
  providers: [
  ]
})
export class TestModule { }
