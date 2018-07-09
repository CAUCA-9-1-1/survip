import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {County} from '../models/county.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CountyService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<County[]>(this.apiUrl + 'County', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(county: County) {
        return this.http.post(
            this.apiUrl + 'County',
            JSON.stringify(county),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idCounty: string) {
        return this.http.delete(this.apiUrl + 'County/' + idCounty, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
