import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CourseModel } from '../course.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  public course!: CourseModel | undefined;

  constructor(
    private courseService: CourseService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.course = this.courseService.getCourseById(+params['id']);
    });
  }
}
