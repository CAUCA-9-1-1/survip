import {Injectable, Injector} from '@angular/core';

import {RequestService} from '../../../shared/services/request.service';
import {DashboardInspection} from '../models/dashboard-inspection.model';


@Injectable()
export class DashboardService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getToDo(loadOptions) {
        this.headers['queryLoadOptions'] = JSON.stringify(loadOptions);

        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/ToDoInspection', {
            headers: this.headers
        });
    }

    getForApproval(loadOptions) {
        this.headers['queryLoadOptions'] = JSON.stringify(loadOptions);

        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/ForApprovalInspection', {
            headers: this.headers
        });
    }

    getBuildingHistory(loadOptions) {
        this.headers['queryLoadOptions'] = JSON.stringify(loadOptions);

        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/BuildingWithHistory', {
            headers: this.headers
        });
    }

    getBuildingToDo(loadOptions) {
        this.headers['queryLoadOptions'] = JSON.stringify(loadOptions);

        return this.http.get<DashboardInspection[]>(this.apiUrl + 'Inspection/BuildingWithoutInspection', {
            headers: this.headers
        });
    }
}
