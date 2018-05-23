import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-hazardous-materials',
    templateUrl: './building-hazardous-materials.component.html',
    styleUrls: ['./building-hazardous-materials.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingHazardousMaterialsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.materials = [];
        this.loadData();
    }

    private idBuilding: string;

    materials: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionService.getBuildingHazardousMaterial(this.idBuilding).subscribe(data => {
            this.materials = data;
        });
    }
}
