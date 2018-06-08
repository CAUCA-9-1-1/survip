import {environment} from '../../../environments/environment';


export class GridWithCrudService {
    dataSource = [];
    popup: any;

    private loadSpecificOpts: any;

    constructor(
        protected sourceService?: any,
    ) { }

    onInitialized(e) {
        const options = e.component.option('editing');

        if (options.popup) {
            options.popup.onHiding = (ev) => {
                this.loadSource(this.loadSpecificOpts);
            };

            e.component.option('editing', options);
        }
    }

    onRowValidating(e) {
        const localizations = e.newData.localizations || e.key.localizations;

        if (!localizations) {
            e.isValid = false;
        } else {
            environment.locale.available.forEach(language => {
                let isValid = false;

                localizations.forEach(localization => {
                    if (localization.languageCode === language && localization.name) {
                        isValid = true;
                    }
                });

                if (!isValid) {
                    e.isValid = false;
                }
            });
        }
    }

    onRowInserted(e) {
        this.sourceService.save(e.data).subscribe(info => {
            this.loadSource(this.loadSpecificOpts);
        }, error => {
            this.loadSource(this.loadSpecificOpts);
        });
    }

    onRowUpdated(e) {
        this.sourceService.save(e.key).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    onRowRemoved(e) {
        this.sourceService.remove(e.key.id).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    protected loadSource(opts?: any) {
        this.loadSpecificOpts = opts;

        if (typeof(opts) === 'function') {
            this.loadWithCallback(opts);
        } else if (typeof(opts) === 'string') {
            this.loadSpecificItem(opts);
        } else {
            this.sourceService.getAll().subscribe(data => this.dataSource = data);
        }
    }

    private loadSpecificItem(id: string) {
        this.sourceService.getAll(id).subscribe(data => this.dataSource = data);
    }

    private loadWithCallback(callback: () => void) {
        this.sourceService.getAll().subscribe(data => {
            this.dataSource = data;

            if (callback) {
                callback();
            }
        });
    }
}
