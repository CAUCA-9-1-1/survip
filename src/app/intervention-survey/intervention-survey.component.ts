import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { MenuItem } from '../components/shared/menu-item.interface';
import { WindowRefService } from '../shared/window-ref.service';
import {BuildingContactService} from './shared/services/building-contact.service';
import {BuildingContact} from './shared/models/building-contact';

@Component({
  selector: 'app-survey',
  templateUrl: './intervention-survey.component.html',
  styleUrls: ['./intervention-survey.component.styl']
})
export class InterventionSurveyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  public contacts: BuildingContact[];
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
  constructor(private windowRef: WindowRefService, private buildingContactService: BuildingContactService) {
  }

  ngOnInit() {
    this.loadBuildingContact();

    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
  }

  onBuildingContactDeleted(value/*deletedContact: BuildingContact*/) {
    console.log('in main page!')
    console.log(value);
    // this.contacts = this.contacts.filter(contact => contact.idBuildingContact !== deletedContact.idBuildingContact);
  }

  private loadBuildingContact() {
    this.buildingContactService.getList()
      .then(contacts => this.contacts = contacts);
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;

    if (this.windowRef.nativeWindow.innerWidth < 700) {
      this.sidenav.close();
    }
  }
}
