import {BaseModel} from '../../../shared/models/base.model';
import {Firestation} from '../../../management-department/shared/models/firestation.model';
import {CourseLane} from './course-lane.model';


export class Course extends BaseModel {
    firestation: Firestation;
    idBuilding: string;
    idFirestation: string;
    lanes: CourseLane;

    static fromJSON(data: object): Course {
        const course = new Course();

        return Object.assign(course, data);
    }
}
