import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.scss']
})
export class MultilangComponent implements OnInit {
    @Output() valueChanged = new EventEmitter();
    @Input() value: any;
    @Input() dataField: any;
    @Input() isRequired: boolean;

    labels: string[] = [];
    languages: string[] = [];
    selectedTab: string;

    constructor(private translate: TranslateService) {
        this.languages = ['fr', 'en'];

        // If we use the PIPE "translate" inside the "title" of "dxi-item" the view bug
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

        if (this.dataField) {
            this.value = this.dataField.row.data.localizations;
        }
    }

    getLanguageValue() {
        let languageValue = '';

        if (this.value) {
            this.value.forEach(item => {
                if (item.languageCode === this.selectedTab) {
                    languageValue = item.name;
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
                    this.value[index].name = value;
                    find = true;

                    if (!value) {
                        isValid = false;
                    }
                }
            });
        }

        if (!find) {
            if (!this.value) {
                this.value = [];
            }

            this.value.push({
                name: value,
                languageCode: this.selectedTab,
                isActive: true,
            });

            if (!value) {
                isValid = false;
            }
        }

        return isValid;
    }

    onTabValueChanged(e) {
        const oldValue = Object.assign({}, this.value);
        const isValid = this.setLanguageValue(e.element.querySelector('input').value);

        this.valueChanged.emit({
            value: isValid ? this.value : '',
            oldValue: oldValue
        });
    }

    onTabChanged(e) {
        this.selectedTab = this.languages[e.component.option('selectedIndex')];
    }
}
