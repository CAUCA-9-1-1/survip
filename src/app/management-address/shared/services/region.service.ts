import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {Region} from '../models/region.model';
import {RequestService} from '../../../shared/services/request.service';
import {State} from '../models/state.model';

@Injectable()
export class RegionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    public getAll() {
        return this.http.get<Region[]>(this.apiUrl + 'Region', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    public save(state: State) {
        return this.http.post(
            this.apiUrl + 'Region',
            JSON.stringify(state), {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    public remove(idState: string) {
        return this.http.delete(this.apiUrl + 'Region/' + idState, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
