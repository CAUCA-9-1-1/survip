import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {BuildingHazardousMaterial} from '../../../management-building/shared/models/building-hazardous-material.model';


@Injectable()
export class InspectionBuildingHazardousMaterialService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll(idBuilding: string) {
        return this.http.get<BuildingHazardousMaterial[]>(this.apiUrl + 'Building/' + idBuilding + '/hazardousmaterial', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    get(idHazardousMatereial: string) {
        return this.http.get<BuildingHazardousMaterial[]>(this.apiUrl + 'Building/hazardousmaterial/' + idHazardousMatereial, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(idHazardousMatereial: BuildingHazardousMaterial) {
        return this.http.post(
            this.apiUrl + 'Building/hazardousmaterial',
            JSON.stringify(idHazardousMatereial),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idPnaps: string) {
        return this.http.delete(this.apiUrl + 'Building/hazardousmaterial/' + idPnaps, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
