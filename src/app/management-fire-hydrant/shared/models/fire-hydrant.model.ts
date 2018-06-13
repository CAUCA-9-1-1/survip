export class FireHydrant {
    id: string;
    isActive: boolean;
    idLane: string;
    idCity: string;
    idIntersection: string;
    idFireHydrantType: string;
    geojson: object;
    altitude: number;
    number: string;
    idOperationTypeRate: string;
    rateFrom: string;
    rateTo: string;
    idUnitOfMeasureRate: string;
    idOperationTypePressure: string;
    pressureFrom: string;
    pressureTo: string;
    idUnitOfMeasurePressure: string;
    color: string;
    comments: string;
    physicalPosition: string;

    static fromJSON(data: object): FireHydrant {
        const hydrant = new FireHydrant();

        return Object.assign(hydrant, data);
    }
}
