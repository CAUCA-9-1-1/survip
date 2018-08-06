import {Injectable, Injector} from '@angular/core';

import {RequestService} from '../../../shared/services/request.service';
import {DashboardInspection} from '../models/dashboard-inspection.model';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DashboardService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getToDo(loadOptions): Observable<DashboardInspection[]> {
        return this.get('Inspection/ToDoInspection');
    }

    getForApproval(loadOptions): Observable<DashboardInspection[]> {
        return this.get('Inspection/ForApprovalInspection');
    }

    getBuildingHistory(loadOptions): Observable<DashboardInspection[]> {
        return this.get('Inspection/BuildingWithHistory');
    }

    getBuildingToDo(loadOptions): Observable<DashboardInspection[]> {
        return this.get('Inspection/BuildingWithoutInspectionOData');
    }
}
