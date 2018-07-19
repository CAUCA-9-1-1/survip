import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Inspection} from '../models/inspection.model';
import {InspectionGeneralInfo} from '../models/inspection-general-info.model';
import {InspectionCourse} from '../models/inspection-course.model';
import {InspectionCourses} from '../models/inspection-courses.model';
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

    getBuildingToDo(search?: string) {
        const loadOptions = {
            take: 20,
        };

        if (search) {
            loadOptions['filter'] = [[search]];
        }

        this.headers['queryLoadOptions'] = JSON.stringify(loadOptions);

        return this.http.get<{
            data: Inspection[];
        }>(this.apiUrl + 'Inspection/BuildingWithoutInspection', {
            headers: this.headers,
        });
    }

    getGeneralInfo(id: string): Observable<InspectionGeneralInfo> {
        return this.get('inspection/' + id + '/detail');
    }

    getCourse(id: string): Observable<InspectionCourses[]> {
        return this.get('inspection/' + id + '/course');
    }

    getCourseLane(id: string): Observable<InspectionCourse> {
        return this.get('inspection/course/' + id);
    }

    getFireHydrant(id: string) {
        return this.get('inspection/' + id + '/firehydrant');
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

    getBuildingContact(id: string) {
        return this.get('inspection/building/' + id + '/contact');
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

    refuse(id: string): Observable<Boolean> {
        return this.post('Inspection/' + id + '/refuse', {});
    }

    cancel(id: string): Observable<Boolean> {
        return this.post('Inspection/' + id + '/cancel', {});
    }
}
