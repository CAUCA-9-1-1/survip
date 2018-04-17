import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { RequestService } from '../../../shared/services/request.service';
import { State } from '../models/state.model';


@Injectable()
export class StateService extends RequestService {

    constructor(private http: HttpClient, injector: Injector) {
        super(injector);
    }

    public getAll() {
        return this.http.get<State[]>(this.apiUrl + 'State', {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }

    public save(state: State) {
        return this.http.post(
            this.apiUrl + 'state',
            JSON.stringify(state), {
                headers: this.headers
            }
        ).catch((error: HttpErrorResponse) => this.error(error));
    }

    public remove(idState: string) {
        return this.http.delete(this.apiUrl + 'state/' + idState, {
            headers: this.headers
        }).catch((error: HttpErrorResponse) => this.error(error));
    }
}
