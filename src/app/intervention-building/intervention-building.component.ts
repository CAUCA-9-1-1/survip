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
import {BuildingPersonRequiringAssistanceService} from '../intervention-survey/shared/services/building-person-requiring-assistance.service';

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

  constructor(
    private route: ActivatedRoute,
    private windowRef: WindowRefService,
    private dialogsService: DialogsService,
    private matService: BuildingHazardousMaterialService,
    private buildingContactService: BuildingContactService,
    private pnapService: BuildingPersonRequiringAssistanceService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

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
    Object.assign(materials, this.building.building.hazardousMaterials);
    const material = new BuildingHazardousMaterial();
    material.id = UUID.UUID();
    materials.push(material);
    this.building.building.hazardousMaterials = materials;
  }
  private deleteMaterial(deletedMat: BuildingHazardousMaterial) {
    this.matService.delete(deletedMat)
      .then(() =>
        this.building.building.hazardousMaterials = this.building.building.hazardousMaterials
          .filter(contact => contact.id !== deletedMat.id));
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
    Object.assign(contacts, this.building.building.contacts);
    const contact = new BuildingContact();
    contact.id = UUID.UUID();
    contacts.push(contact);
    this.building.building.contacts = contacts;
  }
  private deleteContact(deletedContact: BuildingContact) {
    this.buildingContactService.delete(deletedContact)
      .then(() => this.building.building.contacts = this.building.building.contacts.filter(contact => contact.id !== deletedContact.id));
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
    Object.assign(pnaps, this.building.building.personsRequiringAssistance);
    const pnap = new BuildingPersonRequiringAssistance();
    pnap.id = UUID.UUID();
    pnaps.push(pnap);
    this.building.building.personsRequiringAssistance = pnaps;
  }
  private deletePnap(deletePnap: BuildingPersonRequiringAssistance) {
    this.pnapService.delete(deletePnap)
      .then(() => this.building.building.personsRequiringAssistance = this.building.building.personsRequiringAssistance
        .filter(pnap => pnap.id !== deletePnap.id));
  }

  select(item: MenuItem) {
    this.selectedMenu = item.name;

    if (this.windowRef.nativeWindow.innerWidth < 700) {
      this.sidenav.close();
    }
  }
}
