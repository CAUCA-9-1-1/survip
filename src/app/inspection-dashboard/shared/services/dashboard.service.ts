import {Injectable, Injector} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import {RequestService} from '../../../shared/services/request.service';
import {DashboardInspection} from '../models/dashboard-inspection.model';


@Injectable()
export class DashboardService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
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
}
