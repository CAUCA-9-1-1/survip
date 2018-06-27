import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {Inspection} from '../models/inspection.model';
import {InspectionGeneralInfo} from '../models/inspection-general-info.model';
import {InspectionCourse} from '../models/inspection-course.model';
import {InspectionCourses} from '../models/inspection-courses.model';
import {Building} from '../../../management-building/shared/models/building.model';
import {BuildingDetails} from '../models/building-details.model';


@Injectable()
export class InspectionService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<Inspection[]>(this.apiUrl + 'Inspection', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
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
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getGeneralInfo(id: string) {
        return this.http.get<InspectionGeneralInfo>(this.apiUrl + 'inspection/' + id + '/detail', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getCourse(id: string) {
        return this.http.get<InspectionCourses[]>(this.apiUrl + 'inspection/' + id + '/course', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getCourseLane(id: string) {
        return this.http.get<InspectionCourse>(this.apiUrl + 'inspection/course/' + id, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getFireHydrant(id: string) {
        return this.http.get(this.apiUrl + 'inspection/' + id + '/firehydrant', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getSurveySummary(id: string) {
        return this.http.get(this.apiUrl + 'InspectionQuestion/Inspection/' + id + '/Summary', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildings(id: string) {
        return this.http.get<Building[]>(this.apiUrl + 'inspection/' + id + '/building', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingDetail(id: string) {
        return this.http.get<BuildingDetails>(this.apiUrl + 'inspection/building/' + id + '/detail', {
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

    getBuildingSprinkler(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/sprinkler', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingAlarmPanel(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/alarmpanel', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    getBuildingHazardousMaterial(id: string) {
        return this.http.get(this.apiUrl + 'inspection/building/' + id + '/hazardousmaterial', {
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
