import {BaseModel} from '../../../shared/models/base.model';


export class BuildingAnomalyPicture extends BaseModel {
    idParent: string;
    idPicture: string;
    dataUri: string;
    sketchJson: string;

    static fromJSON(data: object): BuildingAnomalyPicture {
        const info = new BuildingAnomalyPicture();

        return Object.assign(info, data);
    }
}
