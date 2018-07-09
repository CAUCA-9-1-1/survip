import {InspectionCourseLane} from './inspection-course-lane.model';


export class InspectionCourse {
    course: object;
    lanes: InspectionCourseLane[];

    static fromJSON(data: object): InspectionCourse {
        const course = new InspectionCourse();

        return Object.assign(course, data);
    }
}
