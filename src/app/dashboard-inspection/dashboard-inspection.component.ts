import { Component, OnInit } from '@angular/core';

import { InspectionService } from './shared/services/inspection.service';
import { Inspection } from './shared/models/inspection.model';


@Component({
    selector: 'app-dashboard-inspection',
    templateUrl: './dashboard-inspection.component.html',
    styleUrls: ['./dashboard-inspection.component.scss'],
    providers: [
        InspectionService
    ]
})
export class DashboardInspectionComponent implements OnInit {
    dataSource: any[];
    selectedMode = 'mode4';
    searchWidth = (screen.width / 2);

    constructor(
        private inspectionService: InspectionService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        switch (this.selectedMode) {
            case 'mode1':
                this.inspectionService.getToDo().subscribe(data => this.dataSource = data);
                break;
            case 'mode4':
                this.inspectionService.getBuildingToDo().subscribe(data => this.dataSource = data);
                break;
            default:
                this.dataSource = [];
                break;
        }
    }
}
