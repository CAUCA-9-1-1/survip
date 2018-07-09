import {BaseModel} from '../../../shared/models/base.model';


export class ParticularRiskWall extends BaseModel {

    static fromJSON(data: object): ParticularRiskWall {
        const risk = new ParticularRiskWall();

        return Object.assign(risk, data);
    }
}
