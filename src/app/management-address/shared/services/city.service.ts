import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {City} from '../models/city.model';
import {RequestService} from '../../../shared/services/request.service';

@Injectable()
export class CityService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<City[]>(this.apiUrl + 'City', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(city: City) {
        return this.http.post(
            this.apiUrl + 'City',
            JSON.stringify(city),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idCity: string) {
        return this.http.delete(this.apiUrl + 'City/' + idCity, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
