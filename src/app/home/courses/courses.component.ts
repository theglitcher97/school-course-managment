import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { CourseModel } from './course.model';
import { TeacherModel } from '../teachers/teacher.model';
import { TeacherService } from '../teachers/teacher.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  public courses!: CourseModel[];

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.courseService.coursesUpdatedEvent.subscribe(() => {
      this.courses = this.courseService.getCourses();
    });

    this.teacherService.teacherUpdatedEvent.subscribe(
      (teacher: TeacherModel) => {
        this.courses = this.courses.map((course) => {
          if (course.teacherId === teacher.id) {
            course.teacher.name = `${teacher.firstName} ${teacher.lastName}`;
            course.teacher.code = teacher.teacherCode;
          }
          return course;
        });
        this.courseService.coursesUpdatedEvent.next(true);
      }
    );
  }
}
