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

@Component({
  selector: 'app-intervention-survey-fire-hydrant',
  templateUrl: './fire-hydrant.component.html',
  styleUrls: ['./fire-hydrant.component.styl']
})
export class FireHydrantComponent implements OnInit, OnChanges {
  @Input() item: InterventionPlanFireHydrant;
  @Output() deleteClicked = new EventEmitter();

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
  ]

  constructor(
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
    this.setValues();
  }

  ngOnChanges() {
    console.log('changed');
  }

  private setValues() {
    this.hydrantForm.patchValue(this.item);
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
    'latitude': [''],
    'longitude': [''],
    'locationDetails': [''],
    });
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.item);
  }

  onLocaliseClicked() {
    alert('En attente de la nouvelle version de IGO');
  }

  private saveIfValid() {
    if (this.hydrantForm.valid && this.hydrantForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving contact...');
    const formModel  = this.hydrantForm.value;
    Object.assign(this.item, formModel);
    this.fireHydrantService.update(this.item)
      .then(() => console.log('Contact saved.'));
  }
}
