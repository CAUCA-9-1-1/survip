import {Injectable, Injector} from '@angular/core';

import {RequestService} from '../../../shared/services/request.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BuildingPnaps} from '../models/building-pnaps.model';


@Injectable()
export class BuildingPnapsService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string) {
        return this.http.get<BuildingPnaps[]>(this.apiUrl + 'Building/' + idBuilding + '/pnaps', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    get(idPnaps: string) {
        return this.http.get<BuildingPnaps[]>(this.apiUrl + 'Building/pnaps/' + idPnaps, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(pnaps: BuildingPnaps) {
        return this.http.post(
            this.apiUrl + 'Building/pnaps',
            JSON.stringify(pnaps),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idPnaps: string) {
        return this.http.delete(this.apiUrl + 'Building/pnaps/' + idPnaps, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

}