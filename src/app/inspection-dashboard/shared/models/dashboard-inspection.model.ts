
export class DashboardInspection {
    id: string;
    idBatch: string;
    batchDescription: string;
    idBuilding: string;
    idWebuserAssignedTo: string;
    idRiskLevel: string;
    address: string;
    idLaneTransversal: string;
    idCity: string;
    postalCode: string;
    visitStatus: string;
    visitNote: boolean;
    anomaly: boolean;
    lastInspection: Date;
    reportInspection: Date;
    inspectionType: string;
    contact: string;
    owner: string;
    idUtilisationCode: string;
    idPicture: string;
    buildingValue: number;
    matricule: string;
    numberOfAppartment: number;
    numberOfBuilding: number;
    numberOfFloor: number;
    utilisationDescription: string;
    vacantLand: boolean;
    yearOfConstruction: number;
    details: string;

    static fromJSON(data: object): DashboardInspection {
        const inspection = new DashboardInspection();

        return Object.assign(inspection, data);
    }
}
