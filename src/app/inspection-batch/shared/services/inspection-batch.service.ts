import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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

    save(batch: InspectionBatch): Observable<PostModel> {
        return this.post('Batch', batch);
    }

    remove(idBatch: string) {
        return this.delete('Batch/' + idBatch);
    }
}
