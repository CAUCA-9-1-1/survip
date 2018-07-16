import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {CityType} from '../models/citytype.model';
import {RequestService} from '../../../shared/services/request.service';


@Injectable()
export class CityTypeService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<CityType[]>(this.apiUrl + 'CityType', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    localized() {
        return this.http.get<CityType[]>(this.apiUrl + 'CityType/localized', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(cityType: CityType) {
        return this.http.post(
            this.apiUrl + 'CityType',
            JSON.stringify(cityType),
            {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idCityType: string) {
        return this.http.delete(this.apiUrl + 'CityType/' + idCityType, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
