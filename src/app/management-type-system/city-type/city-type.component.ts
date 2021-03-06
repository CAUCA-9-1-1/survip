import {Component, OnInit} from '@angular/core';
import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityType} from '../shared/models/citytype.model';
import {CityTypeService} from '../shared/services/citytype.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-city-type',
    templateUrl: './city-type.component.html',
    styleUrls: ['./city-type.component.scss'],
    providers: [CityTypeService]
})
export class CityTypeComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.cityTypeService.readOnlyImported;

    constructor(
        private cityTypeService: CityTypeService,
        protected translateService: TranslateService
        ) {
        super(translateService, cityTypeService);
    }

    setModel(data: any) {
        return CityType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCityTypeName(data) {
        const cityType = CityType.fromJSON(data);

        return cityType.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onEditingStart(e) {
        this.readOnly = false;
        if (e.data) {
            if (e.data.idExtern) {
                this.readOnly = true;
            }
        }
    }
}
