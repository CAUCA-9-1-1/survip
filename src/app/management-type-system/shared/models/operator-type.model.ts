
export class OperatorType {
    id: string;
    symbol: string;
    isActive: boolean;

    static fromJSON(data: object): OperatorType {
        const type = new OperatorType();

        return Object.assign(type, data);
    }
}
