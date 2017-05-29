import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../../core/base.service';
import {InterventionPlanCourse} from '../models/intervention-plan-course';

@Injectable()
export class InterventionPlanCourseService extends BaseService {
  private url = 'api/intervention-plan-course';

  constructor(http: Http) {
    super(http);
  }

  getAll(id?: string) {
    const url = this.url + (id ? '?idInterventionPlan=' + id : '');

    return this.http.get(url, this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data as InterventionPlanCourse[];
    });
  }
}
