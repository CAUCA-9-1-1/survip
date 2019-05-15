import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {InspectionBatch} from '../models/inspection-batch.model';
import {PostModel} from '../../../shared/models/post.model';


@Injectable()
export class InspectionBatchService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<InspectionBatch[]> {
        return this.get('Batch');
    }

    getOne(idBatch: string): Observable<InspectionBatch> {
      return this.get('Batch/' + idBatch);
    }

    save(batch: InspectionBatch): Observable<PostModel> {
        return this.post('Batch', batch);
    }

    remove(idBatch: string) {
        return this.delete('Batch/' + idBatch);
    }

    getInspections(idBatch: string) {
      return this.get('Batch/' + idBatch + '/BuildingForManagement');
    }
}
