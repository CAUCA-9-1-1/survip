import {BaseModel} from '../../../shared/models/base.model';
import {Lane} from '../../../management-address/shared/models/lane.model';


export class CourseLane extends BaseModel {
    direction: number;
    idBuildingCourse: string;
    idLane: string;
    lane: Lane;
    sequence: number;

    static fromJSON(data: object): CourseLane {
        const lane = new CourseLane();

        return Object.assign(lane, data);
    }
}
