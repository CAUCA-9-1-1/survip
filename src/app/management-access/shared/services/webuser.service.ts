import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http.service';
import {Webuser} from '../models/webuser.model';

@Injectable()
export class WebuserService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('webuser').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(user: Webuser) {
    return this.http.put(
      'webuser',
      JSON.stringify(user)
    ).map((response: Response) => response.json());
  }
}
