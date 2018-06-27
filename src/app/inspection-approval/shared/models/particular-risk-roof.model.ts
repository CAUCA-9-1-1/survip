import {BaseModel} from '../../../shared/models/base.model';


export class ParticularRiskRoof extends BaseModel {

    static fromJSON(data: object): ParticularRiskRoof {
        const risk = new ParticularRiskRoof();

        return Object.assign(risk, data);
    }
}
