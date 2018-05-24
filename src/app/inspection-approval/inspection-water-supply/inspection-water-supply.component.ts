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
    @Input() inspectionId: string;

    fireHydrants: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getFireHydrant(this.inspectionId).subscribe(data => {
            this.fireHydrants = data;
        });
    }
}
