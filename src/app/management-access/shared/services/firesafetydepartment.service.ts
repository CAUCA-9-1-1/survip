import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';
import {FireSafetyDepartment} from '../models/firesafetydepartment.model';

@Injectable()
export class FireSafetyDepartmentService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('firesafetydepartment').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }

  public create(dept: FireSafetyDepartment) {
    return this.http.post(
      'firesafetydepartment',
      JSON.stringify(dept)
    ).map((response: Response) => response.json());
  }

  public update(dept: FireSafetyDepartment) {
    return this.http.put(
      'firesafetydepartment',
      JSON.stringify(dept)
    ).map((response: Response) => response.json());
  }

  public remove(idFireSafetyDepartment: string) {
    return this.http.delete('firesafetydepartment/' + idFireSafetyDepartment).map((response: Response) => response.json());
  }
}
