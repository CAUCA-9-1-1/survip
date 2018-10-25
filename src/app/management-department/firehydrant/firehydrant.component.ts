import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {TranslateService} from '@ngx-translate/core';
import Guid from 'devextreme/core/guid';

import config from '../../../assets/config/config.json';
import {FireHydrantService} from '../shared/services/fire-hydrant.service';
import {FireHydrantType} from '../../management-type-system/shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../../management-type-system/shared/services/fire-hydrant-type.service';
import {LaneService} from '../shared/services/lane.service';
import {OperatorTypeService} from '../../management-type-system/shared/services/operator-type.service';
import {UnitOfMeasure} from '../../management-type-system/shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../../management-type-system/shared/services/unit-of-measure.service';
import {GridWithOdataService} from '../../shared/classes/grid-with-odata-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {FireHydrant} from '../shared/models/fire-hydrant.model';
import {ODataService} from '../../shared/services/o-data.service';
import {LocationTypeService} from '../../management-type-system/shared/services/location-type.service';
import {AddressLocationTypeService} from '../../management-type-system/shared/services/address-location-type.service';
import {EnumModel} from '../../management-type-system/shared/models/enum.model';


@Component({
    selector: 'app-management-department-firehydrant',
    templateUrl: './firehydrant.component.html',
    styleUrls: ['./firehydrant.component.scss'],
    providers: [
        FireHydrantService,
        FireHydrantTypeService,
        OperatorTypeService,
        LocationTypeService,
        AddressLocationTypeService,
        UnitOfMeasureService,
        CityService,
        LaneService,
    ]
})
export class FirehydrantComponent extends GridWithOdataService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    public locationTypes: EnumModel[] = [];
    public addressLocationTypes: EnumModel[] = [];
    public addingButton: any;
    public selectedCity = '';
    public selectedCityGeometry: any = {};
    public fireHydrantTypes: FireHydrantType[] = [];
    public lanes: any = {};
    public lanesOfCity: any = {};
    public operatorTypes: EnumModel[] = [];
    public rateUnits: UnitOfMeasure[] = [];
    public pressureUnits: UnitOfMeasure[] = [];
    public formFields = {
        idLane: null,
        idCity: null,
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
        private fireHydrantTypeService: FireHydrantTypeService,
        private operatorTypeService: OperatorTypeService,
        private locationTypeService: LocationTypeService,
        private addressLocationTypeService: AddressLocationTypeService,
        private unitOfMeasureService: UnitOfMeasureService,
        private cityService: CityService,
        private laneService: LaneService,
        private translateService: TranslateService,
    ) {
        super({
            store: new ODataService({
                url: 'FireHydrant',
                key: 'id',
                keyType: 'Guid',
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
        this.loadOperatorType();
        this.loadUnitOfMeasure();
    }

    public getFireHydrantTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(config.locale);
    }

    public getUnitOfMeasureName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(config.locale);
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
                onInitialized: (ev) => {
                    this.formFields.idCity = ev.component;
                },
                onValueChanged: (ev) => {
                    this.cityService.geolocation(ev.value).subscribe(data => {
                        this.selectedCityGeometry = data['features'][0];
                    });

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
        e.data.id = new Guid();
        e.data.color = '#FF0000';
        e.data.isActive = true;
        e.data.idCity = this.selectedCity;
        e.data.locationType = 'Address';
        e.data.rateOperatorType = 'Equal';
        e.data.pressureOperatorType = 'Equal';
        e.data.coordinates = null;
        e.data.idUnitOfMeasureRate = '';
        e.data.idUnitOfMeasurePressure = '';

        this.displayLocationField(e.component, e.data.locationType);
    }

    public onEditingStart(e) {
        this.displayLocationField(e.component, e.data.locationType);
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'locationType') {
            e.editorOptions.onValueChanged = (ev) => {
                e.setValue(ev.value);

                this.displayLocationField(e.component, ev.value);
            };
        } else if (e.dataField === 'idLane' || e.dataField === 'idIntersection') {
            e.editorName = 'dxLookup';
            e.editorOptions.showClearButton = true;
            e.editorOptions.closeOnOutsideClick = true;
            e.editorOptions.onInitialized = (ev) => {
                this.formFields[e.dataField] = ev.component;
            };
            e.editorOptions.onValueChanged = (ev) => {
                if (ev.element.parentNode.className.indexOf('dx-editor-container') > -1) {
                    if (ev.value) {
                        e.component.filter(e.dataField, '=', new Guid(ev.value));
                    } else {
                        e.component.clearFilter();
                    }
                } else {
                    e.setValue(ev.value);
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
                        '<div class="textbox">' +
                            '<input class="dx-texteditor-input" value="' + (data ? data.color : '') + '" readOnly="true" />' +
                        '</div>' +
                        '<div class="fireHydrant" style="background-color: ' + (data ? data.color : '') + '"></div>' +
                    '</div>' +
                    '<div class="dx-texteditor-buttons-container"></div>' +
                '</div>';
            };
            e.editorOptions.itemTemplate = (data, index, container) => {
                container.innerHTML = '<div class="fireHydrant" style="background-color: ' + data.color + '"></div>';
            };
        }
    }

    private displayLocationField(component, value) {
        const columns = component.option('columns');
        const fieldToCheck = ['civicNumber', 'addressLocationType', 'coordinates', 'idLane', 'idIntersection', 'physicalPosition'];
        const hiddenFields = {
            'Address': ['idIntersection', 'coordinates', 'physicalPosition'],
            'LaneAndIntersection': ['civicNumber', 'addressLocationType', 'coordinates', 'physicalPosition'],
            'Coordinates': ['civicNumber', 'addressLocationType', 'idLane', 'idIntersection', 'physicalPosition'],
            'Text': ['civicNumber', 'addressLocationType', 'idLane', 'idIntersection', 'coordinates']
        };

        if (this.form) {
            columns.forEach(column => {
                if (fieldToCheck.indexOf(column.dataField) > -1) {
                    const visible = this.form.itemOption(column.dataField, 'visible') || true;

                    if (hiddenFields[value].indexOf(column.dataField) > -1 && visible) {
                        this.form.itemOption(column.dataField, 'visible', false);
                    } else {
                        this.form.itemOption(column.dataField, 'visible', true);
                    }
                }
            });
        } else {
            setTimeout(() => {
                this.displayLocationField(component, value);
            }, 10);
        }
    }

    private loadFireHydrantType() {
        this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
    }

    private loadOperatorType() {
        this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
        this.locationTypeService.getAll().subscribe(data => this.locationTypes = data);
        this.addressLocationTypeService.getAll().subscribe(data => this.addressLocationTypes = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getRate().subscribe(data => this.rateUnits = data);
        this.unitOfMeasureService.getPressure().subscribe(data => this.pressureUnits = data);
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.formFields.idCity.option('value', (data[0] ? data[0].id : ''));
            this.formFields.idCity.option('dataSource', {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            });
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
