import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { WindowRefService } from '../shared/services/window-ref.service';
import {BuildingContactService} from './shared/services/building-contact.service';
import {BuildingContact} from './shared/models/building-contact';
import {DialogsService} from '../shared/services/dialogs.service';
import {MenuItem} from '../shared/interfaces/menu-item.interface';
import {BuildingHazardousMaterialService} from './shared/services/building-hazardous-material.service';
import {BuildingHazardousMaterial} from './shared/models/building-hazardous-material';
import {InterventionPlanFireHydrant} from './shared/models/intervention-plan-fire-hydrant';
import {InterventionPlanFireHydrantService} from './shared/services/intervention-plan-fire-hydrant.service';

@Component({
  selector: 'app-survey',
  templateUrl: './intervention-survey.component.html',
  styleUrls: ['./intervention-survey.component.styl']
})
export class InterventionSurveyComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  public contacts: BuildingContact[];
  public materials: BuildingHazardousMaterial[];
  public fireHydrants: InterventionPlanFireHydrant[];
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
    private matService: BuildingHazardousMaterialService,
    private fireHydrantService: InterventionPlanFireHydrantService,
    private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.loadBuildingContact();
    this.loadBuildingMaterials();
    this.loadFireHydrants();

    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
  }

  onBuildingMaterialDeleted(deletedMat: BuildingHazardousMaterial) {
    this.dialogsService
      .confirm('Suppression d\'une matière dangereuse', 'Êtes-vous sûr de vouloir supprimer cette matière dangereuse?')
      .subscribe(res => {
        if (res) {
          this.deleteMaterial(deletedMat);
        }
      });
  }
  onBuildingMaterialAdd() {
    const materials: BuildingHazardousMaterial[] = [];
    Object.assign(materials, this.materials);
    const material = new BuildingHazardousMaterial();
    material.id = UUID.UUID();
    materials.push(material);
    this.materials = materials;
  }
  private deleteMaterial(deletedMat: BuildingHazardousMaterial) {
    this.matService.delete(deletedMat)
      .then(() => this.materials = this.materials.filter(contact => contact.id !== deletedMat.id));
  }
  private loadBuildingMaterials() {
    this.matService.getList()
      .then(materials => this.materials = materials);
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
  private deleteContact(deletedContact: BuildingContact) {
    this.buildingContactService.delete(deletedContact)
      .then(() => this.contacts = this.contacts.filter(contact => contact.id !== deletedContact.id));
  }
  private loadBuildingContact() {
    this.buildingContactService.getList()
      .then(contacts => this.contacts = contacts);
  }

  onFireHydrantDeleted(deletedHydrant: InterventionPlanFireHydrant) {
    this.dialogsService
      .confirm('Suppression d\'une alimentation en eau', 'Êtes-vous sûr de vouloir supprimer cette alimentation en eau?')
      .subscribe(res => {
        if (res) {
          this.deleteFireHydrant(deletedHydrant);
        }
      });
  }
  onFireHydrantAdd() {
    const fireHydrants: InterventionPlanFireHydrant[] = [];
    Object.assign(fireHydrants, this.fireHydrants);
    const hydrant = new InterventionPlanFireHydrant();
    hydrant.id = UUID.UUID();
    fireHydrants.push(hydrant);
    this.fireHydrants = fireHydrants;
  }
  private deleteFireHydrant(deletedHydrant: InterventionPlanFireHydrant) {
    this.fireHydrantService.delete(deletedHydrant)
      .then(() => this.fireHydrants = this.fireHydrants.filter(hydrant => hydrant.id !== deletedHydrant.id));
  }
  private loadFireHydrants() {
    this.fireHydrantService.getList()
      .then(hydrants => this.fireHydrants = hydrants);
  }

  onCompleteSection(val) {
    console.log('complete');
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;

    if (this.windowRef.nativeWindow.innerWidth < 700) {
      this.sidenav.close();
    }
  }
}
