import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';

import {RequestService} from '../../../shared/services/request.service';
import {State} from '../models/state.model';


@Injectable()
export class StateService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(): Observable<State[]> {
        return this.get('State');
    }

    localized(): Observable<State[]> {
        return this.get('State/localized');
    }

    save(state: State) {
        return this.post('state', state);
    }

    remove(idState: string) {
        return this.delete('state/' + idState);
    }
}
