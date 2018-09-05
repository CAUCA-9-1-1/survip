import {BaseModel} from '../../../shared/models/base.model';


export class BuildingAnomaly extends BaseModel {
    idBuilding = '';
    notes = '';
    theme = '';
    anomalies: any = [];

    static fromJSON(data: object): BuildingAnomaly {
        const contact = new BuildingAnomaly();

        return Object.assign(contact, data);
    }
}
