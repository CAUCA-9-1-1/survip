import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from '../../../shared/services/request.service';
import { State } from '../models/state.model';


@Injectable()
export class StateService extends RequestService {


    constructor(private http: HttpClient) {
        super();
    }

    public getAll() {
        return this.http.get<State[]>(this.apiUrl + 'State', {
            headers: this.headers
        });
    }

    public save(state: State) {
        return this.http.post(
            this.apiUrl + 'state',
            JSON.stringify(state), {
                headers: this.headers
            }
        );
    }

    public remove(idState: string) {
        return this.http.delete(this.apiUrl + 'state/' + idState, {
            headers: this.headers
        });
    }
}
