import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {InspectionCourses} from '../models/inspection-courses.model';
import {InspectionCourse} from '../models/inspection-course.model';
import {RequestService} from '../../../shared/services/request.service';
import {InspectionCourseLane} from '../models/inspection-course-lane.model';


@Injectable({
    providedIn: 'root'
})
export class InspectionCourseService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getCourse(id: string): Observable<InspectionCourses[]> {
        return this.get('inspection/' + id + '/course');
    }

    deleteCourse(id: string) {
        return this.delete('inspection/course/' + id);
    }

    getCourseLane(id: string): Observable<InspectionCourse> {
        return this.get('inspection/course/' + id);
    }

    getCourseLaneDetail(id: string): Observable<InspectionCourseLane> {
        return this.get('inspection/courselane/' + id);
    }
}
