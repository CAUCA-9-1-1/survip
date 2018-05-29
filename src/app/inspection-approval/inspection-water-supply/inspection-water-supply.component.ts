import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-inspection-water-supply',
    templateUrl: './inspection-water-supply.component.html',
    styleUrls: ['./inspection-water-supply.component.scss'],
    providers: [
        InspectionService,
    ],
})
export class InspectionWaterSupplyComponent implements OnInit {
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    idInspection: string;
    fireHydrants: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.inspectionService.getFireHydrant(this.idInspection).subscribe(data => {
            this.fireHydrants = data;
        });
    }
}
