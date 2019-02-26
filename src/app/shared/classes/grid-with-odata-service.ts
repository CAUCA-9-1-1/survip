import validationEngine from 'devextreme/ui/validation_engine';
import DataSource from 'devextreme/data/data_source';
import { Button } from 'protractor';
import { DxButtonModule } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';


export abstract class GridWithOdataService {
    gridPopup: any;
    notLoopPopupName = false;
    readOnly: boolean;
    closedTranslation: string;

    public dataSource: DataSource;
    public validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    protected form: any;

    constructor(
        protected translateService?: TranslateService,
        protected sourceConfig?: any,
    ) {
        this.dataSource = new DataSource(sourceConfig);
        if(this.translateService) {
            this.translateService.get(['close']).subscribe(c => this.closedTranslation = c['close']);
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
                this.dataSource.load();
                this.notLoopPopupName = false;
            };
            options.popup.onOptionChanged = (ev) => {
                this.gridPopup = ev.component;
            }
            options.popup.onShowing = (ev) => {
                if(this.readOnly) {
                    const toolbar = ev.component.option('toolbarItems')
                    toolbar[0].options.visible = false;
                    toolbar[1].options.text = this.closedTranslation;
                    ev.component.option('toolbarItems', toolbar);    
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

    protected abstract setModel(data: any): any;

    public setPopupName(e: any, translation: string) {
        if (this.notLoopPopupName == false) {
            if (this.gridPopup && e.editorOptions.disabled) {
                let title = this.gridPopup.option('title');
                this.gridPopup.option('title', title + translation);
                this.notLoopPopupName = true;
            }
        }
    }

    public onCellPrepared(e) {
        if(e.column.command == "edit") {
            if(e.data && e.data.idExtern) {
                if(e.data.idExtern.toString()) {
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link-delete');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-link');
                    e.cellElement.children[e.cellElement.children.length - 1].classList.remove('dx-icon-trash');
                }
            }
        }
    }
}
