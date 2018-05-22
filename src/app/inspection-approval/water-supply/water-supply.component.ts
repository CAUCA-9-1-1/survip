import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-water-supply',
    templateUrl: './water-supply.component.html',
    styleUrls: ['./water-supply.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class WaterSupplyComponent implements OnInit {
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
