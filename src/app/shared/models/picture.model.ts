import {BaseModel} from './base.model';


export class Picture extends BaseModel {
    name: string;
    dataUri: string;
    sketchJson: string;
}
