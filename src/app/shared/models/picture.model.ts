import {BaseModel} from './base.model';


export class Picture extends BaseModel {
    name: string;
    data: any;
    mimeType: string;
    dataUri: string;
}
