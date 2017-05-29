import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../../core/base.service';
import {InterventionPlanCourseLane} from '../models/intervention-plan-course-lane';

@Injectable()
export class InterventionPlanCourseLaneService extends BaseService {
  private url = 'api/intervention-plan-course-lane';

  constructor(http: Http) {
    super(http);
  }

  getCourse(id: string): Observable<InterventionPlanCourseLane[]> {
    const url = this.url + '/?idInterventionPlanCourse=' + id;

    return this.http.get(url, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data as InterventionPlanCourseLane[];
    });
  }

  add(lane: InterventionPlanCourseLane): Observable<object> {
    return this.http.post(
      this.url,
      JSON.stringify(lane),
      this.authorization()).map((response: Response) => {
        return response.json();
      }
    );
  }

  update(lane: InterventionPlanCourseLane): Observable<object> {
    return this.http.post(
      this.url,
      JSON.stringify(lane),
      this.authorization()).map((response: Response) => {
        return response.json();
      }
    );
  }

  delete(id: string): Observable<object> {
    return this.http.delete(
      this.url + '/' + id,
      this.authorization()).map((response: Response) => {
        return response.json();
      }
    );
  }
}
