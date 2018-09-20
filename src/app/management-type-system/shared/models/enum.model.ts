
export class EnumModel {
    value: string;
    name: string;
    text: string;

    static fromJSON(data: object): EnumModel {
        return Object.assign(new EnumModel(), data);
    }
}
