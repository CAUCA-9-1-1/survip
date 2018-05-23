import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-fire-protection',
    templateUrl: './building-fire-protection.component.html',
    styleUrls: ['./building-fire-protection.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingFireProtectionComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.sprinklers = [];
        this.alarmPanels = [];
        this.loadData();
    }

    private idBuilding: string;

    sprinklers: any = [];
    alarmPanels: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionService.getBuildingSprinkler(this.idBuilding).subscribe(data => {
            this.sprinklers = data;
        });
        this.inspectionService.getBuildingAlarmPanel(this.idBuilding).subscribe(data => {
            this.alarmPanels = data;
        });
    }
}

