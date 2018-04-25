import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { RequestService } from '../../../shared/services/request.service';
import { Inspection } from '../models/inspection.model';
import { Building } from '../../../management-building/shared/models/building.model';


@Injectable()
export class InspectionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getToDo() {
        return this.http.get<Inspection[]>(this.apiUrl + 'Inspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingToDo() {
        return this.http.get<Building[]>(this.apiUrl + 'BuildingWithoutInspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
