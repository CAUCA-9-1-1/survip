import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import {WindowRefService} from '../../shared/services/window-ref.service';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.styl']
})
export class CardLayoutComponent implements OnInit, AfterViewInit {
  @Input() items: any[];
  @Input() title: string;
  @Input() componentType: string;
  @Output() deleteClick = new EventEmitter();
  @Output() completionClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  constructor(private windowRefService: WindowRefService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    const items = this.windowRefService.nativeDocument().getElementsByClassName('detail-card mat-card');
    if (items.length > 1) {
      const newCardHeight = items[0]['offsetHeight'];
      const newCardWidth = items[0]['offsetWidth'];
      const item = document.getElementById('new-card');
      item.style.width = newCardWidth + 'px';
      item.style.height = newCardHeight + 'px';
      item.style.padding = '0px';
    }
  }
  onDeleteClicked(value: any) {
    this.deleteClick.emit(value);
  }
  onCompleteSectionClicked(value: any) {
    this.completionClick.emit(value);
  }
  onAddItemClicked(value: any) {
    this.addClick.emit(value);
  }
}
