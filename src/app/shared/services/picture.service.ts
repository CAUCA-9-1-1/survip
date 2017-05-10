import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../core/services/base.service';
import {Picture} from '../interfaces/picture.interface';

@Injectable()
export class PictureService extends BaseService {
  private url = 'api/picture';

  constructor(private http: Http) {
    super();
  }

  get(id: string) {
    return this.http.get(this.url + '?id=' + id, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/intervention/maps');
      return result.data[0];
    });
  }

  update(picture: Picture) {
    return this.http.post(
      this.url,
      JSON.stringify(picture),
      this.authorization()).map((response: Response) => response.json());
  }
}
