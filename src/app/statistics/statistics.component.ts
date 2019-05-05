import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FireSafetyDepartmentService } from '../management-system/shared/services/firesafetydepartment.service';
import { ObjectivesService } from '../management-department/shared/services/objectives.service';
import { StatisticService } from './shared/services/statistic.service';
import { InspectionService } from '../inspection-approval/shared/services/inspection.service';
import { InspectionForStatistics } from './shared/models/inspection-for-statistics.model';
import { Objective } from './shared/models/objective.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    providers: [FireSafetyDepartmentService, ObjectivesService, StatisticService, InspectionService]
})

export class StatisticsComponent implements OnInit {
    public departments: any = { store: [] };
    public idFireSafetyDeparment: string = null;
    public statsLoaded = false;
    public currentDepartment = null;

    public isDropDownBoxOpened = false;
    public isLoaded = false;

    public lowRisk: Objective[];
    public highRisk: Objective[];
    public filteredLowRisk: Objective[];
    public filteredHighRisk: Objective[];
    public inspections: InspectionForStatistics[];
    public filteredInspections: InspectionForStatistics[];
    public currentYearInspections: InspectionForStatistics[];

    public labels: string[];

    colors = {
        visits: ['#447bdd', '#ff8a2f', '#fd9e54', '#c4c4c4'],
        results: ['#ffff0a', '#447bdd'],
    };

    get departmentName(): string {
        return (this.currentDepartment) ? this.currentDepartment.name : '';
    }

    get isEverythingLoaded(): boolean {
        return (this.lowRisk && this.highRisk
            && this.currentDepartment && (this.inspections != null));
    }

    visits: any;
    results: any;

    constructor(private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private objectiveService: ObjectivesService,
        private statisticService: StatisticService,
        public translateService: TranslateService
    ) {
        this.translateService.get([
            'visits', 'objective', 'numberResponseSuccess', 'numberResponseAbsent', 'numberDoorHangerLeft', 'numberInspectionRefused'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    ngOnInit() {
        this.loadDepartment();
        this.loadObjectives();
        this.getInspectionVisits();
    }

    private setUp() {
        if (this.isEverythingLoaded) {
            this.setValue();
        }
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.localized().subscribe(data => {
            this.departments = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
            this.currentDepartment = this.departments.store[0];

            if (this.lowRisk && this.highRisk) {
                this.setUp();
            }
        });

    }

    private loadObjectives() {
        this.objectiveService.getAll(false).subscribe(lowRisk => {
            this.lowRisk = lowRisk;
            this.setUp();
        });

        this.objectiveService.getAll(true).subscribe(highRisk => {
            this.highRisk = highRisk;
            this.setUp();
        });
    }

    private getInspectionVisits() {
        this.statisticService.getInspectionVisitsStatistics().subscribe(inspectionsStatistics => {
            this.inspections = inspectionsStatistics;
        });
    }

    showPercent(arg: any) {
        return {
            text: arg.argumentText + '<br/><b>' + arg.percentText + '</b>'
        };
    }

    showTooltip(arg: any) {
        return {
            text: arg.argumentText + '<br/><b>' + arg.valueText + '</b>'
        };
    }

    customizePieLabel = (arg: any) => {
        return arg.valueText + ' (' + arg.percentText + ')';
    }

    customizeBarLabel = (arg: any) => {
        return {
            visible: true,
            backgroundColor: '#666',
            customizeText: function (e: any) {
                return e.valueText;
            }
        };
    }

    private setValue() {
        this.filteredLowRisk = this.filterByFireSafetyDeparment(this.lowRisk);
        this.filteredHighRisk = this.filterByFireSafetyDeparment(this.highRisk);


        this.filteredInspections = this.inspections.filter((el) => {
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });

        this.currentYearInspections = this.filteredInspections.filter((el) => {
            return (new Date(el.completedOn).getFullYear() === ((new Date()).getFullYear()));
        });

        this.visits = [{
            description: this.labels['numberResponseSuccess'],
            total: this.currentYearInspections.filter((el) => {
                return (el.status === 2);
            }).length,
        }, {
            description: this.labels['numberResponseAbsent'],
            total: this.currentYearInspections.filter((el) => {
                return (el.ownerWasAbsent && !el.doorHangerHasBeenLeft);
            }).length,
        }, {
            description: this.labels['numberDoorHangerLeft'],
            total: this.currentYearInspections.filter((el) => {
                return (el.doorHangerHasBeenLeft === true);
            }).length,
        }, {
            description: this.labels['numberInspectionRefused'],
            total: this.currentYearInspections.filter((el) => {
                return (el.hasBeenRefused === true);
            }).length,
        }];

        this.results = [{
            description: this.labels['objective'],
            total: this.getTotalCurrentObjective(),
        }, {
            description: this.labels['visits'],
            total: this.currentYearInspections.length
        }];
    }

    public onSelectionChanged(e) {
        this.currentDepartment = e.addedItems[0];

        this.isDropDownBoxOpened = false;
        this.lowRisk.filter((el) => {
            this.lowRisk.filter((el) => {
                return (el.idFireSafetyDepartment === this.currentDepartment.id);
            });
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });
        this.setValue();
    }

    private filterByFireSafetyDeparment(array: Objective[]): Objective[] {
        return array.filter((el) => {
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });
    }

    private getTotalCurrentObjective(): number {
        return this.getCurrentObjective(this.lowRisk) + this.getCurrentObjective(this.highRisk);
    }

    private getCurrentObjective(objectives: Objective[]): number {
        const currentObjective = objectives.find(objective => (objective.year === new Date().getFullYear()
            && objective.idFireSafetyDepartment === this.currentDepartment.id));
        return ((currentObjective) ? currentObjective.objective : 0);
    }
}
