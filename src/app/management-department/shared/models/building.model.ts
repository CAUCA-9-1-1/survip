import {Picture} from '../../../shared/models/picture.model';


export class BuildingResume {
  idBuilding: string;
  isMainBuilding: boolean;
  aliasName: string;
  corporateName: string;
  idLaneTransversal: string;
}

export class Building {
    id: string;
    appartmentNumber = '';
    buildingValue = 0.0;
    childType: 0;
    civicLetter = '';
    civicLetterSupp = '';
    civicNumber = '';
    civicSupp = '';
    coordinates = null;
    coordinatesSource = '';
    details = '';
    floor = '';
    idLane: string;
    aliasName: '';
    corporateName: '';
    idLaneTransversal: string = null;
    idParentBuilding: string = null;
    idPicture: string = null;
    idRiskLevel: string;
    idUtilisationCode: string = null;
    matricule = '';
    numberOfAppartment = 0;
    numberOfBuilding = 0;
    numberOfFloor = 0;
    picture: Picture;
    postalCode = '';
    showInResources = false;
    source = '';
    suite = 0;
    utilisationDescription = '';
    vacantLand = false;
    yearOfConstruction = 2000;

    static fromJSON(data: object): Building {
        const building = new Building();

        return Object.assign(building, data);
    }
}

