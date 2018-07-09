import {BaseModel} from '../../../shared/models/base.model';


export class ParticularRiskFoundation extends BaseModel {

    static fromJSON(data: object): ParticularRiskFoundation {
        const risk = new ParticularRiskFoundation();

        return Object.assign(risk, data);
    }
}
