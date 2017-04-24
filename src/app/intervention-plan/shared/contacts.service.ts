import {Injectable} from '@angular/core';
import {Contact} from './contact.interface';

@Injectable()
export class ContactsService {
    CONTACTS: Contact[] = [
        {
            'idContact': '1',
            'Name': 'Eric Mercier',
            'PhoneNumber': '418-228-8750',
            'SupplementaryInformation': 'Personne contact proprio'
        },
        {
            'idContact': '2',
            'Name': 'Mario Vallieres',
            'PhoneNumber': '418-222-1376',
            'SupplementaryInformation': 'Deuxième personne ressource'
        }];

    constructor() {
    }

    getContacts(): Promise<Contact[]> {
        return Promise.resolve(this.CONTACTS);
    }
}

