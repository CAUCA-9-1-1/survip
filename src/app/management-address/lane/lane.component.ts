import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import DataSource from 'devextreme/data/data_source';
import Guid from 'devextreme/core/guid';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {CityService} from '../shared/services/city.service';
import {LaneGenericCodeService} from '../shared/services/lane-generic-code.service';
import {LanePublicCodeService} from '../shared/services/lane-public-code.service';
import {ODataService} from '../../shared/services/o-data.service';


@Component({
    selector: 'app-managementaddress-lane',
    templateUrl: './lane.component.html',
    styleUrls: ['./lane.component.scss'],
    providers: [
        LaneService,
        CityService,
        LaneGenericCodeService,
        LanePublicCodeService,
    ]
})
export class LaneComponent extends GridWithCrudService implements OnInit {
    public addingButton: any;
    public dataSource: any;
    public cities: any = {};
    public publicCodes: any = {};
    public genericCodes: any = {};

    private selectedCity = '';
    private labels: any = {};

    public constructor(
        laneService: LaneService,
        private cityService: CityService,
        private publicCode: LanePublicCodeService,
        private genericCode: LaneGenericCodeService,
        private translateService: TranslateService,
    ) {
        super(laneService);

        this.dataSource = new DataSource({
            expand: 'localizations',
            store: new ODataService({
                url: 'Lane',
                key: 'id',
                keyType: 'string',
            }),
        });

        this.translateService.get([
            'selectCity'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    public setModel(data: any) {
        return Lane.fromJSON(data);
    }

    public ngOnInit() {
        this.loadCity();
        this.loadPublicCode();
        this.loadGenericCode();
    }

    public getLaneName(data) {
        const lane = Lane.fromJSON(data);

        return lane.getLocalization(config.locale);
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
            };

            e.component.option('editing', options);
        }
    }

    public onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        toolbarItems.unshift({
            widget: 'dxButton',
            location: 'after',
            options: {
                icon: 'plus',
                width: 50,
                disabled: true,
                onInitialized: (ev) => {
                    this.addingButton = ev.component;
                },
                onClick: (ev) => {
                    e.component.addRow();
                },
            }
        });
        toolbarItems.unshift({
            widget: 'dxLookup',
            options: {
                displayExpr: 'name',
                valueExpr: 'id',
                width: 300,
                placeholder: this.labels['selectCity'],
                onOpened: (ev) => {
                    ev.component.option('dataSource', this.cities);
                },
                onValueChanged: (ev) => {
                    this.selectedCity = ev.value;
                    this.addingButton.option('disabled', false);
                    this.dataSource.filter(['idCity', '=', new Guid(ev.value)]);
                    this.dataSource.load();
                }
            }
        });
    }

    public onInitNewRow(e) {
        e.data.idCity = this.selectedCity;
        e.data.isActive = true;
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.cities = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadPublicCode() {
        this.publicCode.getAll().subscribe(data => {
            this.publicCodes = {
                store: data,
                select: ['id', 'description'],
                sort: ['description'],
            };
        });
    }

    private loadGenericCode() {
        this.genericCode.getAll().subscribe(data => {
            this.genericCodes = {
                store: data,
                select: ['id', 'description'],
                sort: ['description'],
            };
        });
    }
}
