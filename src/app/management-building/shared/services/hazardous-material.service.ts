import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {HazardousMaterial} from '../models/hazardous-material.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class HazardousMaterialService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<HazardousMaterial[]>(this.apiUrl + 'HazardousMaterial', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    get(idHazardousMaterial: string) {
        return this.http.get<HazardousMaterial[]>(this.apiUrl + 'HazardousMaterial/' + idHazardousMaterial, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(material: HazardousMaterial) {
        return this.http.post(
            this.apiUrl + 'HazardousMaterial',
            JSON.stringify(material),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idHazardousMaterial: string) {
        return this.http.delete(this.apiUrl + 'HazardousMaterial/' + idHazardousMaterial, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
