import {Injectable} from '@angular/core';
import {Contact} from './contact.model';

@Injectable()
export class ContactService {
    CONTACTS: Contact[] = [
        {
            'idContact': '1',
            'name': 'Eric Mercier',
            'phoneNumber': '418-555-2767',
            'supplementaryInformation': 'Personne contact proprio'
        },
        {
            'idContact': '2',
            'name': 'Mario Vallieres',
            'phoneNumber': '418-555-1254',
            'supplementaryInformation': 'Deuxième personne ressource'
        }];

    constructor() {
    }

    getContacts(): Promise<Contact[]> {
        return Promise.resolve(this.CONTACTS);
    }
}

