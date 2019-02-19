import validationEngine from 'devextreme/ui/validation_engine';
import DataSource from 'devextreme/data/data_source';


export abstract class GridWithOdataService {
    gridPopup: any;
    notLoopPopupName = false;
    readOnly: boolean;

    public dataSource: DataSource;
    public validationGroup = 'custom-validation-group-' + (new Date()).getTime();

    protected form: any;

    constructor(
        protected sourceConfig?: any,
    ) {
        this.dataSource = new DataSource(sourceConfig);
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

    protected abstract setModel(data: any): any;

    public setPopupName(e: any) {
        if (this.gridPopup != null && e.editorOptions.disabled) {
            if (this.notLoopPopupName == false) {
                let title = this.gridPopup.option('title');
                this.gridPopup.option('title', title + ' - Modification impossible, car les données sont externe');
                this.notLoopPopupName = true;
            }
        }
    }
}
