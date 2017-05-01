import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarBackComponent } from './toolbar-back/toolbar-back.component';
import { SearchListComponent } from './search-list/search-list.component';
import {SearchBoxComponent} from './search-box/search-box.component';
import {LaneService} from '../intervention-survey/shared/services/lane.service';
import { FilterByPipe } from './shared/filter.pipe';


@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    MenuComponent,
    ToolbarComponent,
    ToolbarBackComponent,
    SearchListComponent
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent,
    ToolbarComponent,
    ToolbarBackComponent,
    SearchListComponent,
    FilterByPipe
  ],
  providers: [
    LaneService
  ]
})
export class ComponentModule { }
