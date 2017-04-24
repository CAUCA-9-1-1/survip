import { Component, Input } from '@angular/core';

import { MenuItem } from '../shared/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent {

  @Input()
  get items(): MenuItem[] { return this._items; }
  set items(value: MenuItem[]) {
    this._items = value;
  }
  private _items: MenuItem[];

  constructor() { }

  handleItemFocus(item: MenuItem) {
    alert(`${item.name} focused!`);
  }

  handleItemSelect(item: MenuItem) {
    alert(`${item.name} selected!`);
  }

}
