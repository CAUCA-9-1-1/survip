import {Component, OnInit} from '@angular/core';
import {Contact} from '../shared/contact.model';
import {ContactService} from '../shared/contact.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.styl']
})
export class ContactsComponent implements OnInit {
    contacts: Contact[];

    constructor(private contactsService: ContactService) {
    }

    ngOnInit() {
        this.contactsService.getContacts().then(contacts => this.contacts = contacts);
    }

}
