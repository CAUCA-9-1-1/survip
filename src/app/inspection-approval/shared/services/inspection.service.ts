import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {RequestService} from '../../../shared/services/request.service';
import {Inspection} from '../models/inspection.model';
import {BuildingResume} from '../../../management-department/shared/models/building.model';


@Injectable()
export class InspectionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Inspection[]> {
        return this.get('Inspection');
    }

    getBuildingToDo(): Observable<Inspection[]> {
        return this.get('odata/BuildingsWithoutInspection').pipe(
            map(data => {
                return data.value;
            })
        );
    }

    saveImplantationPlan(idBuildingDetail: string, idPicture: string) {
        return this.post('inspection/buildingdetail/' + idBuildingDetail + '/idPicture/' + idPicture, {});
    }

    getSurveySummary(id: string) {
        return this.get('InspectionSurveyAnswer/Inspection/' + id + '/Summary');
    }

    getBuildings(id: string): Observable<BuildingResume[]> {
        return this.get('inspection/' + id + '/buildingresume');
    }

    approve(id: string): Observable<Boolean> {
        return this.post('Inspection/' + id + '/approve', {});
    }

    refuse(id: string, reason: string): Observable<Boolean> {
        return this.post('Inspection/' + id + '/refuse', reason);
    }

    cancel(id: string): Observable<Boolean> {
        return this.post('Inspection/' + id + '/cancel', {});
    }
}
