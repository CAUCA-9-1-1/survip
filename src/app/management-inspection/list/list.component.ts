import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {alert} from 'devextreme/ui/dialog';
import {LanguageService} from 'igo2';

import {Inspection} from '../shared/models/inspection.model';
import {InspectionService} from '../shared/services/inspection.service';
import {InspectionBuilding} from '../shared/models/inspection-building.model';
import {InspectionBuildingService} from '../shared/services/inspection-building.service';
import {Webuser} from '../../management-access/shared/models/webuser.model';
import {WebuserService} from '../../management-access/shared/services/webuser.service';
import {RiskLevel} from '../../management-building/shared/models/risk-level.model';
import {RiskLevelService} from '../../management-building/shared/services/risk-level.service';
import {CreateComponent} from '../create/create.component';

@Component({
  selector: 'app-management-inspection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    InspectionService,
    WebuserService,
    RiskLevelService,
    InspectionBuildingService,
  ]
})
export class ListComponent implements OnInit {
  inspections: Inspection[] = [];
  users: Webuser[] = [];
  riskLevels: RiskLevel[] = [];
  buildings: InspectionBuilding[] = [];
  filterBuildings: InspectionBuilding[] = [];
  messages: object = {};
  newInspection: object = {
    'idBuilding': '',
    'year': 2
  };

  constructor(
    private inspectionService: InspectionService,
    private webuserService: WebuserService,
    private riskLevelService: RiskLevelService,
    private inspectionBuildingService: InspectionBuildingService,
    private dialog: MdDialog,
    private translate: LanguageService
  ) { }

  ngOnInit() {
    this.translate.translate.get(['addInspection', 'selectBuildingFirst']).subscribe(labels => {
      this.messages = labels;
    });

    this.loadInspection();
    this.loadWebuser();
    this.loadRiskLevel();
    this.loadBuidling();
  }

  public onFormUpdated(e) {
    if (e.dataField === 'year') {
      this.filterBuilding();
    }
  }

  public onAddInspection(e) {
    if (this.newInspection['idBuilding']) {
      const dialog = this.dialog.open(CreateComponent).afterClosed();

      dialog.subscribe(result => {
        if (result) {
          result.idBuilding = this.newInspection['idBuilding'];

          this.inspectionService.assign(result).subscribe(data => {
            this.loadInspection();
          });
        }
      });
    } else {
      alert(this.messages['selectBuildingFirst'], this.messages['addInspection']);
    }
  }

  public onRowUpdated(e) {
    e.data.idInspection = e.key.idInspection;

    this.inspectionService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.inspectionService.assign(e.key.idInspection).subscribe();
  }

  public onBuildingListOpened(e) {
    e.component.option('dataSource', this.buildings);
  }

  private filterBuilding() {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - this.newInspection['year']);

    this.filterBuildings = this.buildings.filter(building => {
      if (building.lastInspection) {
        return new Date(building.lastInspection) < pastDate;
      }

      return true;
    });
  }

  private loadRiskLevel() {
    this.riskLevelService.getAll().subscribe(data => this.riskLevels = data);
  }

  private loadWebuser() {
    this.webuserService.getAll().subscribe(data => this.users = data);
  }

  private loadInspection() {
    this.inspectionService.getAll().subscribe(data => this.inspections = data);
  }

  private loadBuidling() {
    this.inspectionBuildingService.getAll().subscribe(data => {
      this.buildings = data;
      this.filterBuilding();
    });
  }
}
