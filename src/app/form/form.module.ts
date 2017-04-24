import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    MenuComponent,
    ToolbarComponent
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent,
    ToolbarComponent
  ]
})
export class FormModule { }
