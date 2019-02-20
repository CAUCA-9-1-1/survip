import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {TranslateService} from '@ngx-translate/core';
import Guid from 'devextreme/core/guid';
import {FireHydrantService} from '../shared/services/fire-hydrant.service';
import {FireHydrantTypeService} from '../../management-type-system/shared/services/fire-hydrant-type.service';
import {LaneService} from '../shared/services/lane.service';
import {OperatorTypeService} from '../../management-type-system/shared/services/operator-type.service';
import {UnitOfMeasureService} from '../../management-type-system/shared/services/unit-of-measure.service';
import {GridWithOdataService} from '../../shared/classes/grid-with-odata-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {FireHydrant} from '../shared/models/fire-hydrant.model';
import {ODataService} from '../../shared/services/o-data.service';
import {LocationTypeService} from '../../management-type-system/shared/services/location-type.service';
import {AddressLocationTypeService} from '../../management-type-system/shared/services/address-location-type.service';
import {EnumModel} from '../../management-type-system/shared/models/enum.model';
import {BehaviorSubject} from 'rxjs';


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

    protected form: any;
    public selectedLocationType: string;
    public locationTypes: EnumModel[] = [];
    public addressLocationTypes: EnumModel[] = [];
    public addingButton: any;
    public selectedCity = '';
    public selectedCityGeometry: any = {};
    public fireHydrantTypes: any = {store: []};
    public lanes: any = {};
    public lanesOfCity: any = {};
    public operatorTypes: EnumModel[] = [];
    public rateUnits: any = {store: []};
    public pressureUnits: any = {store: []};
    public formFields = {
        idLane: null,
        idCity: null,
        idLaneTransversal: null,
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
    private cityId = '';
    private popupInitialized = false;

    public constructor(
        private injector: Injector,
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
            store: new ODataService(injector, {
                url: 'FireHydrant',
                key: 'id',
                keyType: 'Guid',
                onRefreshLogin: () => {
                    this.dataGrid.instance.refresh();
                }
            }),
        });

        this.translateService.get([
            'selectCity', 'add', 'cannotModifyExternalData'
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

        if(!this.cityService.readOnlyImported) {
            toolbarItems.unshift({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'plus',
                    width: 50,
                    disabled: true,
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
                    this.formFields.idCity = ev.component;
                    this.loadCity();
                },
                onValueChanged: (ev) => {
                    this.cityService.geolocation(ev.value).subscribe(data => {
                        this.selectedCityGeometry = data['features'][0];
                    });

                    this.cityId = this.selectedCity;
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
        e.data.locationType = 'NotSpecified';
        e.data.rateOperatorType = 'Equal';
        e.data.pressureOperatorType = 'Equal';
        e.data.coordinates = null;
        e.data.idUnitOfMeasureRate = '';
        e.data.idUnitOfMeasurePressure = '';
        this.selectedLocationType = 'NotSpecified';
        this.cityId = this.selectedCity;
        this.displayLocationType();
        console.log('onInitNewRow', e);
    }

    public onEditingStart(e) {
        this.selectedLocationType = e.data.locationType;
        this.cityId = this.selectedCity;

    }

    public onEditorPreparing(e) {
        if (e.dataField === 'locationType') {
            e.editorOptions.onValueChanged = (ev) => {
                e.setValue(ev.value);
                this.selectedLocationType = ev.value;
                this.displayLocationType();
                if (this.cityId) {
                    this.formFields.idCity.option('value', this.cityId);
                }
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

        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        }
    }

    public addressLocationOnInitialized(field: any, e: any) {
        if(field.data[field.column.dataField]) {
            let data = field.data[field.column.dataField].toString();
            if(data) {
                let location = this.addressLocationTypes.find(c => c.name == data);
                e.component.option('value', location.value);
            }
        }
    }

    public laneOnInitialized(field: any, e: any) {
        this.formFields[field.column.dataField] = e.component;
        if(field.data[field.column.dataField]) {
            let data = field.data[field.column.dataField].toString();
            if(data) {
                let lane = this.lanesOfCity.store.find(c => c.id == data);
                this.formFields[field.column.dataField].option('value', lane.id);
            }
        }
    }

    public laneOnValueChanged(field: any, e: any) {
        if (e.element.parentNode.className.indexOf('dx-editor-container') > -1) {
            if (e.value) {
                field.component.filter(field.column.dataField, '=', new Guid(e.value));
            } else {
                field.component.clearFilter();
            }
        } else {
            field.setValue(e.value);
        }
    }

    public laneOnOpened(e) {
        e.component.option('dataSource', this.lanesOfCity);
    }

    private loadFireHydrantType() {
        this.fireHydrantTypeService.localized().subscribe(data => this.fireHydrantTypes = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
        });
    }

    private loadOperatorType() {
        this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
        this.locationTypeService.getAll().subscribe(data => this.locationTypes = data);
        this.addressLocationTypeService.getAll().subscribe(data => this.addressLocationTypes = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getRate().subscribe(data => this.rateUnits = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
        });
        this.unitOfMeasureService.getPressure().subscribe(data => this.pressureUnits = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
        });
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            if (this.cityId) {
                this.formFields.idCity.option('value', this.cityId);
            } else {
                this.formFields.idCity.option('value', (data[0] ? data[0].id : ''));
            }
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

    private displayLocationType() {
        if (document.querySelector('#civicNumberTemplate')) {
            document.querySelector('#civicNumberTemplate').className = this.selectedLocationType === 'Address' ? 'dx-field' : 'display-locationType';
            this.changeParentDisplay(document.querySelector('#civicNumberTemplate'));
        }
        if (document.querySelector('#addressLocationTemplate')) {
            document.querySelector('#addressLocationTemplate').className = this.selectedLocationType === 'Address' ? 'dx-field' : 'display-locationType';
            this.changeParentDisplay(document.querySelector('#addressLocationTemplate'));
        }

        if (document.querySelector('.dx-popup-content #transversalTemplate')) {
            document.querySelector('.dx-popup-content #transversalTemplate').className = this.selectedLocationType === 'LaneAndTransversal' ? 'dx-field' : 'display-locationType';
            this.changeParentDisplay(document.querySelector('.dx-popup-content #transversalTemplate'));
        }

        if (document.querySelector('.dx-popup-content #laneTemplate')) {
            document.querySelector('.dx-popup-content #laneTemplate').className = (this.selectedLocationType === 'Address' || this.selectedLocationType === 'LaneAndTransversal') ? 'dx-field' : 'display-locationType';
            this.changeParentDisplay(document.querySelector('.dx-popup-content #laneTemplate'));
        }

        if (document.querySelector('#physicalPositionTemplate')) {
            document.querySelector('#physicalPositionTemplate').className = this.selectedLocationType === 'Text' ? 'dx-field' : 'display-locationType';
            this.changeParentDisplay(document.querySelector('#physicalPositionTemplate'));
        }
    }

    private changeParentDisplay(elem) {
        const id = elem.id;
        const childDisplay = elem.className;
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.className === 'dx-item dx-box-item') {
                if (childDisplay === 'display-locationType' && (id !== 'transversalTemplate' && this.selectedLocationType !== 'Address')) {
                    elem.style.display = 'none';
                } else if (elem.className === 'dx-item dx-box-item' && childDisplay === 'dx-field' && elem.style.display === 'none') {
                    elem.style.display = 'flex';
                }
            }
        }
    }

    public editingShow() {
        if (this.form && !this.popupInitialized) {
            this.displayLocationType();
            this.popupInitialized = true;
        }
    }

    public editingEnd() {
        if (this.form && this.popupInitialized) {
            this.popupInitialized = false;
        }
    }
}
