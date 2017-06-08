import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MdTabGroup} from '@angular/material';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.styl']
})
export class MultilangComponent implements OnInit {
  @ViewChild(MdTabGroup) tabs: MdTabGroup;

  @Input()
  get value(): object { return this._value; }
  set value(val: object) {
    this.tabs.selectedIndex = 0;
    this.languages.forEach((lang) => {
      this._value[lang] = (val && val[lang] ? val[lang] : '--');
    });

    this._value['idLanguageContent'] = (val && val['idLanguageContent'] ? val['idLanguageContent'] : '');
  }
  private _value: object = {
    'idLanguageContent': ''
  };

  public languages: string[] = environment.languages;

  @Output() onValueChanged = new EventEmitter();

  constructor() {
    this.languages.forEach((lang) => {
      this._value[lang] = '';
    });
  }

  ngOnInit() {
  }

  public onTabValueChanged(e) {
    const lang = this.languages[this.tabs.selectedIndex];
    const oldValue = Object.assign({}, this.value);

    this._value[lang] = e.element.find('input').val();
    this.onValueChanged.emit({
      value: this.value,
      oldValue: oldValue
    });
  }

  public onSelectionChanged(e) { }
}
