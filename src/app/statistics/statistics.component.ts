import { Component, OnInit } from '@angular/core';
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

    colors = {
        visits: ['#447bdd', '#ff8a2f', '#fd9e54', '#c4c4c4'],
        results: ['#ffff0a', '#447bdd'],
    };

    get departmentName(): string {
        return (this.currentDepartment) ? this.currentDepartment.name : '';
    }

    get isEverythingLoaded(): boolean {
        return (this.lowRisk && this.highRisk && this.currentDepartment);
    }

    visits: any;
    results: any;

    constructor(private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private objectiveService: ObjectivesService,
        private statisticService: StatisticService) {
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
        this.filteredLowRisk = this.lowRisk.filter((el) => {
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });

        this.filteredHighRisk = this.highRisk.filter((el) => {
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });

        this.filteredInspections = this.inspections.filter((el) => {
            return (el.idFireSafetyDepartment === this.currentDepartment.id);
        });

        this.currentYearInspections = this.filteredInspections.filter((el) => {
            return (new Date(el.completedOn).getFullYear() === ((new Date()).getFullYear()));
        });

        this.visits = [{
            description: 'Nombre de réponse avec succès',
            total: this.currentYearInspections.filter((el) => {
                return (el.status === 2);
            }).length,
        }, {
            description: 'Nombre de visite avec absence',
            total: this.currentYearInspections.filter((el) => {
                return (el.ownerWasAbsent && !el.doorHangerHasBeenLeft);
            }).length,
        }, {
            description: 'Nombre d\'accroche porte répondu',
            total: this.currentYearInspections.filter((el) => {
                return (el.doorHangerHasBeenLeft === true);
            }).length,
        }, {
            description: 'Nombre d\'inspection refusée',
            total: this.currentYearInspections.filter((el) => {
                return (el.hasBeenRefused === true);
            }).length,
        }];

        this.results = [{
            description: 'Objectif',
            total: this.getCurrentObjective(),
        }, {
            description: 'Visites',
            total: this.currentYearInspections.length
        }];
    }

    updateGraphics(e) {
        this.currentDepartment = e.addedItems[0];

        this.isDropDownBoxOpened = false;

        this.setValue();
    }

    private getCurrentObjective(): number {
        let count = 0;

        const lowRiskObjective = this.filteredLowRisk.filter((el) => {
            return (el.year === (new Date()).getFullYear());
        });

        if (lowRiskObjective.length > 0) {
            count += lowRiskObjective[0].objective;
        }

        const highRiskObjective = this.filteredHighRisk.filter((el) => {
            return (el.year === (new Date()).getFullYear());
        });

        if (highRiskObjective.length > 0) {
            count += highRiskObjective[0].objective;
        }

        return count;
    }
}