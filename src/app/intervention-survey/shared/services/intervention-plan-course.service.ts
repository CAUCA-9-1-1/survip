import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {BaseService} from '../../../core/services/base.service';
import {InterventionPlanCourse} from '../models/intervention-plan-course';

@Injectable()
export class InterventionPlanCourseService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAll() {
    return this.http.get('api/intervention-plan-course', this.authorization()).map((response: Response) => {
      const result = response.json();

      // this.isLogin(result, '/prevention/survey');
      return result.data as InterventionPlanCourse[];
    });
  }
}
