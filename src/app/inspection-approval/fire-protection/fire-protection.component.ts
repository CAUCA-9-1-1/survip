import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';

@Component({
    selector: 'app-fire-protection',
    templateUrl: './fire-protection.component.html',
    styleUrls: ['./fire-protection.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class FireProtectionComponent implements OnInit {
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
        this.inspectionService.getBuildingSprinkler(this.idBuilding).subscribe(data => {
            this.sprinklers = data;
        });
        this.inspectionService.getBuildingAlarmPanel(this.idBuilding).subscribe(data => {
            this.alarmPanels = data;
        });
    }
}

