import {Component, OnInit, ViewChild} from '@angular/core';
import {MdSidenav} from '@angular/material';
import { UUID } from 'angular2-uuid';
import {DialogsService} from '../shared/services/dialogs.service';
import {WindowRefService} from '../shared/services/window-ref.service';
import {MenuItem} from '../shared/interfaces/menu-item.interface';
import {ActivatedRoute} from '@angular/router';
import {InterventionPlanBuilding} from '../intervention-survey/shared/models/intervention-plan-building';
import {BuildingContact} from '../intervention-survey/shared/models/building-contact';
import {BuildingPersonRequiringAssistance} from '../intervention-survey/shared/models/building-person-requiring-assistance';
import {BuildingHazardousMaterial} from '../intervention-survey/shared/models/building-hazardous-material';
import {BuildingHazardousMaterialService} from '../intervention-survey/shared/services/building-hazardous-material.service';
import {BuildingContactService} from '../intervention-survey/shared/services/building-contact.service';
import {
  BuildingPersonRequiringAssistanceService} from '../intervention-survey/shared/services/building-person-requiring-assistance.service';
import {InterventionPlanBuildingService} from './shared/services/intervention-plan-building.service';

@Component({
  selector: 'app-intervention-building',
  templateUrl: './intervention-building.component.html',
  styleUrls: ['./intervention-building.component.styl']
})
export class InterventionBuildingComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  public mode = 'over';
  public align = 'end';
  public selectedMenu = 'building';
  public menuItems = [
    { name: 'building', title: 'building', },
    { name: 'dangerousMaterial', title: 'dangerousMaterial', },
    { name: 'pnap', title: 'personRequiringAssistance', },
    { name: 'contacts', title: 'contacts', }
  ];
  private sub: any;
  private id: string;
  private building: InterventionPlanBuilding;
  private hazardousMaterials: BuildingHazardousMaterial[];
  private personsRequiringAssistance: BuildingPersonRequiringAssistance[];
  private contacts: BuildingContact[];

  constructor(
    private route: ActivatedRoute,
    private windowRef: WindowRefService,
    private dialogsService: DialogsService,
    private matService: BuildingHazardousMaterialService,
    private buildingContactService: BuildingContactService,
    private pnapService: BuildingPersonRequiringAssistanceService,
    private buildingService: InterventionPlanBuildingService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadInterventionPlanBuilding();
    });

    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
  }

  private loadInterventionPlanBuilding() {
    this.buildingService.getInterventionPlanBuilding(this.id)
      .then(building => {
        this.building = building;
        this.loadHazardousMaterials();
        this.loadContacts();
        this.loadPersons();
      });
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
    Object.assign(materials, this.hazardousMaterials);
    const material = new BuildingHazardousMaterial();
    material.id = UUID.UUID();
    material.idBuilding = this.building.idBuilding;
    materials.push(material);
    this.hazardousMaterials = materials;
  }
  private deleteMaterial(deletedMat: BuildingHazardousMaterial) {
    this.matService.delete(deletedMat)
      .then(() =>
        this.hazardousMaterials = this.hazardousMaterials
          .filter(contact => contact.id !== deletedMat.id));
  }
  private loadHazardousMaterials() {
    this.matService.getListForBuilding(this.building.idBuilding)
      .then(hazMats => this.hazardousMaterials = hazMats);
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
    contact.idBuilding = this.building.idBuilding;
    contacts.push(contact);
    this.contacts = contacts;
  }
  private deleteContact(deletedContact: BuildingContact) {
    this.buildingContactService.delete(deletedContact)
      .then(() => this.contacts = this.contacts.filter(contact => contact.id !== deletedContact.id));
  }
  private loadContacts() {
    this.buildingContactService.getListForBuilding(this.building.idBuilding)
      .then(contacts => this.contacts = contacts);
  }

  onBuildingPnapDeleted(deletePnap: BuildingPersonRequiringAssistance) {
    this.dialogsService
      .confirm('Suppression d\'un PNAP', 'Êtes-vous sûr de vouloir supprimer ce PNAP?')
      .subscribe(res => {
        if (res) {
          this.deletePnap(deletePnap);
        }
      });
  }
  onBuildingPnapAdd() {
    const pnaps: BuildingPersonRequiringAssistance[] = [];
    Object.assign(pnaps, this.personsRequiringAssistance);
    const pnap = new BuildingPersonRequiringAssistance();
    pnap.id = UUID.UUID();
    pnap.idBuilding = this.building.idBuilding;
    pnaps.push(pnap);
    this.personsRequiringAssistance = pnaps;
  }
  private deletePnap(deletePnap: BuildingPersonRequiringAssistance) {
    this.pnapService.delete(deletePnap)
      .then(() => this.personsRequiringAssistance = this.personsRequiringAssistance
        .filter(pnap => pnap.id !== deletePnap.id));
  }
  private loadPersons() {
    this.pnapService.getListForBuilding(this.building.idBuilding)
      .then(pnaps => this.personsRequiringAssistance = pnaps);
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;

    if (this.windowRef.nativeWindow.innerWidth < 700) {
      this.sidenav.close();
    }
  }
}
