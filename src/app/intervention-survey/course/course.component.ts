import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FirestationService} from '../shared/services/firestation.service';
import {Firestation} from '../shared/models/firestation';
import {InterventionPlanCourse} from '../shared/models/intervention-plan-course';
import {InterventionPlanCourseLaneService} from '../shared/services/intervention-plan-course-lane.service';
import {InterventionPlanCourseLane} from '../shared/models/intervention-plan-course-lane';

@Component({
  selector: 'app-intervention-survey-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.styl'],
  providers: [
    FirestationService,
    InterventionPlanCourseLaneService
  ]
})
export class CourseComponent implements OnInit, OnChanges {
  @ViewChild('popupFirestation') popupRef: ElementRef;
  @Input() course: InterventionPlanCourse;

  private courseForm: FormGroup;
  private firestations: Firestation[];
  private firestation: string;
  private streets: InterventionPlanCourseLane[];

  constructor(
    private firestationService: FirestationService,
    private courseLaneService: InterventionPlanCourseLaneService,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    this.firestationService.getAll().subscribe((stations) => {
      this.firestations = stations;
    });
    this.firestationService.get(this.course.idFirestation).subscribe((station) => {
      this.firestation = station.stationName;
    });
    this.courseLaneService.getCourse(this.course.id).subscribe((lanes) => {
      this.streets = lanes;
    });

    this.setValues();
  }

  ngOnChanges() {
    console.log('changed');
  }

  startEdit() {
    this.popupRef.nativeElement.className = 'popup open';
  }

  stopEdit() {
    this.popupRef.nativeElement.className = 'popup';

    this.courseLaneService.getCourse(this.course.id).subscribe((lanes) => {
      this.streets = lanes;
    });
  }

  private setValues() {
    if (this.course != null) {
      this.courseForm.patchValue(this.course);
    }
  }

  private createForm() {
    this.courseForm = this.fb.group({
      idFirestation: ['', Validators.required],
    });
  }

  private startWatchingForm() {
    this.courseForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.courseForm.valid && this.courseForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    Object.assign(this.course, this.courseForm.value);

    // this.iService.update(this.item).subscribe(() => console.log('Contact saved.'));
  }
}
