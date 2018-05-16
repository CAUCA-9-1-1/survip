import { BaseModel } from './base.model';


export class WithLocalization extends BaseModel {
    localizations: any[];

    getLocalization(languageCode: string, fieldName?: string) {
        let name = '';

        if (!fieldName) {
            fieldName = 'name';
        }

        if (this.localizations) {
            this.localizations.forEach(item => {
                if (item.languageCode === languageCode) {
                    name = item[fieldName];
                }
            });
        }

        return name;
    }
}