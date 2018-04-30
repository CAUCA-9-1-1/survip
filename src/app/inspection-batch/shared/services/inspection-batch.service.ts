import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {RequestService} from '../../../shared/services/request.service';
import {InspectionBatch} from '../models/inspection-batch.model';


@Injectable()
export class InspectionBatchService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<InspectionBatch[]>(this.apiUrl + 'Batch', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

}
