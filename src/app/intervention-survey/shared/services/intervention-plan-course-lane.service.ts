import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../../core/services/base.service';
import {InterventionPlanCourseLane} from '../models/intervention-plan-course-lane';

@Injectable()
export class InterventionPlanCourseLaneService extends BaseService {
  private url = 'api/intervention-plan-course-lane';

  constructor(private http: Http) {
    super();
  }

  getCourse(id: string): Observable<InterventionPlanCourseLane[]> {
    const url = this.url + '/?idInterventionPlanCourse=' + id;

    return this.http.get(url, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data as InterventionPlanCourseLane[];
    });
  }

  update(lane: InterventionPlanCourseLane): Observable<object> {
    return this.http.post(
      this.url,
      JSON.stringify(lane),
      this.authorization()).map((response: Response) => response.json());
  }
}
