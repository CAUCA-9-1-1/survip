import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http.service';
import {FireSafetyDepartment} from '../models/firesafetydepartment.model';

@Injectable()
export class FireSafetyDepartmentService {

  constructor(private http: HttpService) { }

  public getAll() {
    return this.http.get('firesafetydepartment').map((response: Response) => {
      const result = response.json();

      return result;
    });
  }

  public update(dept: FireSafetyDepartment) {
    return this.http.put(
      'firesafetydepartment',
      JSON.stringify(dept)
    ).map((response: Response) => response.json());
  }
}
