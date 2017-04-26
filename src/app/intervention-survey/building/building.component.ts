import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intervention-survey-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.styl']
})
export class BuildingComponent implements OnInit {
  buildings: any[] = [
    {
      'idBuilding' : 1,
      'alias' : 'Résidence',
      'die' : 627,
      'height' : 20,
      'storeyCount' : 2
    },
    {
      'idBuilding' : 2,
      'alias' : 'Grange-étable',
      'die' : 0,
      'height' : 20,
      'storeyCount' : 1
    },
    {
      'idBuilding' : 3,
      'alias' : 'Remise à machinerie',
      'die' : 456,
      'height' : 20,
      'storeyCount' : 1
    },
    {
      'idBuilding' : 4,
      'alias' : 'Remise à fumier',
      'die' : 627,
      'height' : 20,
      'storeyCount' : 2
    },
    {
      'idBuilding' : 5,
      'alias' : 'Remise à machinerie',
      'die' : 627,
      'height' : 20,
      'storeyCount' : 2
    },
    {
      'idBuilding' : 6,
      'alias' : 'Remise à machinerie',
      'die' : 627,
      'height' : 20,
      'storeyCount' : 2
    },
    {
      'idBuilding' : 7,
      'alias' : 'Garage',
      'die' : 627,
      'height' : 20,
      'storeyCount' : 2
    }
    ];


  constructor() { }

  ngOnInit() {
  }

}
