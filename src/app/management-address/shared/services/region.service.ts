import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {Region} from '../models/region.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class RegionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Region[]>(this.apiUrl + 'Region', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    localized() {
        return this.http.get<Region[]>(this.apiUrl + 'Region/localized', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(region: Region) {
        return this.http.post(
            this.apiUrl + 'Region',
            JSON.stringify(region), {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idState: string) {
        return this.http.delete(this.apiUrl + 'Region/' + idState, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
