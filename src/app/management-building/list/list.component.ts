import {Component, OnInit} from '@angular/core';

import {DataGrid} from '../../core/devextreme/datagrid';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {Lane} from '../../management-address/shared/models/lane.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import {RiskLevel} from '../shared/models/risk-level.model';
import {RiskLevelService} from '../shared/services/risk-level.service';

@Component({
  selector: 'app-management-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    BuildingService,
    LaneService,
    UtilisationCodeService,
    RiskLevelService,
  ]
})
export class ListComponent extends DataGrid implements OnInit {
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
    this.buildingService.getAll().subscribe(infoBuilding => {
      this.buildings = infoBuilding.data;
    });
  }

  private loadLane() {
    this.laneService.getAll().subscribe(infoLane => {
      this.lanes = infoLane.data;
    });
  }

  private loadUtilisationCode() {
    this.utilisationCode.getAll().subscribe(infoCode => {
      this.utilisationCodes = infoCode.data;
    });
  }

  private loadRiskLevel() {
    this.riskLevelService.getAll().subscribe(infoLevel => {
      this.riskLevels = infoLevel.data;
    });
  }
}
