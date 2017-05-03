import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.styl']
})
export class CardLayoutComponent implements OnInit {
  @Input() items: any[];
  @Input() title: string;
  @Input() componentType: string;
  @Output() deleteClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onDeleteClicked(value: any) {
    console.log( value);
    this.deleteClick.emit('yeah');
  }
  onCompleteSection() {
    console.log('yahoo');
  }
}
