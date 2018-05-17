import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';

@Component({
    selector: 'app-anomalies',
    templateUrl: './anomalies.component.html',
    styleUrls: ['./anomalies.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class AnomaliesComponent implements OnInit {
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
        this.inspectionService.getBuildingAnomaly(this.idBuilding).subscribe(data => {
            this.anomalies = data;
        });
    }
}
