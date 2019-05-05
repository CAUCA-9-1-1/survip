import { BaseModel } from '../../../shared/models/base.model';

export class Objective extends BaseModel {
    year: number;
    objective: number;
    idFireSafetyDepartment: string;
    isHighRisk: boolean;

    static fromJSON(data: object): Objective {
        const objective = new Objective();

        return Object.assign(objective, data);
    }
}
