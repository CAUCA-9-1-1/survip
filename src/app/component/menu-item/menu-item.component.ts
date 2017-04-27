import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '../shared/menu-item.interface';

@Component({
  selector: 'app-form-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.styl']
})
export class MenuItemComponent {

  @Input()
  get item(): MenuItem { return this._item; }
  set item(value: MenuItem) {
    this._item = value;
  }
  private _item: MenuItem;

  @Output() focus: EventEmitter<MenuItem> = new EventEmitter();
  @Output() select: EventEmitter<MenuItem> = new EventEmitter();

  constructor() { }
}
