import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CourseModel } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  @Input() course!: CourseModel | undefined;

  constructor(
    private courseService: CourseService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onCourseClick(id: number) {
    this.router.navigate(['.', id], { relativeTo: this.activeRoute });
  }

  onDeleteCourse(id: number) {
    this.courseService.deleteCourse(id);
  }
}
