import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DxDataGridComponent, DxTabPanelComponent} from 'devextreme-angular';

import packageInfo from '../../../../assets/config/package.json';


@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.scss']
})

export class MultilangComponent implements OnInit {
    @ViewChild(DxTabPanelComponent, {static: false}) tabs: DxTabPanelComponent;
    @Output() valueChanged = new EventEmitter();
    @Input() validationGroup: string;
    @Input() fieldName = 'name';
    @Input() dataField: any;
    @Input() value: any = [];
    @Input() readOnly: boolean;

    public get languageValue() {
        let text = '';

        this.value.forEach((item, index) => {
            if (item.languageCode === this.selectedTab) {
                text = this.value[index][this.fieldName];
            }
        });

        return text;
    }

    public labels: string[] = [];
    public selectedTab: string;
    public isRequired: boolean;

    public constructor(private translate: TranslateService) {
        this.translate.get(packageInfo.locale).subscribe(labels => {
            for (const i in labels) {
                if (labels[i]) {
                    this.labels.push(labels[i]);
                }
            }
        });
    }

    public ngOnInit() {
        this.selectedTab = packageInfo.locale[0];

        this.initializeValidations();
        this.initializeValueForAllLanguages();
    }

    public onTabValueChanged(e) {
        const oldValue = JSON.parse(JSON.stringify(this.value));
        const newValue = JSON.parse(JSON.stringify(this.value));

        if (newValue) {
            newValue.forEach((item, index) => {
                if (item.languageCode === this.selectedTab) {
                    newValue[index][this.fieldName] = e.element.querySelector('input').value;
                }
            });
        }

        this.valueChanged.emit({
            value: newValue,
            oldValue: oldValue
        });
    }

    public onTabChanged(e) {
        this.selectedTab = packageInfo.locale[e.component.option('selectedIndex')];
    }

    public onValidation(e) {
        const allValid = this.validateAllLanguages();

        if (e.isValid) {
            e.isValid = allValid;
        }
    }

    private initializeValidations() {
        if (this.dataField) {
            if (this.dataField.item) {
                this.isRequired = this.dataField.item.isRequired;
            }
        }
    }

    private initializeValueForAllLanguages() {
        if (!this.value) {
            this.value = [];
        }

        if (this.value.length !== packageInfo.locale.length) {
            packageInfo.locale.forEach(language => {
                if (!this.hasLanguageIndex(language.toLowerCase())) {
                    const languageItem = {
                        languageCode: language.toLowerCase(),
                        isActive: true,
                    };
                    languageItem[this.fieldName] = '';
                    this.value.push(languageItem);
                }
            });
        }
    }

    private hasLanguageIndex(languageCode: string) {
        let retValue = false;

        if (this.value) {
            for (const languageItem of this.value) {
                if (languageItem.languageCode === languageCode) {
                    retValue = true;
                    break;
                }
            }
        }

        return retValue;
    }

    private validateAllLanguages() {
        let allValid = true;

        this.value.forEach((item, index) => {
            if (this.isRequired && !item[this.fieldName]) {
                allValid = false;
            }
        });

        if (this.tabs) {
            const panel = this.tabs.instance.element();
            const tabs = <HTMLElement>panel.querySelector('.dx-tabpanel-tabs .dx-tabs');

            if (tabs) {
                tabs.style.background = (allValid ? '#f7f7f7' : 'rgba(217, 83, 79, 0.2)');
            }
        }

        return allValid;
    }
}
