import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {TranslateService} from '@ngx-translate/core';
import DataSource from 'devextreme/data/data_source';
import Guid from 'devextreme/core/guid';

import config from '../../../assets/config/config.json';
import {FireHydrantService} from '../../management-type-system/shared/services/fire-hydrant.service';
import {FireHydrantType} from '../../management-type-system/shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../../management-type-system/shared/services/fire-hydrant-type.service';
import {LaneService} from '../shared/services/lane.service';
import {OperatorType} from '../../management-type-system/shared/models/operator-type.model';
import {OperatorTypeService} from '../../management-type-system/shared/services/operator-type.service';
import {UnitOfMeasure} from '../../management-type-system/shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../../management-type-system/shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {FireHydrant} from '../../management-type-system/shared/models/fire-hydrant.model';
import {ODataService} from '../../shared/services/o-data.service';


@Component({
    selector: 'app-management-department-firehydrant',
    templateUrl: './firehydrant.component.html',
    styleUrls: ['./firehydrant.component.scss'],
    providers: [
        FireHydrantService,
        FireHydrantTypeService,
        OperatorTypeService,
        UnitOfMeasureService,
        CityService,
        LaneService,
    ]
})
export class FirehydrantComponent extends GridWithCrudService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @Input()
    set isShow(value: boolean) {
        if (value) {
            this.loadFireHydrantType();
            this.loadOperatorType();
            this.loadUnitOfMeasure();
        }
    }

    public addingButton: any;
    public dataSource: any;
    public selectedCity = '';
    public fireHydrantTypes: FireHydrantType[] = [];
    public cities: any = {};
    public lanes: any = {};
    public lanesOfCity: any = {};
    public operatorTypes: OperatorType[] = [];
    public rateUnits: UnitOfMeasure[] = [];
    public pressureUnits: UnitOfMeasure[] = [];
    public formFields = {
        idLane: null,
        idIntersection: null,
    };
    public colors = [{
        id: '#000000',
        color: '#000000',
    }, {
        id: '#FFFFFF',
        color: '#FFFFFF',
    }, {
        id: '#6495ED',
        color: '#6495ED',
    }, {
        id: '#9ACD32',
        color: '#9ACD32',
    }, {
        id: '#FFA500',
        color: '#FFA500',
    }, {
        id: '#FF0000',
        color: '#FF0000',
    }, {
        id: '#FFFF00',
        color: '#FFFF00',
    }, {
        id: '#CB42F4',
        color: '#CB42F4',
    }];

    private labels: any = {};

    public constructor(
        fireHydrantService: FireHydrantService,
        private fireHydrantTypeService: FireHydrantTypeService,
        private operatorTypeService: OperatorTypeService,
        private unitOfMeasureService: UnitOfMeasureService,
        private cityService: CityService,
        private laneService: LaneService,
        private translateService: TranslateService,
    ) {
        super(fireHydrantService);

        this.dataSource = new DataSource({
            store: new ODataService({
                url: 'FireHydrant',
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
        return FireHydrant.fromJSON(data);
    }

    public ngOnInit() {
        this.loadCity();
        this.loadLane();
        this.loadFireHydrantType();
    }

    public getFireHydrantTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(config.locale);
    }

    public getUnitOfMeasureName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(config.locale);
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
                title: this.labels['selectCity'],
                closeOnOutsideClick: true,
                onOpened: (ev) => {
                    ev.component.option('dataSource', this.cities);
                },
                onValueChanged: (ev) => {
                    this.selectedCity = ev.value;
                    this.addingButton.option('disabled', false);
                    this.dataSource.filter(['idCity', '=', new Guid(ev.value)]);
                    this.dataSource.load();
                    this.loadLaneByCity(ev.value);
                }
            }
        });
    }

    public onInitNewRow(e) {
        e.data.color = '#FF0000';
        e.data.isActive = true;
        e.data.idCity = this.selectedCity;
    }

    public onEditingStart(e) { }

    public onEditorPreparing(e) {
        if (e.dataField === 'idLane' || e.dataField === 'idIntersection') {
            e.editorName = 'dxLookup';
            e.editorOptions.showClearButton = true;
            e.editorOptions.closeOnOutsideClick = true;
            e.editorOptions.onInitialized = (ev) => {
                this.formFields[e.dataField] = ev.component;
            };
            e.editorOptions.onValueChanged = (ev) => {
                if (ev.value) {
                    e.component.filter(e.dataField, '=', new Guid(ev.value));
                } else {
                    e.component.clearFilter(e.dataField);
                }
            };
            e.editorOptions.onOpened = (ev) => {
                ev.component.option('dataSource', this.lanesOfCity);
            };
        } else if (e.dataField === 'color') {
            e.editorName = 'dxSelectBox';
            e.editorOptions.fieldTemplate = (data, container) => {
                container.innerHTML = '<div class="dx-texteditor-container">' +
                    '<div class="fireHydrantField">' +
                        '<div class="textbox"><input class="dx-texteditor-input" value="' + data.color + '" readOnly="true" /></div>' +
                        '<div class="fireHydrant" style="background-color: ' + data.color + '"></div>' +
                    '</div>' +
                    '<div class="dx-texteditor-buttons-container"></div>' +
                '</div>';
            };
            e.editorOptions.itemTemplate = (data, index, container) => {
                container.innerHTML = '<div class="fireHydrant" style="background-color: ' + data.color + '"></div>';
            };
        }
    }

    private loadFireHydrantType() {
        this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
    }

    private loadOperatorType() {
        this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getRate().subscribe(data => this.rateUnits = data);
        this.unitOfMeasureService.getPressure().subscribe(data => this.pressureUnits = data);
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

    private loadLane() {
        this.laneService.localized().subscribe(data => {
            this.lanes = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadLaneByCity(idCity: string) {
        this.laneService.getAllOfCity(idCity).subscribe(data => {
            this.lanesOfCity = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}
