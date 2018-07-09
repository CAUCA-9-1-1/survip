
export class InspectionCourses {
    id: string;
    description: string;

    static fromJSON(data: object): InspectionCourses {
        const course = new InspectionCourses();

        return Object.assign(course, data);
    }
}
