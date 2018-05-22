import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-list',
    templateUrl: './building-list.component.html',
    styleUrls: ['./building-list.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingListComponent implements OnInit {
    @Input() selected: string;
    @Input() inspectionId: string;

    buildings = [];
    selectedIndex = 0;
    selectedIdBuilding: string;

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
        this.inspectionService.getBuildings(this.inspectionId).subscribe(data => {
            this.buildings = data;
            this.selectedIdBuilding = this.buildings[this.selectedIndex].id;
        });
    }

    selectBuilding(index) {
        this.selectedIndex = index;
        this.selectedIdBuilding = this.buildings[this.selectedIndex].id;
    }
}
