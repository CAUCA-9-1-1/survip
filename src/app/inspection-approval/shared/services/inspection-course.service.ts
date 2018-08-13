import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {RequestService} from '../../../shared/services/request.service';
import {Course} from '../models/course.model';


@Injectable({
    providedIn: 'root'
})
export class InspectionCourseService extends RequestService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll(idInspection: string): Observable<Course[]> {
        return this.get('inspection/' + idInspection + '/listcourse');
    }

    save(course: Course) {
        return this.post('inspection/listcourse', course);
    }

    delete(id: string) {
        return this.delete('inspection/course/' + id);
    }
}
