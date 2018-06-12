import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingContact} from '../models/building-contact.model';


@Injectable()
export class BuildingContactService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string) {
        return this.http.get<BuildingContact[]>(this.apiUrl + 'Building/' + idBuilding + '/Contact', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    get(idContact: string) {
        return this.http.get<BuildingContact[]>(this.apiUrl + 'Building/Contact/' + idContact, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(contact: BuildingContact) {
        return this.http.post(
            this.apiUrl + 'Building/Contact',
            JSON.stringify(contact),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idContact: string) {
        return this.http.delete(this.apiUrl + 'Building/Contact/' + idContact, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
