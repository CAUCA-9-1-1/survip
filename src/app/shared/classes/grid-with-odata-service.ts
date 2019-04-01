import validationEngine from 'devextreme/ui/validation_engine';
import DataSource from 'devextreme/data/data_source';
import { TranslateService } from '@ngx-translate/core';


export abstract class GridWithOdataService {
    gridPopup: any;
    readOnly: boolean;
    private labelLocalized = {};

    public dataSource: DataSource;
    public validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    protected form: any;

    protected constructor(
        protected translateService?: TranslateService,
        protected sourceConfig?: any,
    ) {
        this.dataSource = new DataSource(sourceConfig);
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
            options.popup.onHiding = () => {
                this.dataSource.load();
            };
            options.popup.onOptionChanged = (ev) => {
                this.gridPopup = ev.component;
            }
            options.popup.onShowing = (ev) => {
                if (this.readOnly) {
                    const toolbar = this.gridPopup.option('toolbarItems');
                    toolbar.push({
                        toolbar: 'bottom',
                        location: 'before',
                        html: '<i style="color:black;display:inline-block" class="material-icons">lock</i> <div style="color:red;display:inline-block">' + this.labelLocalized['cannotModifyExternalData'] + '</div>',
                    });
                    this.gridPopup.option('toolbarItems', toolbar);
                    toolbar[0].options.visible = false;
                    toolbar[1].options.text = this.labelLocalized['close'];
                    this.gridPopup.option('toolbarItems', toolbar);
                }
            };
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

    protected abstract setModel(data: any): any;

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
}
