import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../shared/services/inspection.service';
import {Building, BuildingResume} from '../../management-department/shared/models/building.model';


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

    buildings: BuildingResume[] = [];
    idInspection: string;
    selectedIndex = 0;
    selectedIdBuilding: string;
    selectedBuilding: BuildingResume;

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() { }

    loadData() {
        if (!this.idInspection) {
            return null;
        }

        this.inspectionService.getBuildings(this.idInspection).subscribe(data => {
          this.buildings = data.sort((a, b) => a.isMainBuilding === b.isMainBuilding ? 0 : a.isMainBuilding ? -1 : 1);
          this.selectedBuilding = this.buildings[this.selectedIndex];
          this.selectedIdBuilding = this.selectedBuilding.id;
        });
    }

    selectBuilding(index) {
        this.selectedIndex = index;
        this.selectedBuilding = this.buildings[this.selectedIndex];
        this.selectedIdBuilding = this.selectedBuilding.id;
    }

    public getBuildingDescription(building: BuildingResume, index): string {
      if (building.aliasName) {
        return building.aliasName;
      } else if (building.corporateName) {
        return building.corporateName;
      } else if (building.isMainBuilding) {
        return 'Bâtiment principal';
      } else {
        return 'Bâtiment enfant #' + index;
      }
    }
}
