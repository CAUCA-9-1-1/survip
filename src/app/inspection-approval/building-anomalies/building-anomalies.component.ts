import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-anomalies',
    templateUrl: './building-anomalies.component.html',
    styleUrls: ['./building-anomalies.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingAnomaliesComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.anomalies = [];
        this.loadData();
    }

    private idBuilding: string;

    anomalies: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionService.getBuildingAnomaly(this.idBuilding).subscribe(data => {
            this.anomalies = data;
        });
    }
}
