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

    getForApproval() {
        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/ForApprovalInspection', {
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

    getGeneralInfo(id: string) {
        return this.http.get(this.apiUrl + 'inspection/' + id + '/detail', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildings(id: string) {
        return this.http.get(this.apiUrl + 'inspection/' + id + '/building', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingDetail(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/detail', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingContact(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/contact', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingPNAPS(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/pnaps', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    approve(id: string) {
        return this.http.post<Boolean>(this.apiUrl + 'Inspection/' + id + '/approve', {}, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    refuse(id: string) {
        return this.http.post<Boolean>(this.apiUrl + 'Inspection/' + id + '/refuse', {}, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    cancel(id: string) {
        return this.http.post<Boolean>(this.apiUrl + 'Inspection/' + id + '/cancel', {}, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
