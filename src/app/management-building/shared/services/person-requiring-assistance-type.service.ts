import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {PersonRequiringAssistanceType} from '../models/person-requiring-assistance-type.model';


@Injectable()
export class PersonRequiringAssistanceTypeService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('personrequiringassistancetype').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public get(idPersonRequiringAssistanceType: string) {
    /*return this.http.get('personrequiringassistancetype/' + idPersonRequiringAssistanceType).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(type: PersonRequiringAssistanceType) {
    /*return this.http.post(
      'personrequiringassistancetype',
      JSON.stringify(type)
    ).map((response: Response) => response.json());*/
  }

  public update(type: PersonRequiringAssistanceType) {
    /*return this.http.put(
      'personrequiringassistancetype',
      JSON.stringify(type),
    ).map((response: Response) => response.json());*/
  }

  public remove(idPersonRequiringAssistanceType: string) {
    // return this.http.delete('personrequiringassistancetype/' + idPersonRequiringAssistanceType).map((response: Response) => response.json());
  }
}
