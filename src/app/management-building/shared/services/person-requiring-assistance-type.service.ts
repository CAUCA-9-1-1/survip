import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {PersonRequiringAssistanceType} from '../models/person-requiring-assistance-type.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class PersonRequiringAssistanceTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<PersonRequiringAssistanceType[]>(this.apiUrl + 'PersonRequiringAssistanceType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(type: PersonRequiringAssistanceType) {
        return this.http.post(
            this.apiUrl + 'PersonRequiringAssistanceType',
            JSON.stringify(type),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idPersonRequiringAssistanceType: string) {
        return this.http.delete(this.apiUrl + 'PersonRequiringAssistanceType/' + idPersonRequiringAssistanceType, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
