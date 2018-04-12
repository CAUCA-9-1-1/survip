import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from '../../../shared/services/request.service';
import { Country } from '../models/country.model';


@Injectable()
export class CountryService extends RequestService {

    constructor(private http: HttpClient) {
        super();
    }

    getAll() {
        return this.http.get<Country[]>(this.apiUrl + 'Country', {
            headers: this.headers
        });
    }

    save(country: Country) {
        return this.http.post(
            this.apiUrl + 'Country',
            JSON.stringify(country),
            {
                headers: this.headers
            }
        );
    }

    remove(idCountry: string) {
        return this.http.delete(this.apiUrl + 'Country/' + idCountry, {
            headers: this.headers
        });
    }
}
