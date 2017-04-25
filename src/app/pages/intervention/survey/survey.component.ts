import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSidenav } from '@angular/material';

import { MenuItem } from '../../../form/shared/menu-item.interface';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.styl']
})
export class SurveyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  public selectedMenu = 'building';
  public menuItems = [
    {
      name: 'building',
      title: 'Bâtiments',
      tooltip: 'Bâtiments'
    },
    {
      name: 'waterSupply',
      title: 'Alimentation en eau',
      tooltip: 'Alimentation en eau'
    },
    {
      name: 'implantation',
      title: 'Implantation',
      tooltip: 'Implantation'
    },
    {
      name: 'dangerousMaterial',
      title: 'Matière dangereuse',
      tooltip: 'Matière dangereuse'
    },
    {
      name: 'pnap',
      title: 'P.N.A.P.',
      tooltip: 'P.N.A.P.'
    },
    {
      name: 'specificRisks',
      title: 'Risques particuliers',
      tooltip: 'Risques particuliers'
    },
    {
      name: 'fireProtection',
      title: 'Protection incendie',
      tooltip: 'Protection incendie'
    },
    {
      name: 'contacts',
      title: 'Personnes contacts',
      tooltip: 'Personnes contacts'
    }
  ];

  constructor(private location: Location) { }

  ngOnInit() {

  }

  back() {
    this.location.back();
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;
    this.sidenav.close();
  }
}
