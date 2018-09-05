import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {InspectionBuildingContactService} from '../shared/services/inspection-building-contact.service';
import {BuildingContact} from '../../management-department/shared/models/building-contact.model';


@Component({
    selector: 'app-building-contacts',
    templateUrl: './building-contacts.component.html',
    styleUrls: ['./building-contacts.component.scss'],
    providers: [
        InspectionBuildingContactService,
    ]
})
export class BuildingContactsComponent extends GridWithCrudService implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.dataSource = [];

        if (this.idBuilding) {
            this.loadSource(this.idBuilding);
        }
    }

    private idBuilding: string;

    public constructor(
        inspectionBuildingContactService: InspectionBuildingContactService,
    ) {
        super(inspectionBuildingContactService);
    }

    public ngOnInit() {
    }

    public setModel(data: any) {
        return BuildingContact.fromJSON(data);
    }

    public onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isOwner = false;
        e.data.callPriority = 0;
        e.data.isActive = true;
    }
}
