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
    public currentDepartment: string[] = null;

    public isDropDownBoxOpened = false;
    public isLoaded = false;

    public lowRisk: Objective[];
    public highRisk: Objective[];
    public filteredLowRisk: Objective[];
    public filteredHighRisk: Objective[];
    public inspections: InspectionForStatistics[];

    colors = {
        visits: ['#447bdd', '#ff8a2f', '#fd9e54', '#c4c4c4'],
        results: ['#ffff0a', '#447bdd'],
    };

    visits: any = [{
        description: 'Nombre de réponse avec succès',
        total: 128,
    }, {
        description: 'Nombre de visite avec absence',
        total: 27,
    }, {
        description: 'Nombre d\'accroche porte répondu',
        total: 32,
    }, {
        description: 'Nombre d\'inspection refusée',
        total: 11,
    }];

    results: any = [{
        description: 'Objectif',
        total: 270
    }, {
        description: 'Réponses',
        total: 128
    }];

    timeline = [
        { month: 'Janvier', count: 110 },
        { month: 'Février', count: 112 },
        { month: 'Mars', count: 55 },
        { month: 'Avril', count: 200 },
        { month: 'Mai', count: 39 }
    ];

    constructor(private fireSafetyDepartmentService: FireSafetyDepartmentService) {
    }

    ngOnInit() {
        this.loadDepartment();
        this.loadObjectives();
        this.loadStatiticsForFireSafetyDepartment();
        this.getInspections();
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.localized().subscribe(data => {
            this.departments = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadStatiticsForFireSafetyDepartment() {
        this.statisticService.getStatus().subscribe(data => {
            this.visits = [{
                description: 'Nombre de réponse avec succès',
                total: data.success,
            }, {
                description: 'Nombre de visite avec absence',
                total: data.ownerWasAbsent,
            }, {
                description: 'Nombre d\'accroche porte répondu',
                total: data.doorHangerHasBeenLeft,
            }, {
                description: 'Nombre d\'inspection refusée',
                total: data.inspectionRefused,
            }];
            this.isLoaded = true;
        });
    }

    private loadObjectives() {
        this.objectiveService.getAll(false).subscribe(lowRisk => {
            this.lowRisk = lowRisk;
        });

        this.objectiveService.getAll(true).subscribe(highRisk => {
            this.highRisk = highRisk;
        });
    }

    private getInspections() {
        this.statisticService.getInspections().subscribe(inspectionsStatistics => {
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

    updateGraphics(e) {
        this.currentDepartment = e.value;
        console.log(this.currentDepartment);
    }
}