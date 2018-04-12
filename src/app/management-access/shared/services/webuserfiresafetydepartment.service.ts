import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {WebuserFireSafetyDepartment} from '../models/webuserfiresafetydepartment.model';


@Injectable()
export class WebuserFireSafetyDepartmentService {

  constructor(private http: HttpClient) { }

  public getByUser(idWebuser: string) {
    /*return this.http.get('webuserfiresafetydepartment/' + idWebuser).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(userDept: WebuserFireSafetyDepartment) {
    /*return this.http.post(
      'webuserfiresafetydepartment',
      JSON.stringify(userDept)
    ).map((response: Response) => response.json());*/
  }

  public update(userDept: WebuserFireSafetyDepartment) {
    /*return this.http.put(
      'webuserfiresafetydepartment',
      JSON.stringify(userDept)
    ).map((response: Response) => response.json());*/
  }

  public remove(idWebuser: string) {
    // return this.http.delete('webuserfiresafetydepartment/' + idWebuser).map((response: Response) => response.json());
  }
}
