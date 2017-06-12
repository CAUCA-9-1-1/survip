import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {City} from '../models/city.model';

@Injectable()
export class CityService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('city').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public create(city: City) {
    return this.http.post(
      'city',
      JSON.stringify(city)
    ).map((response: Response) => response.json());
  }

  public update(city: City) {
    return this.http.put(
      'city',
      JSON.stringify(city),
    ).map((response: Response) => response.json());
  }

  public remove(idCity: string) {
    return this.http.delete('city/' + idCity).map((response: Response) => response.json());
  }
}
