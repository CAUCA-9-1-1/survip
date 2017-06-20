import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from 'cause-lib';
import {CityType} from '../models/citytype.model';

@Injectable()
export class CityTypeService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('citytype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(cityType: CityType) {
    return this.http.post(
      'citytype',
      JSON.stringify(cityType)
    ).map((response: Response) => response.json());
  }

  public update(cityType: CityType) {
    return this.http.put(
      'citytype',
      JSON.stringify(cityType),
    ).map((response: Response) => response.json());
  }

  public remove(idCityType: string) {
    return this.http.delete('citytype/' + idCityType).map((response: Response) => response.json());
  }
}
