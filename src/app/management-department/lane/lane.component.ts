import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import Guid from 'devextreme/core/guid';
import config from '../../../assets/config/config.json';
import {GridWithOdataService} from '../../shared/classes/grid-with-odata-service';
import {Lane} from '../shared/models/lane.model';
import {LaneService} from '../shared/services/lane.service';
import {CityService} from '../../management-address/shared/services/city.service';
import {LaneGenericCodeService} from '../../management-address/shared/services/lane-generic-code.service';
import {LanePublicCodeService} from '../../management-address/shared/services/lane-public-code.service';
import {ODataService} from '../../shared/services/o-data.service';
import {DxDataGridComponent} from 'devextreme-angular';


@Component({
    selector: 'app-management-department-lane',
    templateUrl: './lane.component.html',
    styleUrls: ['./lane.component.scss'],
    providers: [
        LaneService,
        CityService,
        LaneGenericCodeService,
        LanePublicCodeService,
    ]
})
export class LaneComponent extends GridWithOdataService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    public addingButton: any;
    public publicCodes: any = [];
    public genericCodes: any = [];

    private formFieldCity: any = null;
    private selectedCity = '';
    private labels: any = {};

    public constructor(
        private injector: Injector,
        private cityService: CityService,
        private publicCode: LanePublicCodeService,
        private genericCode: LaneGenericCodeService,
        protected translateService: TranslateService,
    ) {
        super(translateService, {
            expand: 'localizations',
            store: new ODataService(injector, {
                url: 'Lane',
                key: 'id',
                keyType: 'Guid',
                onRefreshLogin: () => {
                    this.dataGrid.instance.refresh();
                }
            }),
        });

        this.translateService.get([
            'selectCity', 'add'
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

    public onToolbarPreparing(e) {
        const toolbarItems = e.toolbarOptions.items;

        if (!this.cityService.readOnlyImported) {
            toolbarItems.unshift({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'plus',
                    width: 50,
                    disabled: false,
                    hint: this.labels['add'],
                    onInitialized: (ev) => {
                        this.addingButton = ev.component;
                    },
                    onClick: (ev) => {
                        e.component.addRow();
                    },
                }
            });
        }

        toolbarItems.unshift({
            widget: 'dxLookup',
            options: {
                displayExpr: 'name',
                valueExpr: 'id',
                width: 300,
                placeholder: this.labels['selectCity'],
                title: this.labels['selectCity'],
                closeOnOutsideClick: true,
                onInitialized: (ev) => {
                    this.formFieldCity = ev.component;
                },
                onValueChanged: (ev) => {
                    this.selectedCity = ev.value;
                    this.dataSource.filter(['idCity', '=', new Guid(ev.value)]);
                    this.dataSource.load();
                }
            }
        });
    }

    public onInitNewRow(e) {
        e.data = Object.assign({}, new Lane());
        e.data.id = new Guid();
        e.data.idCity = this.selectedCity;
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.formFieldCity.option('value', (data[0] ? data[0].id : ''));
            this.formFieldCity.option('dataSource', {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            });
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

    public onEditorPreparing(e) {
        this.readOnly = false;
        if (e.row && e.row.data) {
            if (e.row.data.idExtern) {
                e.editorOptions.readOnly = true;
                this.readOnly = e.editorOptions.readOnly;
            }
        }
    }
}
