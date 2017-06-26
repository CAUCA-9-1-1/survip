import {Component, OnInit} from '@angular/core';

import {DevextremeDatagrid} from 'cause-lib';
import {RiskLevel} from '../shared/models/risk-level.model';
import {RiskLevelService} from '../shared/services/risk-level.service';

@Component({
  selector: 'app-management-building-risklevel',
  templateUrl: './risklevel.component.html',
  styleUrls: ['./risklevel.component.styl'],
  providers: [
    RiskLevelService,
  ]
})
export class RiskLevelComponent extends DevextremeDatagrid implements OnInit {
  riskLevels: RiskLevel[] = [];

  constructor(
    private riskLevelService: RiskLevelService
  ) {
    super();
  }

  ngOnInit() {
    this.loadRiskLevel();
  }

  public onInitNewRow(e) {
    e.data.isActive = true;
  }

  public onRowInserted(e) {
    this.riskLevelService.create(e.data).subscribe(info => {
      if (info.success) {
        this.loadRiskLevel();
      }
    });
  }

  public onRowUpdated(e) {
    e.data.idRiskLevel = e.key.idRiskLevel;

    this.riskLevelService.update(e.data).subscribe();
  }

  public onRowRemoved(e) {
    this.riskLevelService.remove(e.key.idRiskLevel).subscribe();
  }

  private loadRiskLevel() {
    this.riskLevelService.getAll().subscribe(data => this.riskLevels = data);
  }
}
