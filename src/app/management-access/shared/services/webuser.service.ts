import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Webuser} from '../models/webuser.model';


@Injectable()
export class WebuserService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('webuser').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(user: Webuser) {
    /*return this.http.post(
      'webuser',
      JSON.stringify(user)
    ).map((response: Response) => response.json());*/
  }

  public update(user: Webuser) {
    /*return this.http.put(
      'webuser',
      JSON.stringify(user)
    ).map((response: Response) => response.json());*/
  }

  public remove(idWebuser: string) {
    // return this.http.delete('webuser/' + idWebuser).map((response: Response) => response.json());
  }
}
