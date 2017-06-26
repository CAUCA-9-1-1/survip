import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {Lane} from '../../management-address/shared/models/lane.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import {RiskLevel} from '../shared/models/risk-level.model';
import {RiskLevelService} from '../shared/services/risk-level.service';

@Component({
  selector: 'app-managementbuilding-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    BuildingService,
    LaneService,
    UtilisationCodeService,
    RiskLevelService,
  ]
})
export class ListComponent extends DevextremeDatagrid implements OnInit {
  buildings: Building[] = [];
  lanes: Lane[] = [];
  utilisationCodes: UtilisationCode[] = [];
  riskLevels: RiskLevel[] = [];

  constructor(
    private buildingService: BuildingService,
    private laneService: LaneService,
    private utilisationCode: UtilisationCodeService,
    private riskLevelService: RiskLevelService
  ) {
    super();
  }

  ngOnInit() {
    this.loadBuiling();
    this.loadLane();
    this.loadUtilisationCode();
    this.loadRiskLevel();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.buildingService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadBuiling();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idBuilding = e.key.idBuilding;

    this.buildingService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.buildingService.remove(e.key.idBuilding).subscribe();
  }

  private loadBuiling() {
    this.buildingService.getAll().subscribe(data => this.buildings = data);
  }

  private loadLane() {
    this.laneService.getAll().subscribe(data => this.lanes = data);
  }

  private loadUtilisationCode() {
    this.utilisationCode.getAll().subscribe(data => this.utilisationCodes = data);
  }

  private loadRiskLevel() {
    this.riskLevelService.getAll().subscribe(data => this.riskLevels = data);
  }
}
