import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';

@Injectable()
export class ApisActionService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('apisaction').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }
}
