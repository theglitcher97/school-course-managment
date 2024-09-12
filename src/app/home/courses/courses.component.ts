import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { CourseModel } from './course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses!: CourseModel[];

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
      this.courses = this.courseService.getCourses();
  }
}
