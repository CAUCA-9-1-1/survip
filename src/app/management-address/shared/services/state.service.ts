import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


import {RequestService} from '../../../shared/services/request.service';
import {State} from '../models/state.model';


@Injectable()
export class StateService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<State[]>(this.apiUrl + 'State', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    localized() {
        return this.http.get<State[]>(this.apiUrl + 'State/localized', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    save(state: State) {
        return this.http.post(
            this.apiUrl + 'state',
            JSON.stringify(state), {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    remove(idState: string) {
        return this.http.delete(this.apiUrl + 'state/' + idState, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
