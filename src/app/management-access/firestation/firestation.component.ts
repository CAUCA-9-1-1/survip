import { Component, OnInit } from '@angular/core';

import {FirestationService} from '../shared/services/firestation.service';
import {Firestation} from '../shared/models/firestation.model';
import {FireSafetyDepartmentService} from '../shared/services/firesafetydepartment.service';
import {FireSafetyDepartment} from '../shared/models/firesafetydepartment.model';
import {BuildingService} from '../../management-building/shared/services/building.service';
import {Building} from '../../management-building/shared/models/building.model';


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
export class FirestationComponent implements OnInit {
    firestations: Firestation[] = [];
    departments: FireSafetyDepartment[] = [];
    buildings: Building[] = [];

    constructor(
        private firestationService: FirestationService,
        private fireSafetyDepartmentService: FireSafetyDepartmentService,
        private buildingService: BuildingService,
    ) { }

    ngOnInit() {
        this.loadStation();
        this.loadDepartment();
        this.loadBuilding();
    }

    getDepartmentName(data) {
        const department = FireSafetyDepartment.fromJSON(data);

        return department.getLocalization('fr');
    }

    getBuildingName(data) {
        const building = Building.fromJSON(data);

        return building.getLocalization('fr');
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    onRowInserted(e) {
        this.firestationService.save(e.data).subscribe(info => {
            this.loadStation();
        });
    }

    onRowUpdated(e) {
        this.firestationService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.firestationService.remove(e.key.id).subscribe();
    }

    private loadStation() {
        this.firestationService.getAll().subscribe(data => this.firestations = data);
    }

    private loadDepartment() {
        this.fireSafetyDepartmentService.getAll().subscribe(data => this.departments = data);
    }

    private loadBuilding() {
        this.buildingService.getAll().subscribe(data => this.buildings = data);
    }
}
