export class Statistics {
    ownerWasAbsent: number;
    inspectionRefused: number;
    success: number;
    doorHangerHasBeenLeft: number;

    static fromJSON(data: object): Statistics {
        const statistics = new Statistics();

        return Object.assign(statistics, data);
    }
}
