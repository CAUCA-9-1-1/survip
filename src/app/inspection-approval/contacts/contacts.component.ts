import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
    }

    private idBuilding: string;

    constructor() { }

    ngOnInit() {
    }

}
