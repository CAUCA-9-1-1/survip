import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from '../../../shared/services/request.service';
import {DashboardInspection} from '../models/dashboard-inspection.model';


@Injectable()
export class InspectionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getToDo() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/ToDoInspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getApproved() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/ApprovedInspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingHistory() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/BuildingWithHistory', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingToDo() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/BuildingWithoutInspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
