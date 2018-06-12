import {BaseModel} from '../../../shared/models/base.model';


export class BuildingContact extends BaseModel {
    idBuilding = '';
    firstName: '';
    lastName = '';
    isOwner = false;
    callPriority = 0;
    cellphoneNumber = '';
    phoneNumber = '';
    phoneNumberExtension = '';
    pagerNumber = '';
    pagerCode = '';
    otherNumber = '';
    otherNumberExtension = '';

    static fromJSON(data: object): BuildingContact {
        const contact = new BuildingContact();

        return Object.assign(contact, data);
    }
}
