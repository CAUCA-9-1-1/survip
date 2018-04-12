export class WithLocalization {
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