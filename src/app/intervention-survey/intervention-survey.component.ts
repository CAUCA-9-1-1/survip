import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { WindowRefService } from '../shared/services/window-ref.service';
import {BuildingContactService} from './shared/services/building-contact.service';
import {BuildingContact} from './shared/models/building-contact';
import {DialogsService} from '../shared/services/dialogs.service';
import {MenuItem} from '../shared/interfaces/menu-item.interface';

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
      title: 'building',
    },
    {
      name: 'waterSupply',
      title: 'waterSupply',
    },
    {
      name: 'implantation',
      title: 'implantation',
    },
    {
      name: 'dangerousMaterial',
      title: 'dangerousMaterial',
    },
    {
      name: 'pnap',
      title: 'personRequiringAssistance',
    },
    {
      name: 'particularRisks',
      title: 'particularRisk',
    },
    {
      name: 'fireProtection',
      title: 'fireProtection',
    },
    {
      name: 'contacts',
      title: 'contacts',
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
