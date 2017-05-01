import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.styl']
})
export class SearchListComponent implements OnInit {
  @Output() selectedItemChanged = new EventEmitter
  items: any[] = [
    {
      'idLane' : '1',
      'laneName' : 'Rue des Pins! Pons!'
    },
    {
      'idLane' : '2',
      'laneName' : 'Test 2'
    },
    {
      'idLane' : '3',
      'laneName' : 'Trois'
    },
    {
      'idLane' : '4',
      'laneName' : 'Quatre'
    },
    {
      'idLane' : '5',
      'laneName' : 'Cinq'
    },
    {
      'idLane' : '6',
      'laneName' : 'Six'
    },
    {
      'idLane' : '7',
      'laneName' : 'Sept'
    },
    {
      'idLane' : '8',
      'laneName' : 'Huit'
    },
    {
      'idLane' : '9',
      'laneName' : 'Neuf'
    },
    {
      'idLane' : '10',
      'laneName' : 'Dix'
    },
  ];
  constructor() { }
  clickOnItem(idLane: string): void {
    this.selectedItemChanged.emit(idLane);
  }
  ngOnInit() {
  }

}
