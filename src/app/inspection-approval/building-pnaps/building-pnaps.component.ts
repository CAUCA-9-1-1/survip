import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-pnaps',
    templateUrl: './building-pnaps.component.html',
    styleUrls: ['./building-pnaps.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingPnapsComponent implements OnInit {
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
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionService.getBuildingPNAPS(this.idBuilding).subscribe(data => {
            this.pnaps = data;
        });
    }
}
