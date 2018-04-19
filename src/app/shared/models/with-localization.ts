import { BaseModel } from './base.model';


export class WithLocalization extends BaseModel {
    localizations: any[];

    getLocalization(languageCode: string) {
        let name = '';

        if (this.localizations) {
            this.localizations.forEach(item => {
                if (item.languageCode === languageCode) {
                    name = item.name;
                }
            });
        }

        return name;
    }
}