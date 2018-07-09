import {BaseModel} from '../../../shared/models/base.model';


export class ParticularRiskFloor extends BaseModel {

    static fromJSON(data: object): ParticularRiskFloor {
        const risk = new ParticularRiskFloor();

        return Object.assign(risk, data);
    }
}
