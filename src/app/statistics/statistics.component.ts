import { Component, OnInit } from '@angular/core';
import { FireSafetyDepartmentService } from '../management-system/shared/services/firesafetydepartment.service';
import {
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxFormComponent
} from 'devextreme-angular';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    providers: [FireSafetyDepartmentService]
})
export class StatisticsComponent implements OnInit {
    public departments: any = { store: [] };
    public idFireSafetyDeparment: string = null;
    public statsLoaded = false;
    public currentDepartment: string[] = null;

    public case: number;
    public objective: number = 100;

    get isLoaded() {
        return (this.currentDepartment != null);
    }

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