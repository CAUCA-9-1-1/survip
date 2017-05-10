import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { WindowRefService } from '../shared/services/window-ref.service';
import {DialogsService} from '../shared/services/dialogs.service';
import {MenuItem} from '../shared/interfaces/menu-item.interface';
import {InterventionPlanFireHydrant} from './shared/models/intervention-plan-fire-hydrant';
import {InterventionPlanFireHydrantService} from './shared/services/intervention-plan-fire-hydrant.service';

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
    { name: 'building', title: 'building', },
    { name: 'waterSupply', title: 'waterSupply', },
    { name: 'implantation', title: 'implantation', },
    { name: 'particularRisks', title: 'particularRisk', },
    { name: 'fireProtection', title: 'fireProtection', },
  ];

  fireHydrants: InterventionPlanFireHydrant[];

  constructor(
    private windowRef: WindowRefService,
    private dialogsService: DialogsService,
    private fireHydrantService: InterventionPlanFireHydrantService
  ) {
    this.loadFireHydrants();
  }

  ngOnInit() {
    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.mode = 'side';
      this.align = 'start';
      this.sidenav.open();
    }
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
