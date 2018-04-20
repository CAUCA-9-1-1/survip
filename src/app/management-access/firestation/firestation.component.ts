import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

import {FirestationService} from '../shared/services/firestation.service';
import {Firestation} from '../shared/models/firestation.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {BuildingService} from '../../management-building/shared/services/building.service';
import {Building} from '../../management-building/shared/models/building.model';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-management-access-firestation',
    templateUrl: './firestation.component.html',
    styleUrls: ['./firestation.component.scss'],
    providers: [
        FirestationService,
        FireSafetyDepartmentService,
        BuildingService,
    ]
})
export class FirestationComponent extends GridWithCrudService implements OnInit {
    departments: FireSafetyDepartment[] = [];
    buildings: Building[] = [];

    constructor(
        firestationService: FirestationService,
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private buildingService: BuildingService,
    ) {
        super(firestationService);
    }

    ngOnInit() {
        this.loadSource();
        this.loadDepartment();
        this.loadBuilding();
    }

    getDepartmentName(data) {
        const department = FireSafetyDepartment.fromJSON(data);

        return department.getLocalization(environment.locale.use);
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.getAll().subscribe(data => this.departments = data);
    }

    private loadBuilding() {
        this.buildingService.getAll().subscribe(data => this.buildings = data);
    }
}
