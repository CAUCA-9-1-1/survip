import {Component, OnInit} from '@angular/core';
import config from '../../../assets/config/config.json';
import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-hazardous-material',
    templateUrl: './hazardous-material.component.html',
    styleUrls: ['./hazardous-material.component.scss'],
    providers: [
        HazardousMaterialService,
    ]
})
export class HazardousMaterialComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.hazardousMaterialService.readOnlyImported;

    constructor(
        private hazardousMaterialService: HazardousMaterialService,
        protected translateService: TranslateService
    ) {
        super(translateService, hazardousMaterialService);
    }

    setModel(data: any) {
        return HazardousMaterial.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getMaterialName(data) {
        const material = HazardousMaterial.fromJSON(data);

        return material.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data = Object.assign(new HazardousMaterial(), {});
    }
}
