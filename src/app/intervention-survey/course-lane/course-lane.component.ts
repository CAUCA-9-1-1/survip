import {Component, ComponentRef, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LaneService} from '../shared/services/lane.service';
import {InterventionPlanCourseLane} from '../shared/models/intervention-plan-course-lane';
import {InterventionPlanCourseLaneService} from '../shared/services/intervention-plan-course-lane.service';

@Component({
  selector: 'app-intervention-survey-course-lane',
  templateUrl: './course-lane.component.html',
  styleUrls: ['./course-lane.component.styl']
})
export class CourseLaneComponent implements OnInit {
  @Input() street: InterventionPlanCourseLane;

  public courseLaneForm: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    public laneService: LaneService,
    private courseLaneService: InterventionPlanCourseLaneService
  ) {
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    this.setValues();
  }

  onSubmit(form) { }

  public removeLine() {
    this.courseLaneService.delete(this.street.id).subscribe(() => console.log('course lane changed'));
    this.elementRef.nativeElement.remove();
  }

  private setValues() {
    if (this.street != null) {
      this.courseLaneForm.patchValue(this.street);
    }
  }

  private createForm() {
    this.courseLaneForm = this.fb.group({
      sequence: [''],
      idLane: [''],
      direction: [''],
    });
  }

  private startWatchingForm() {
    this.courseLaneForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.courseLaneForm.valid && this.courseLaneForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    Object.assign(this.street, this.courseLaneForm.value);

    this.courseLaneService.update(this.street).subscribe(() => console.log('course lane changed'));
  }
}
