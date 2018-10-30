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
    fireSafetyDepartments: any = {store: []};
    riskLevels: RiskLevel[];
    availableRiskLevels: RiskLevel[] = [];
    surveys: any = {store: []};
    loadingVisible = false;
    currentConfigurationId: string;

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
        this.loadFireSafetyDepartment();
        this.loadRiskLevel();
        this.loadSurvey();
    }

    public onEditingStart(e) {
        this.currentConfigurationId = e.data.id;
        this.changeFireSafetyDepartment( e.data.idFireSafetyDepartment);
    }

    private changeFireSafetyDepartment(fireSafetyDepartmentId: string) {
        if (!fireSafetyDepartmentId) {
            fireSafetyDepartmentId = '00000000-0000-0000-0000-000000000000';
        }
        this.availableRiskLevels = [];
        this.loadingVisible = true;
        this.inspectionManagementService.getUsedRiskLevel(this.currentConfigurationId, fireSafetyDepartmentId).subscribe(data => {
            this.availableRiskLevels = this.riskLevels.filter(risk => !data.some(id => id === risk.id));
            this.loadingVisible = false;
        });
    }

  public validateRiskLevels(e) {
    return e.value != null && e.value.length > 0;
  }

  public changeDropDownBoxValue(e, dropDownBoxInstance) {
    const keys = e.selectedRowKeys;
    dropDownBoxInstance.option('value', keys);
  }

    public onValueChanged(args, setValueMethod) {
        setValueMethod(args.value);
    }

    public onFireSafetyValueChanged(args, setValueMethod) {
        setValueMethod(args.value);
        this.changeFireSafetyDepartment(args.value);
    }

    public showRiskLevel = (element, option) => {
        const riskLevels = [];

        if (this.riskLevels) {
          this.riskLevels.sort((a, b) => {
            if (a.sequence < b.sequence) {
              return -1;
            }
            if (a.sequence > b.sequence) {
              return 1;
            }
            return 0;
          }).forEach(risk => {
            if (option.data.riskLevelIds.some(id => risk.id === id)) {
              riskLevels.push(risk.name);
            }
          });
        }

        element.innerHTML = riskLevels.join(', ');
    }

    public onInitNewRow(e) {
        this.currentConfigurationId = '00000000-0000-0000-0000-000000000000';
        this.changeFireSafetyDepartment( e.data.idFireSafetyDepartment);
        e.data.hasGeneralInformation = true;
        e.data.hasImplantationPlan = false;
        e.data.hasCourse = false;
        e.data.hasWaterSupply = false;
        e.data.hasBuildingDetails = true;
        e.data.hasBuildingContacts = false;
        e.data.hasBuildingPnaps = false;
        e.data.hasBuildingHazardousMaterials = false;
        e.data.hasBuildingFireProtection = false;
        e.data.hasBuildingParticularRisks = false;
        e.data.hasBuildingAnomalies = false;
        e.data.hasCourse = false;
        e.data.isActive = true;
    }

    public getFireSafetyDepartmentName(data) {
        const ssi = FireSafetyDepartment.fromJSON(data);

        return ssi.getLocalization(config.locale);
    }

    public getSurveyName(data) {
        const survey = Survey.fromJSON(data);

        return survey.getLocalization(config.locale);
    }

    private loadFireSafetyDepartment() {
        this.fireSafetyDepartmentService.localized().subscribe(data => {
          this.fireSafetyDepartments = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
          };
        });
    }

    private loadRiskLevel() {
        this.riskLevelService.localized().subscribe(data => {
            this.riskLevels = data;
            this.loadSource();
        });
    }

    private loadSurvey() {
        this.surveyService.getAll().subscribe(data => this.surveys = {
          store: data,
          select: ['id', 'name'],
          sort: ['name'],
        });
    }

    public filterRiskLevels = (filterValue, selectedFilterOperation) => {
      if (this.riskLevels) {
        const riskLevelsFound = this.riskLevels.filter(risk => {
          const found = risk.name.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0;
          return found;
        });
        const filterExpression = [];

        riskLevelsFound.forEach(riskLevel => {
          filterExpression.push(['riskLevelIds', 'contains', riskLevel.id]);
          filterExpression.push('or');
        });

        filterExpression.pop();
        return filterExpression;
      }
    }
}
