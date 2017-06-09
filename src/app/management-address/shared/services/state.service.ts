import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {State} from '../models/state.model';

@Injectable()
export class StateService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('state').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public create(state: State) {
    return this.http.post(
      'state',
      JSON.stringify(state)
    ).map((response: Response) => response.json());
  }

  public update(state: State) {
    return this.http.put(
      'state',
      JSON.stringify(state)
    ).map((response: Response) => response.json());
  }

  public remove(idState: string) {
    return this.http.delete('state/' + idState).map((response: Response) => response.json());
  }
}
