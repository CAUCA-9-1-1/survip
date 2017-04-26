import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { MenuItem } from '../../form/shared/menu-item.interface';
import { WindowRefService } from '../../shared/window-ref.service';

@Component({
  selector: 'app-survey',
  templateUrl: './intervention-survey.component.html',
  styleUrls: ['./intervention-survey.component.styl']
})
export class InterventionSurveyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  public mode = 'over';
  public align = 'end';
  public selectedMenu = 'building';
  public menuItems = [
    {
      name: 'building',
      title: 'Bâtiments',
    },
    {
      name: 'waterSupply',
      title: 'Alimentation en eau',
    },
    {
      name: 'implantation',
      title: 'Implantation',
    },
    {
      name: 'dangerousMaterial',
      title: 'Matière dangereuse',
    },
    {
      name: 'pnap',
      title: 'P.N.A.P.',
    },
    {
      name: 'particularRisks',
      title: 'Risques particuliers',
    },
    {
      name: 'fireProtection',
      title: 'Protection incendie',
    },
    {
      name: 'contacts',
      title: 'Personnes contacts',
    }
  ];

  constructor(private windowRef: WindowRefService) {
  }

  ngOnInit() {
    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;

    if (this.windowRef.nativeWindow.innerWidth < 700) {
      this.sidenav.close();
    }
  }
}
