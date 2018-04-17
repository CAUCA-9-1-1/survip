import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Region} from '../models/region.model';
import {RequestService} from '../../../shared/services/request.service';
import {State} from '../models/state.model';

@Injectable()
export class RegionService extends RequestService {

    constructor(private http: HttpClient) {
        super();
    }

    public getAll() {
        return this.http.get<Region[]>(this.apiUrl + 'Region', {
            headers: this.headers
        });
    }

    public save(state: State) {
        return this.http.post(
            this.apiUrl + 'Region',
            JSON.stringify(state), {
                headers: this.headers
            }
        );
    }

    public remove(idState: string) {
        return this.http.delete(this.apiUrl + 'Region/' + idState, {
            headers: this.headers
        });
    }
}
