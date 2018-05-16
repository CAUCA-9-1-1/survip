import {Component, Input, OnInit} from '@angular/core';
import {InspectionService} from '../../inspection-dashboard/shared/services/inspection.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    providers: [
        InspectionService,
    ]
})
export class ContactsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.loadData();
    }

    private idBuilding: string;

    contacts: any = {};

    constructor(
        private inspectionService: InspectionService,
    ) { }

    ngOnInit() {
    }

    loadData() {
        this.inspectionService.getBuildingContact(this.idBuilding).subscribe(data => {
            this.contacts = data;
        });
    }
}
