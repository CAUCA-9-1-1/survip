import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DxTabPanelComponent} from 'devextreme-angular';

import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.scss']
})
export class MultilangComponent implements OnInit {
    @ViewChild(DxTabPanelComponent) tabs: DxTabPanelComponent;
    @Output() valueChanged = new EventEmitter();
    @Input() value: any;
    @Input() fieldName = 'name';
    @Input() dataField: any;
    @Input() isRequired: boolean;

    labels: string[] = [];
    languages: string[] = [];
    selectedTab: string;

    constructor(private translate: TranslateService) {
        this.languages = environment.locale.available;

        this.translate.get(this.languages).subscribe(labels => {
            for (const i in labels) {
                if (labels[i]) {
                    this.labels.push(labels[i]);
                }
            }
        });
    }

    ngOnInit() {
        this.selectedTab = this.languages[0];
        this.initializeLanguagesCollection();
    }

    private initializeLanguagesCollection() {
        if (!this.value) {
            this.value = [];
        }

        this.languages.forEach(language => {
            if (!this.getLanguageIndex(language.toLowerCase())) {
                const languageItem = {
                    languageCode: language.toLowerCase(),
                    isActive: true,
                };
                languageItem[this.fieldName] = '';
                this.value.push(languageItem);
            }
        });
    }

    private getLanguageIndex(languageCode: string) {
        let retValue = false;

        if (this.value) {
            for (const SavedLanguage of this.value) {
                if (SavedLanguage.languageCode === languageCode) {
                    retValue = true;
                    break;
                }
            }
        }

        return retValue;
    }

    getLanguageValue() {
        let languageValue = '';

        if (this.value) {
            this.value.forEach(item => {
                if (item.languageCode === this.selectedTab) {
                    languageValue = item[this.fieldName];
                }
            });
        }

        return languageValue;
    }

    setLanguageValue(value: string) {
        let find = false;
        let isValid = true;

        if (this.value) {
            this.value.forEach((item, index) => {
                if (item.languageCode === this.selectedTab) {
                    this.value[index][this.fieldName] = value;
                    find = true;

                    if (this.isRequired && !value) {
                        isValid = false;
                    }
                }
            });
        }

        return isValid;
    }

    onTabValueChanged(e) {
        const oldValue = Object.assign({}, this.value);
        const isValid = this.setLanguageValue(e.element.querySelector('input').value);

        e.component.option('isValid', isValid);

        this.valueChanged.emit({
            value: isValid ? this.value : '',
            oldValue: oldValue
        });

        this.displayStatusOnTabPanel(this.tabs.instance.element(), isValid);
    }

    onTabChanged(e) {
        this.selectedTab = this.languages[e.component.option('selectedIndex')];
    }

    private displayStatusOnTabPanel(tabs, isValid) {
        let allValid = true;

        this.value.forEach((item, index) => {
            if (this.isRequired && !item[this.fieldName]) {
                allValid = false;
            }
        });

        tabs.querySelector('.dx-tabpanel-container').style.background = (allValid ? '' : 'rgba(217, 83, 79, 0.2)');
        tabs.querySelector('.dx-tabpanel-tabs .dx-tab-selected').style.color = (isValid ? '' : 'rgba(217, 83, 79, 0.8)');
    }
}
