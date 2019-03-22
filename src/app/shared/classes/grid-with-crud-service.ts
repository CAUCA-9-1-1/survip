import validationEngine from 'devextreme/ui/validation_engine';
import { TranslateService } from '@ngx-translate/core';

export abstract class GridWithCrudService {
    gridPopup: any;
    readOnly: boolean;
    private labelLocalized = {};

    public dataSource = [];
    public validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    protected form: any;
    protected loadSpecificOpts: any;

    constructor(
        protected translateService?: TranslateService,
        protected sourceService?: any,
    ) {
        if (this.translateService) {
            this.translateService.get([
                'close', 'cannotModifyExternalData'
            ]).subscribe(labels => {
                this.labelLocalized = labels;
            });
        }
    }

    public onInitialized(e) {
        const options = e.component.option('editing');

        if (options.popup) {
            options.form.validationGroup = this.validationGroup;
            options.form.onInitialized = (ev) => {
                this.form = ev.component;
            };
            options.popup.onHiding = (ev) => {
                this.loadSource(this.loadSpecificOpts);
            };
            options.popup.onTitleRendered = (ev) => {
                this.gridPopup = ev.component;
            }
            options.popup.onShowing = (ev) => {
                console.log('showing popup');
                if (this.readOnly) {
                    let toolbar = this.gridPopup.option('toolbarItems');
                    toolbar.push({
                        toolbar: 'bottom',
                        location: 'before',
                        html: '<i style="color:black;display:inline-block" class="material-icons">lock</i> <div style="color:red;display:inline-block">' + this.labelLocalized['cannotModifyExternalData'] + '</div>',
                    });
                    this.gridPopup.option('toolbarItems', toolbar);
                    toolbar = ev.component.option('toolbarItems')
                    toolbar[0].options.visible = false;
                    toolbar[1].options.text = this.labelLocalized['close'];
                    this.gridPopup.option('toolbarItems', toolbar);
                }
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

    public onCellPrepared(e) {
        if (e.column.command === 'edit') {
            if (e.data && e.data.idExtern) {
                if (e.data.idExtern.toString()) {
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link-delete');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-icon-trash');
                }
            }
        }
    }

    public onEditorPreparing(e) {
        this.readOnly = false;
        if (e.row && e.row.data) {
            if (e.row.data.idExtern) {
                e.editorOptions.readOnly = true;
                this.readOnly = e.editorOptions.readOnly;
            }
        }
    }
}
