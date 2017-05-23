import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FireHydrantType} from '../shared/models/fire-hydrant-type';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure';
import {LocationTypeService} from '../shared/services/location-type.service';
import {LocationType} from '../shared/models/location-type';
import {InterventionPlanFireHydrant} from '../shared/models/intervention-plan-fire-hydrant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterventionPlanFireHydrantService} from '../shared/services/intervention-plan-fire-hydrant.service';
import {LaneService} from '../shared/services/lane.service';
import {ContextLayer, ContextService, DataSourceService, DetailedContext, IgoMap, LayerService} from 'igo2';

@Component({
  selector: 'app-intervention-survey-fire-hydrant',
  templateUrl: './fire-hydrant.component.html',
  styleUrls: ['./fire-hydrant.component.styl']
})
export class FireHydrantComponent implements OnInit, OnChanges {
  @Input() item: InterventionPlanFireHydrant;
  @Output() deleteClicked = new EventEmitter();

  public map = new IgoMap();

  fireHydrantTypes: FireHydrantType[];
  unitsOfMeasure: UnitOfMeasure[];
  locationTypes: LocationType[];
  hydrantForm: FormGroup;

  public FIREHYDRANT_TYPE = [
    { 'value': 1, 'type': 'Adresse' },
    { 'value': 2, 'type': 'Intersection' },
    { 'value': 3, 'type': 'Lat/Long' },
    { 'value': 4, 'type': 'Autre' }
  ];

  public FireHydrantColors = [
    { 'value' : 'cornflowerblue' },
    { 'value' : 'forestgreen' },
    { 'value' : 'orange' },
    { 'value' : 'red' },
    { 'value' : 'yellow' },
    { 'value' : 'white' },
  ];

  constructor(
    private dataSourceService: DataSourceService,
    private layerService: LayerService,
    public contextService: ContextService,
    fireHydrantTypeService: FireHydrantTypeService,
    unitOfMeasureService: UnitOfMeasureService,
    locationTypeService: LocationTypeService,
    public laneService: LaneService,
    private fireHydrantService: InterventionPlanFireHydrantService,
    private fb: FormBuilder) {

    fireHydrantTypeService.getList()
      .then(types => this.fireHydrantTypes = types);
    unitOfMeasureService.getList()
      .then(units => this.unitsOfMeasure = units);
    locationTypeService.getList()
      .then(types => this.locationTypes = types);
    this.createForm();
    this.startWatchingForm();
  }

  private startWatchingForm() {
    this.hydrantForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  ngOnInit() {

    const layer1 = {
      'source': {
        'title': 'Fond de carte du Québec',
        'type': 'xyz',
        'url': 'https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png'
      }
    };

    let lat: number = Number(this.item.latitude);
    let long: number = Number(this.item.longitude);

    if (lat === 0) {
      lat = 46.20083;
    }
    if (long === 0) {
      long = -70.621622;
    }
    console.log(long, lat);
    this.contextService.setContext({
      'uri': 'default',
      'title': 'Default Context',
      'map': {
        'view': {
          'projection': 'EPSG:3857',
          'center': [long, lat],
          'zoom': 14,
          'minZoom': 6,
          'maxZoom': 17
        }
      },
      'layers': [layer1]
    } as DetailedContext);

    this.addLayerToMap(layer1);
    this.setValues();
  }

  private addLayerToMap(contextLayer: ContextLayer) {
    const sourceContext = contextLayer.source;
    const layerContext = Object.assign({}, contextLayer);
    delete layerContext.source;

    const dataSourceContext = Object.assign({}, layerContext, sourceContext);

    this.dataSourceService
      .createAsyncDataSource(dataSourceContext)
      .subscribe(dataSource =>  {
        this.map.addLayer(
          this.layerService.createLayer(dataSource, layerContext));
      });
  }

  ngOnChanges() {
    console.log('changed');
  }

  onSubmit(form) { }

  private setValues() {
      this.hydrantForm.patchValue(this.item || new InterventionPlanFireHydrant());
      this.hydrantForm.patchValue({location: [this.item.longitude, this.item.latitude] });
  }

  private createForm() {
    this.hydrantForm = this.fb.group({
    'number': ['', Validators.required],
    'color': [''],
    'idFireHydrantType': [''],
    'capacity': [0],
    'idUnitOfMeasure': [''],
    'addressType': [1], // 1: address, 2: intersection, 3: lat/long, 4: other.
    'idLocationType': [''],
    'civicNumber': [''],
    'idLane': [''],
    'idLaneIntersection': [''],
    'location': [''],
    'locationDetails': [''],
    });
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.item);
  }

  onLocaliseClicked() {
    console.log('En attente d\'IGO');
  }

  private saveIfValid() {
    if (this.hydrantForm.valid && this.hydrantForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving fire-hydrant...');
    const formModel  = this.hydrantForm.value;
    Object.assign(this.item, formModel);
    this.item.latitude = formModel.location[1];
    this.item.longitude = formModel.location[0];
    this.fireHydrantService.update(this.item)
      .then(() => console.log('Fire-hydrant saved.'));
  }
}
