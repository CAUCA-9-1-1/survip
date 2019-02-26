import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {InspectionBuildingPnapsService} from '../shared/services/inspection-building-pnaps.service';
import {PersonRequiringAssistanceType} from '../../management-type-system/shared/models/person-requiring-assistance-type.model';
import {PersonRequiringAssistanceTypeService} from '../../management-type-system/shared/services/person-requiring-assistance-type.service';
import {BuildingPnaps} from '../../management-department/shared/models/building-pnaps.model';


@Component({
    selector: 'app-building-pnaps',
    templateUrl: './building-pnaps.component.html',
    styleUrls: ['./building-pnaps.component.scss'],
    providers: [
        InspectionBuildingPnapsService,
        PersonRequiringAssistanceTypeService,
    ]
})
export class BuildingPnapsComponent extends GridWithCrudService implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.dataSource = [];

        if (this.idBuilding) {
            this.loadSource(this.idBuilding);
        }
    }

    public pnapsType: PersonRequiringAssistanceType[];
    private idBuilding: string;

    constructor(
        inspectionBuildingPnapsService: InspectionBuildingPnapsService,
        private pnapsTypeService: PersonRequiringAssistanceTypeService,
    ) {
        super(null, inspectionBuildingPnapsService);
    }

    public ngOnInit() {
        this.loadType();
    }

    public setModel(data: any) {
        return BuildingPnaps.fromJSON(data);
    }

    public onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.dayIsApproximate = false;
        e.data.eveningIsApproximate = false;
        e.data.nightIsApproximate = false;
        e.data.isActive = true;
    }

    private loadType() {
        this.pnapsTypeService.localized().subscribe(data => this.pnapsType = data);
    }
}
