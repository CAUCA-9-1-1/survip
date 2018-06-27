import validationEngine from 'devextreme/ui/validation_engine';


export abstract class GridWithCrudService {
    dataSource = [];
    validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    private loadSpecificOpts: any;

    constructor(
        protected sourceService?: any,
    ) { }

    onInitialized(e) {
        const options = e.component.option('editing');

        if (options.popup) {
            options.form.validationGroup = this.validationGroup;
            options.form.showValidationSummary = true;
            options.popup.onHiding = (ev) => {
                this.loadSource(this.loadSpecificOpts);
            };

            e.component.option('editing', options);
        }
    }

    onRowValidating(e) {
        const validation = validationEngine.validateGroup(this.validationGroup);

        if (e.isValid) {
            e.isValid = validation.isValid;
        }
    }

    onRowInserted(e) {
        this.sourceService.save(
            this.setModel(e.data)
        ).subscribe(info => {
            this.loadSource(this.loadSpecificOpts);
        }, error => {
            this.loadSource(this.loadSpecificOpts);
        });
    }

    onRowUpdated(e) {
        this.sourceService.save(
            this.setModel(e.key)
        ).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    onRowRemoved(e) {
        this.sourceService.remove(e.key.id).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    protected abstract setModel(data: any): any;

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
