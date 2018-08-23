import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {RequestService} from '../../../shared/services/request.service';
import {Inspection} from '../models/inspection.model';
import {InspectionGeneralInfo} from '../models/inspection-general-info.model';
import {Building} from '../../../management-building/shared/models/building.model';
import {BuildingDetails} from '../models/building-details.model';


@Injectable()
export class InspectionService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Inspection[]> {
        return this.get('Inspection');
    }

    getBuildingToDo(search?: string): Observable<Inspection[]> {
        let params = '?$orderby=fullLaneName&$top=201';

        if (search) {
            params += '&$filter=(contains(fullCivicNumber,\'' + search + '\'))';
            params += ' or (contains(fullLaneName,\'' + search + '\'))';
            params += ' or (contains(matricule,\'' + search + '\'))';
        }

        return this.get('odata/BuildingsWithoutInspection' + params).pipe(
            map(data => {
                return data.value;
            })
        );
    }

    getGeneralInfo(id: string): Observable<InspectionGeneralInfo> {
        return this.get('inspection/' + id + '/detail');
    }

    saveImplantationPlan(idBuildingDetail: string, idPicture: string) {
        return this.post('inspection/buildingdetail/' + idBuildingDetail + '/idPicture/' + idPicture, {});
    }

    getSurveySummary(id: string) {
        return this.get('InspectionQuestion/Inspection/' + id + '/Summary');
    }

    getBuildings(id: string): Observable<Building[]> {
        return this.get('inspection/' + id + '/building');
    }

    getBuildingDetail(id: string): Observable<BuildingDetails> {
        return this.get('inspection/building/' + id + '/detail');
    }

    getBuildingPNAPS(id: string) {
        return this.get('inspection/building/' + id + '/pnaps');
    }

    getBuildingSprinkler(id: string) {
        return this.get('inspection/building/' + id + '/sprinkler');
    }

    getBuildingAlarmPanel(id: string) {
        return this.get('inspection/building/' + id + '/alarmpanel');
    }

    getBuildingHazardousMaterial(id: string) {
        return this.get('inspection/building/' + id + '/hazardousmaterial');
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
