import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FireSafetyDepartmentRiskLevelService} from '../shared/services/fire-safety-department-risk-level.service';
import {FireSafetyDepartmentService} from '../../management-system/shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../../management-system/shared/models/firesafetydepartment.model';
import {RiskLevel} from '../../management-system/shared/models/risk-level.model';
import {RiskLevelService} from '../../management-system/shared/services/risk-level.service';
import {SurveyService} from '../../management-survey/shared/services/survey.service';
import {Survey} from '../../management-survey/shared/models/survey.model';
import {Inspection} from '../../inspection-approval/shared/models/inspection.model';

@Component({
    selector: 'app-management-department-department-risk-level',
    templateUrl: './department-risk-level.component.html',
    styleUrls: ['./department-risk-level.component.scss'],
    providers: [
        FireSafetyDepartmentRiskLevelService,
        FireSafetyDepartmentService,
        RiskLevelService,
        SurveyService,
    ]
})
export class DepartmentRiskLevelComponent extends GridWithCrudService implements OnInit {
    fireSafetyDepartments: FireSafetyDepartment[];
    riskLevels: RiskLevel[];
    surveys: Survey[];

    constructor(
        private inspectionManagementService: FireSafetyDepartmentRiskLevelService,
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private riskLevelService: RiskLevelService,
        private surveyService: SurveyService,
    ) {
        super(inspectionManagementService);
    }

    setModel(data: any) {
        return Inspection.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadFireSafetyDepartment();
        this.loadRiskLevel();
        this.loadSurvey();
    }

  changeDropDownBoxValue(e, dropDownBoxInstance) {
      console.log('drop down changed', JSON.stringify(e.selectedRowKeys))
      const keys = e.selectedRowKeys;
      dropDownBoxInstance.option('value', keys);
  }

  onValueChanged(args, setValueMethod) {

    console.log('nw value:', args.value);
    setValueMethod(args.value);
  }

    onInitNewRow(e) {
        e.data.hasGeneralInformation = true;
        e.data.hasImplantationPlan = false;
        e.data.hasCourse = false;
        e.data.hasWaterSupply = false;
        e.data.hasBuildingDetails = true;
        e.data.hasBuildingContacts = false;
        e.data.hasBuildingPNAPS = false;
        e.data.hasBuildingHazardousMaterials = false;
        e.data.hasBuildingFireProtection = false;
        e.data.hasBuildingParticularRisks = false;
        e.data.hasBuildingAnomalies = false;
        e.data.hasCourse = false;
        e.data.isActive = true;
    }

    getFireSafetyDepartmentName(data) {
        const ssi = FireSafetyDepartment.fromJSON(data);

        return ssi.getLocalization(config.locale);
    }

    getSurveyName(data) {
        const survey = Survey.fromJSON(data);

        return survey.getLocalization(config.locale);
    }

    private loadFireSafetyDepartment() {
        this.fireSafetyDepartmentService.getAll().subscribe(data => this.fireSafetyDepartments = data);
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => this.riskLevels = data);
    }

    private loadSurvey() {
        this.surveyService.getAll().subscribe(data => this.surveys = data);
    }
}
