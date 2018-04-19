export class LaneGenericCode {
    id: string;
    code: string;
    description: string;
    addWhiteSpaceAfter: boolean;
    isActive: boolean;

    static fromJSON(data: object): LaneGenericCode {
        const code = new LaneGenericCode();

        return Object.assign(code, data);
    }
}
