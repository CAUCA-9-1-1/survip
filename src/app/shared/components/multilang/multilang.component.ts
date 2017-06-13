import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from 'environments/environment';
import {LanguageService} from 'igo2';

@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.styl']
})
export class MultilangComponent implements OnInit {
  @Input()
  get value(): object { return this._value; }
  set value(val: object) {
    environment.languages.forEach((lang) => {
      this._value[lang] = (val && val[lang] ? val[lang] : '');
    });

    this._value['idLanguageContent'] = (val && val['idLanguageContent'] ? val['idLanguageContent'] : '');
  }
  private _value: object = {
    'idLanguageContent': ''
  };

  public languages: string[] = [];
  public selectedTab: string;
  public selectedTabValue: string;

  @Output() onValueChanged = new EventEmitter();

  constructor(private translate: LanguageService) {
    environment.languages.forEach((lang) => {
      this._value[lang] = '';
    });

    this.translate.translate.get(environment.languages).subscribe((labels) => {
      environment.languages.forEach((lang) => {
        this.languages.push(labels[lang]);
      });
    });
  }

  ngOnInit() {
    this.selectedTab = environment.languages[0];
    this.selectedTabValue = this._value[this.selectedTab];
  }

  public onTabValueChanged(e) {
    const oldValue = Object.assign({}, this.value);

    this._value[this.selectedTab] = e.element.find('input').val();
    this.onValueChanged.emit({
      value: this.value,
      oldValue: oldValue
    });
  }

  public onTabChanged(e) {
    this.selectedTab = environment.languages[e.component.option('selectedIndex')];
    this.selectedTabValue = this._value[this.selectedTab];
  }
}
