import validationEngine from 'devextreme/ui/validation_engine';


export abstract class GridWithCrudService {
    gridPopup: any;
    notLoopPopupName = false;
    readOnly: boolean;

    public dataSource = [];
    public validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    protected form: any;
    protected loadSpecificOpts: any;

    constructor(
        protected sourceService?: any,
    ) { }

    public onInitialized(e) {
        const options = e.component.option('editing');

        if (options.popup) {
            options.form.validationGroup = this.validationGroup;
            options.form.onInitialized = (ev) => {
                this.form = ev.component;
            };
            options.popup.onHiding = (ev) => {
                this.loadSource(this.loadSpecificOpts);
                this.notLoopPopupName = false;
            };
            options.popup.onTitleRendered = (ev) => {
                this.gridPopup = ev.component;
            }
            e.component.option('editing', options);
        }
    }

    public onRowValidating(e) {
        const validation = validationEngine.validateGroup(this.validationGroup);
        const panel = this.form.element().querySelector('.dx-tabpanel');
        const tabs = panel.querySelectorAll('.dx-tabpanel-tabs .dx-tab');

        tabs.forEach(tab => {
            tab.removeAttribute('style');
        });

        if (!validation.isValid) {
            e.isValid = validation.isValid;
            e.brokenRules.push(validation.brokenRules[0]);
        }

        if (!e.isValid) {
            e.brokenRules.forEach(item => {
                const tabContent = item.validator.element().closest('.dx-multiview-item');
                const index = Array.from(tabContent.parentNode.children).indexOf(tabContent);

                if (tabs) {
                    tabs[index].style.background = 'rgba(217, 83, 79, 0.2)';
                }
            });
        }
    }

    public onRowInserted(e) {
        this.sourceService.save(
            this.setModel(e.data)
        ).subscribe(info => {
            this.loadSource(this.loadSpecificOpts);
        }, error => {
            this.loadSource(this.loadSpecificOpts);
        });
    }

    public onRowUpdated(e) {
        this.sourceService.save(
            this.setModel(e.key)
        ).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    public onRowRemoved(e) {
        this.sourceService.remove(e.key.id).subscribe(() => this.loadSource(this.loadSpecificOpts));
    }

    protected abstract setModel(data: any): any;

    protected loadSource(opts?: any) {
        this.loadSpecificOpts = opts;

        if (typeof(opts) === 'function') {
            this.loadWithCallback(opts);
        } else if (typeof(opts) === 'string' || typeof(opts) === 'object') {
            this.loadSpecificItem(opts);
        } else {
            this.sourceService.getAll().subscribe(data => this.dataSource = data || []);
        }
    }

    private loadSpecificItem(id: object|string) {
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

    protected loadOneWithCallBack(id: string, callback: () => void) {
        this.sourceService.getOne(id).subscribe(data => {
        this.dataSource = [data];
        if (callback) {
            callback();
        }
        });
    }

    public setPopupName(e: any, translation: string) {
        if (this.gridPopup != null && e.editorOptions.disabled) {
            if (this.notLoopPopupName == false) {
                let title = this.gridPopup.option('title');
                this.gridPopup.option('title', title + translation);
                this.notLoopPopupName = true;
            }
        }
    }

    public onCellPrepared(e) {
        if(e.column.command == "edit" && e.column.type == "buttons") {
            if(e.data != null && e.data.idExtern != null) {
                if(e.data.idExtern.toString() != null) {
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link-delete');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-icon-trash');
                }
            }
        }
    }
}
