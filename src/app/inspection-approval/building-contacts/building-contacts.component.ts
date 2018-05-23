import {Component, Input, OnInit} from '@angular/core';

import {InspectionService} from '../shared/services/inspection.service';


@Component({
    selector: 'app-building-contacts',
    templateUrl: './building-contacts.component.html',
    styleUrls: ['./building-contacts.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class BuildingContactsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.contacts = [];
        this.loadData();
    }

    private idBuilding: string;

    contacts: any = [];

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionService.getBuildingContact(this.idBuilding).subscribe(data => {
            this.contacts = data;
        });
    }
}
