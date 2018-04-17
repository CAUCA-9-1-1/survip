import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { RequestService } from '../../../shared/services/request.service';
import { Country } from '../models/country.model';


@Injectable()
export class CountryService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Country[]>(this.apiUrl + 'Country', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(country: Country) {
        return this.http.post(
            this.apiUrl + 'Country',
            JSON.stringify(country),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idCountry: string) {
        return this.http.delete(this.apiUrl + 'Country/' + idCountry, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
