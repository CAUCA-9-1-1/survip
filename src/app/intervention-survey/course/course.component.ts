import { Component, OnInit } from '@angular/core';

import {InterventionPlanCourseService} from '../shared/services/intervention-plan-course.service';
import {InterventionPlanCourse} from '../shared/models/intervention-plan-course';

@Component({
  selector: 'app-intervention-survey-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.styl']
})
export class CourseComponent implements OnInit {
  private courses: InterventionPlanCourse[];

  constructor(private courseService: InterventionPlanCourseService) { }

  ngOnInit() {
    this.courseService.getAll().subscribe((courses) => {
      this.courses = courses;
    });
  }

}
