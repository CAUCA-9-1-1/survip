import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-management-address-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [CountryService]
})
export class CountryComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported: boolean;
    private labels: any = {};

    constructor(
        private countryService: CountryService,
        protected translateService: TranslateService
        ) {
        super(translateService, countryService);
        this.readOnlyImported = !countryService.readOnlyImported;
    }

    setModel(data: any) {
        return Country.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCountryName(data) {
        const country = Country.fromJSON(data);

        return country.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.readOnly = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
    }
}
