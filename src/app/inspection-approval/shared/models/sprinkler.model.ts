import {BaseModel} from '../../../shared/models/base.model';


export class Sprinkler extends BaseModel {
    floor: string;
    wall: string;
    sector: string;
    idBuilding: string;
    idSprinklerType: string;

    static fromJSON(data: object): Sprinkler {
        const item = new Sprinkler();

        return Object.assign(item, data);
    }
}
