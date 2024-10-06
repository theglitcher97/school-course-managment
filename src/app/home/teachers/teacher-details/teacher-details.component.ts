import { Component, Input, OnInit } from '@angular/core';
import { TeacherModel } from '../teacher.model';
import { CourseModel } from '../../courses/course.model';
import { ActivatedRoute, Params } from '@angular/router';
import { TeacherCoursesService } from '../../teacher-courses.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css'],
})
export class TeacherDetailsComponent implements OnInit {
  teacher!: TeacherModel;
  courses: CourseModel[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private teacherCoursesService: TeacherCoursesService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {

    this.activateRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== undefined) {
        const teacher = this.teacherService.getTeacherById(id);
        if (teacher !== undefined)
          this.teacher = teacher;
        this.courses = this.teacherCoursesService.getTeacherCourses(id);
        console.log(this.courses);
      }
    });
  }
}
