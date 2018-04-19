export class LanePublicCode {
    id: string;
    abbreviation: string;
    code: string;
    description: string;
    isActive: boolean;

    static fromJSON(data: object): LanePublicCode {
        const code = new LanePublicCode();

        return Object.assign(code, data);
    }
}
