import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {HazardousMaterial} from '../models/hazardous-material.model';


@Injectable()
export class HazardousMaterialService {

  constructor(private http: HttpClient
  ) { }

  public getAll() {
    /*return this.http.get('hazardousmaterial').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public get(idHazardousMaterial: string) {
    /*return this.http.get('hazardousmaterial/' + idHazardousMaterial).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(material: HazardousMaterial) {
    /*return this.http.post(
      'hazardousmaterial',
      JSON.stringify(material)
    ).map((response: Response) => response.json());*/
  }

  public update(material: HazardousMaterial) {
    /*return this.http.put(
      'hazardousmaterial',
      JSON.stringify(material),
    ).map((response: Response) => response.json());*/
  }

  public remove(idHazardousMaterial: string) {
    // return this.http.delete('hazardousmaterial/' + idHazardousMaterial).map((response: Response) => response.json());
  }
}
