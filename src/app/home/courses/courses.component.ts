import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { CourseModel } from './course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  public courses!: CourseModel[];

  constructor(
    private courseService: CourseService,
    private activeRouted: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  onCourseClick(id: number) {
    this.router.navigate(['.', id], {relativeTo: this.activeRouted})
  }

  onDeleteCourse(id: number) {
    this.courseService.deleteCourse(id);
    this.courses = this.courseService.getCourses();
  }
}
