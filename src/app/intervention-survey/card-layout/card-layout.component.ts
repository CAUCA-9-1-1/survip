import {Component, EventEmitter, Input, OnInit, Output, ElementRef, Renderer2, AfterViewInit} from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    const items = document.getElementsByClassName('detail-card mat-card');
    if (items.length > 1) {
      const newCardHeight = items[0]['offsetHeight'];
      const newCardWidth = items[0]['offsetWidth'];
      console.log(newCardHeight + 'px', newCardWidth + 'px');
      const item = document.getElementById('new-card');
      console.log(item);
      item.style.width = newCardWidth + 'px';
      item.style.height = newCardHeight + 'px';
      item.style.padding ='0px';
      console.log(item);
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
