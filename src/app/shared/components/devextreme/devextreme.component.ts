import {Component, OnInit} from '@angular/core';
import {WindowRefService} from '../../services/window-ref.service';

@Component({
  selector: 'app-devextreme',
  templateUrl: './devextreme.component.html',
  styleUrls: ['./devextreme.component.styl']
})
export class DevextremeComponent implements OnInit {

  constructor(private windowRef: WindowRefService) {
    console.log('devextreme');
  }

  ngOnInit() {
    this.createMultilang();
  }

  private createMultilang() {
    const languages = ['fr', 'en'];
    const DevExpress = this.windowRef.nativeObject('DevExpress');

    DevExpress.registerComponent('dxMultiLang', ((_super) => {
      this.extends(customControl, _super);

      let totalColumn = 0;
      let config = {};
      let selectedLanguage = null;

      const container = $('<div>');
      const _tabChanged = function (e) {
        selectedLanguage = e.addedItems[0].language;

        if (config['value']) {
          if (typeof(config['value']) !== 'object') {
            let tmpValue = config['value'];
            config['value'] = { id_language_content: null };

            for (let i=0, j=languages.length; i<j; i++) {
              config['value'][languages[i]] = tmpValue;
            }
          }
        } else {
          config['value'] = { id_language_content: null };

          for (let i=0, j=languages.length; i<j; i++) {
            config['value'][languages[i]] = '';
          }
        }

        container.find('input').val(config['value'][selectedLanguage]);
      };

      const _createField = function () {
        $('<div class="dx-multilang-container">').html('<input type="text" />').focusin(function (e) {
          $(e.target).parents('.dx-multilang').addClass('focus');
        }).focusout(function (e) {
          $(e.target).parents('.dx-multilang').removeClass('focus');
        }).change(function (e) {
          config['value'][selectedLanguage] = e.target['value'];

          if (typeof(config['onValueChanged']) === 'function') {
            config['onValueChanged']({
              value: config['value'],
              jQueryEvent: e
            });
          }
        }).appendTo(container);
      };

      const _createList = function () {
        config['value'] = (config['value'] ? config['value'] : {});
        selectedLanguage = languages[0];

        let tabs = [];
        for (let i=0, j=languages.length; i<j; i++) {
          tabs.push({
            language: languages[i],
            text: languages[i]
          });
        }

        $('<div>').dxNavBar({
          items: tabs,
          onSelectionChanged: _tabChanged
        }).appendTo(container);
      };

      function customControl(element, options) {
        _super.call(this, element, {});
        config = this.extend({
          value: null,
          onValueChanged: null
        }, options);

        container.addClass('dx-multilang').addClass('dx-texteditor').html('').appendTo($(element));

        _createList();
        _createField();
      }

      return customControl;
    })(DevExpress.DOMComponent));
  }

  private extend() {
    const j = arguments.length;

    for (let i = 1; i < j; i++) {
      for (const key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
    }

    return arguments[0];
  }

  private extends(d, b) {
    for (const p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }

    function __() {
      this.constructor = d;
    }

    __.prototype = b.prototype;
    d.prototype = new __();
  }
}
