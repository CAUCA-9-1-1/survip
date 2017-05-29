import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../core/base.service';
import {Picture} from '../interfaces/picture.interface';

@Injectable()
export class PictureService extends BaseService {
  private url = 'api/picture';

  constructor(http: Http) {
    super(http);
  }

  get(id: string): Observable<Picture> {
    return this.http.get(this.url + '?id=' + id, this.authorization()).map((response: Response) => {
      //return this.http.get(this.url + '/' + id, this.authorization()).map((response: Response) => {
      const result = response.json();
      return result.data[0];
    });
  }

  update(picture: Picture): Observable<object> {
    return this.http.post(
      this.url,
      JSON.stringify(picture),
      this.authorization()).map((response: Response) => response.json());
  }
}
