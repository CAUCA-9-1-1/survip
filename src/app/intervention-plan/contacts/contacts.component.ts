import {Component, OnInit} from '@angular/core';
import {Contact} from '../shared/contact.interface';
import {ContactsService} from '../shared/contacts.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.styl']
})
export class ContactsComponent implements OnInit {
    contacts: Contact[];

    constructor(private contactsService: ContactsService) {
    }

    ngOnInit() {
        this.contactsService.getContacts().then(contacts => this.contacts = contacts);
    }

}
