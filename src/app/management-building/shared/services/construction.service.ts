import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {Construction} from '../../../inspection-approval/shared/models/construction.model';
import {BuildingTypes} from '../../../inspection-approval/shared/models/building-types.model';


@Injectable()
export class ConstructionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getBuildingTypes() {
        return this.http.get<BuildingTypes[]>(this.apiUrl + 'construction/BuildingTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getConstructionTypes() {
        return this.http.get<Construction[]>(this.apiUrl + 'construction/ConstructionTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getFireResistanceTypes() {
        return this.http.get<Construction[]>(this.apiUrl + 'construction/FireResistanceTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getRoofTypes() {
        return this.http.get<Construction[]>(this.apiUrl + 'construction/RoofTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getRoofMaterialTypes() {
        return this.http.get<Construction[]>(this.apiUrl + 'construction/RoofMaterialTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getSidingTypes() {
        return this.http.get<Construction[]>(this.apiUrl + 'construction/SidingTypes', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
