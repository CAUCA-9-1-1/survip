export class BuildingNotInspected {
    public id: string;
    public civicNumber: string;
    public laneName: string;
    public cityName: string;
    public matricule: string;
    public riskLevel: string;

    public constructor() { }

    static fromJSON(data: object): BuildingNotInspected {
        return Object.assign(new BuildingNotInspected(), data);
    }
}
