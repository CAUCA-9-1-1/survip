import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {FirestationService} from '../shared/services/firestation.service';
import {FireSafetyDepartmentService} from '../../management-system/shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../../management-system/shared/models/firesafetydepartment.model';
import {BuildingService} from '../shared/services/building.service';
import {Building} from '../shared/models/building.model';
import {Firestation} from '../shared/models/firestation.model';


@Component({
    selector: 'app-management-department-firestation',
    templateUrl: './firestation.component.html',
    styleUrls: ['./firestation.component.scss'],
    providers: [
        FirestationService,
        FireSafetyDepartmentService,
        BuildingService,
    ]
})
export class FirestationComponent extends GridWithCrudService implements OnInit {
    departments: any = {};
    buildings: Building[] = [];
    buildingLookup: {
        closeOnOutsideClick: true,
    };

    constructor(
        firestationService: FirestationService,
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private buildingService: BuildingService,
    ) {
        super(firestationService);
    }

    setModel(data: any) {
        return Firestation.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadDepartment();
        this.loadBuilding();
    }

    getBuildingName(data) {
        return data.civicNumber + ' ' + data.lane + ', ' + data.city + (data.name ? ' (' + data.name + ')' : '');
    }

    onEditorPreparing(e: any): void {
        if (e.dataField === 'idBuilding') {
            e.editorName = 'dxLookup';
            e.editorOptions.valueExpr = 'id';
            e.editorOptions.displayExpr = (item) => {
                if (item) {
                    return item.civicNumber + ' ' + item.lane + ', ' + item.city;
                }
            };
            e.editorOptions.dataSource = this.buildings;
            e.editorOptions.closeOnOutsideClick = true;
        }

    }

    onInitNewRow(e) {
        e.data.isActive = true;

        this.loadDepartment();
    }

    onEditingStart(e) {
        this.loadDepartment();
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.localized().subscribe(data => {
            console.log('departments : ', data);
            this.departments = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadBuilding() {
        this.buildingService.getActive().subscribe(data => this.buildings = data);
    }
}
