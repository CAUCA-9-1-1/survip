import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from '../../interfaces/menu-item.interface';

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

  @Output() select: EventEmitter<MenuItem> = new EventEmitter();

  constructor(private router: Router) { }

  handleItemFocus(item: MenuItem) {
    alert(`${item.name} focused!`);
  }

  handleItemSelect(item: MenuItem) {
    this.select.emit(item);
  }
}
