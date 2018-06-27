
export class InspectionCourseLane {
    id: string;
    description: string;
    sequence: number;

    static fromJSON(data: object): InspectionCourseLane {
        const course = new InspectionCourseLane();

        return Object.assign(course, data);
    }
}
