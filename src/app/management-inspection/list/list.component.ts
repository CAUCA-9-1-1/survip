import { Component, OnInit } from '@angular/core';

import {Inspection} from '../shared/models/inspection.model';
import {InspectionService} from '../shared/services/inspection.service';
import {Webuser} from '../../management-access/shared/models/webuser.model';
import {WebuserService} from '../../management-access/shared/services/webuser.service';
import {RiskLevel} from '../../management-building/shared/models/risk-level.model';
import {RiskLevelService} from '../../management-building/shared/services/risk-level.service';

@Component({
  selector: 'app-management-inspection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl'],
  providers: [
    InspectionService,
    WebuserService,
    RiskLevelService,
  ]
})
export class ListComponent implements OnInit {
  inspections: Inspection[] = [];
  users: Webuser[] = [];
  riskLevels: RiskLevel[] = [];

  constructor(
    private inspectionService: InspectionService,
    private webuserService: WebuserService,
    private riskLevelService: RiskLevelService
  ) { }

  ngOnInit() {
    this.loadInspection();
    this.loadWebuser();
    this.loadRiskLevel();
  }

  public onInitNewRow() {

  }

  public onRowInserted() {

  }

  public onRowUpdated() {

  }

  public onRowRemoved() {

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
}
