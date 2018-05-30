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
    @Input()
    set inspection(id: string) {
        this.idInspection = id;
        this.loadData();
    }

    buildings = [];
    idInspection: string;
    selectedIndex = 0;
    selectedIdBuilding: string;

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.inspectionService.getBuildings(this.idInspection).subscribe(data => {
            data.sort((a, b) => {
                return a.isParent ? 1 : -1;
            });

            this.buildings = data;
            this.selectedIdBuilding = this.buildings[this.selectedIndex].id;
        });
    }

    selectBuilding(index) {
        this.selectedIndex = index;
        this.selectedIdBuilding = this.buildings[this.selectedIndex].id;
    }
}
