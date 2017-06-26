import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {ConstructionType} from '../models/construction-type.model';

@Injectable()
export class ConstructionTypeService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('constructiontype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public get(idConstructionType: string) {
    return this.http.get('constructiontype/' + idConstructionType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(type: ConstructionType) {
    return this.http.post(
      'constructiontype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());
  }

  public update(type: ConstructionType) {
    return this.http.put(
      'constructiontype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());
  }

  public remove(idConstructionType: string) {
    return this.http.delete('constructiontype/' + idConstructionType).map((response: Response) => response.json());
  }
}
