export class WebuserForWeb {
    id: string;
    name: string;

    static fromJSON(data: object): WebuserForWeb {
        const webuser = new WebuserForWeb();

        return Object.assign(webuser, data);
    }
}
