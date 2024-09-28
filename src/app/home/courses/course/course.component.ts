import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CourseModel } from '../course.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { StudentModel } from '../../students/student.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  @Input() course!: CourseModel | undefined;
  public students: StudentModel[] = [];

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
