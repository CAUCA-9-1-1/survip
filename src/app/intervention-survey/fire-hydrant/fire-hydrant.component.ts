import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-intervention-survey-fire-hydrant',
  templateUrl: './fire-hydrant.component.html',
  styleUrls: ['./fire-hydrant.component.styl']
})
export class FireHydrantComponent implements OnInit {

  public FIREHYDRANT_TYPE = [
    {
      'Type': 'Adresse'
    },
    {
      'Type': 'Intersection'
    },
    {
      'Type': 'Latitude / Longitude'
    }
  ];

  fireHydrantSelectedType = 'Adresse';

  constructor() { }

  ngOnInit() {

  }

}
