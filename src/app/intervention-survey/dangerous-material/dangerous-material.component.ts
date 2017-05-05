import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BuildingHazardousMaterial} from '../shared/models/building-hazardous-material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BuildingHazardousMaterialService} from '../shared/services/building-hazardous-material.service';

@Component({
  selector: 'app-intervention-survey-dangerous-material',
  templateUrl: './dangerous-material.component.html',
  styleUrls: ['./dangerous-material.component.styl']
})
export class DangerousMaterialComponent implements OnInit, OnChanges {
  materialForm: FormGroup;
  @Input() item: BuildingHazardousMaterial;
  @Output() deleteClicked = new EventEmitter();

  constructor(
    private matService: BuildingHazardousMaterialService,
    private fb: FormBuilder) {
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    this.setValues();
  }
  ngOnChanges() {
    console.log('changed');
  }

  private setValues() {
    this.materialForm.patchValue(this.item);
  }

  createForm() {
    this.materialForm = this.fb.group({
    });
  }

  private startWatchingForm() {
    this.materialForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.materialForm.valid && this.materialForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving mat...');
    const formModel  = this.materialForm.value;
    Object.assign(this.item, formModel);
    this.matService.update(this.item)
      .then(() => console.log('Mat saved.'));
  }
}
