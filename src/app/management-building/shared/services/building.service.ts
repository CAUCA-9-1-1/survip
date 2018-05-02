import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {Building} from '../models/building.model';


@Injectable()
export class BuildingService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Building[]>(this.apiUrl + 'Building', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getActive() {
        return this.http.get<Building[]>(this.apiUrl + 'Building/Active', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(building: Building) {
        return this.http.post(
            this.apiUrl + 'Building',
            JSON.stringify(building),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idBuilding: string) {
        return this.http.delete(this.apiUrl + 'Building/' + idBuilding, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
