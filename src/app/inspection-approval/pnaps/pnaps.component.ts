import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-pnaps',
    templateUrl: './pnaps.component.html',
    styleUrls: ['./pnaps.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class PnapsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.pnaps = [];
        this.loadData();
    }

    private idBuilding: string;

    pnaps: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        this.inspectionService.getBuildingPNAPS(this.idBuilding).subscribe(data => {
            this.pnaps = data;
        });
    }
}
