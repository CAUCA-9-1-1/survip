import {Component, OnInit} from '@angular/core';

import {environment} from '../../environments/environment';
import {GridWithCrudService} from '../shared/classes/grid-with-crud-service';
import {FireSafetyDepartmentRiskLevelService} from './shared/services/fire-safety-department-risk-level.service';
import {FireSafetyDepartmentService} from '../management-access/shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../management-access/shared/models/firesafetydepartment.model';
import {RiskLevel} from '../management-building/shared/models/risk-level.model';
import {RiskLevelService} from '../management-building/shared/services/risk-level.service';
import {SurveyService} from '../management-survey/shared/services/survey.service';
import {Survey} from '../management-survey/shared/models/survey.model';

@Component({
    selector: 'app-inspection-management',
    templateUrl: './inspection-management.component.html',
    styleUrls: ['./inspection-management.component.scss'],
    providers: [
        FireSafetyDepartmentRiskLevelService,
        FireSafetyDepartmentService,
        RiskLevelService,
        SurveyService,
    ]
})
export class InspectionManagementComponent extends GridWithCrudService implements OnInit {
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

    ngOnInit() {
        this.loadSource();
        this.loadFireSafetyDepartment();
        this.loadRiskLevel();
        this.loadSurvey();
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

        return ssi.getLocalization(environment.locale.use);
    }

    getSurveyName(data) {
        const survey = Survey.fromJSON(data);

        return survey.getLocalization(environment.locale.use);
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
