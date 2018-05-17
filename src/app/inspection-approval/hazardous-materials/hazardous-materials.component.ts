import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';

@Component({
    selector: 'app-hazardous-materials',
    templateUrl: './hazardous-materials.component.html',
    styleUrls: ['./hazardous-materials.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class HazardousMaterialsComponent implements OnInit {
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
        this.inspectionService.getBuildingHazardousMaterial(this.idBuilding).subscribe(data => {
            this.materials = data;
        });
    }
}
