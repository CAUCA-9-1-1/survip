import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Firestation} from '../models/firestation.model';


@Injectable()
export class FirestationService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<Firestation[]> {
        return this.get('Firestation');
    }

    getAllOfCity(idCity: string): Observable<Firestation[]> {
        return this.get('city/' + idCity + '/firestations');
    }

    save(station: Firestation) {
        return this.post('Firestation', station);
    }

    remove(idStation: string) {
        return this.delete('Firestation/' + idStation);
    }
}
