import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BuildingContact} from '../shared/models/building-contact';

@Component({
  selector: 'app-intervention-survey-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.styl']
})
export class ContactComponent implements OnInit {
  @Input() item: BuildingContact;
    @Output() deleteClicked = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  onDeleteClicked() {
    console.log('In contact component : ' + this.item);
    console.log(arguments);
    this.deleteClicked.emit(this.item);
  }
}
