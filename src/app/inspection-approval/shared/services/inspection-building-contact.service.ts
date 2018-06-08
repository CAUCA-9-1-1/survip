import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingContact} from '../../../management-building/shared/models/building-contact.model';


@Injectable()
export class InspectionBuildingContactService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string) {
        return this.http.get<BuildingContact[]>(this.apiUrl + 'Inspection/Building/' + idBuilding + '/Contact', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    get(idContact: string) {
        return this.http.get<BuildingContact[]>(this.apiUrl + 'Inspection/Building/Contact/' + idContact, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(contact: BuildingContact) {
        return this.http.post(
            this.apiUrl + 'Inspection/Building/Contact',
            JSON.stringify(contact),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idContact: string) {
        return this.http.delete(this.apiUrl + 'Inspection/Building/Contact/' + idContact, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
