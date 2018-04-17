import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {County} from '../models/county.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CountyService extends RequestService {

    constructor(private http: HttpClient) {
        super();
    }

    getAll() {
        return this.http.get<County[]>(this.apiUrl + 'County', {
            headers: this.headers
        });
    }

    save(county: County) {
        return this.http.post(
            this.apiUrl + 'County',
            JSON.stringify(county),
            {
                headers: this.headers
            }
        );
    }

    remove(idCounty: string) {
        return this.http.delete(this.apiUrl + 'County/' + idCounty, {
            headers: this.headers
        });
    }
}
