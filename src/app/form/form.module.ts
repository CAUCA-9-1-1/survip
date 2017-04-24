import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';


@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent,
    MenuItemComponent
  ]
})
export class FormModule { }
