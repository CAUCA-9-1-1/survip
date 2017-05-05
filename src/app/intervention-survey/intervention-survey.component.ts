import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { MenuItem } from '../shared/models/menu-item.interface';
import { WindowRefService } from '../shared/services/window-ref.service';
import {BuildingContactService} from './shared/services/building-contact.service';
import {BuildingContact} from './shared/models/building-contact';
import {DialogsService} from '../components/shared/dialogs.service';

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

  constructor(
    private windowRef: WindowRefService,
    private buildingContactService: BuildingContactService,
    private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.loadBuildingContact();

    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
  }

  onBuildingContactDeleted(deletedContact: BuildingContact) {
    this.dialogsService
      .confirm('Suppression d\'un contact', 'Êtes-vous sûr de vouloir supprimer ce contact?')
      .subscribe(res => {
          if (res) {
            this.deleteContact(deletedContact);
          }
        });
  }

  onBuildingContactAdd() {
    const contacts: BuildingContact[] = [];
    Object.assign(contacts, this.contacts);
    const contact = new BuildingContact();
    contact.id = UUID.UUID();
    contacts.push(contact);
    this.contacts = contacts;
  }

  onCompleteSection(val) {
    console.log('complete');
  }

  private deleteContact(deletedContact: BuildingContact) {
    this.buildingContactService.delete(deletedContact)
      .then(() => this.contacts = this.contacts.filter(contact => contact.id !== deletedContact.id));
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
