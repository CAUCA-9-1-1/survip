import { Component, OnInit } from '@angular/core';
import {InspectionService} from '../shared/services/inspection.service';
import {Inspection} from '../shared/interfaces/inspection.interface';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {RiskLevel} from '../intervention-survey/shared/models/risk-level';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.styl']
})
export class InterventionListComponent implements OnInit {

  inspections: Inspection[];
  riskLevels: RiskLevel[];

  constructor(
    private riskLevelService: RiskLevelService,
    private inspectionService: InspectionService,
    private router?: Router) {

    riskLevelService.getAll()
      .subscribe(risks => this.riskLevels = risks);

    inspectionService.getAll()
      .subscribe(inspections => this.inspections = inspections);
  }

  ngOnInit() {
  }

  private getRiskLevel(idRiskLevel: string): RiskLevel {
    return this.riskLevels.find(risk => risk.idRiskLevel === idRiskLevel);
  }

  getRiskDescription(idRiskLevel: string): string {
    const result = this.riskLevels.find(risk => risk.idRiskLevel === idRiskLevel);
    if (result != null) {
      return result.description;
    } else {
      return '';
    }
  }

  getRiskColor(idRiskLevel: string): string {
    const result = this.riskLevels.find(risk => risk.idRiskLevel === idRiskLevel);
    if (result != null) {
      return result.color;
    } else {
      return 'black';
    }
  }

  getRiskCode(idRiskLevel: string): string {
    const result = this.riskLevels.find(risk => risk.idRiskLevel === idRiskLevel);
    if (result != null) {
      return result.code;
    } else {
      return '-1';
    }
  }

  goToInspection(inspection: Inspection) {
    const riskCode: string = this.getRiskCode(inspection.idRiskLevel);
    if (riskCode == '3' || riskCode == '4') {
      this.router.navigate(['/intervention/survey', inspection.idInterventionPlan]);
    } else {
      this.router.navigate(['/prevention/survey', inspection.id]);
    }
  }
}
