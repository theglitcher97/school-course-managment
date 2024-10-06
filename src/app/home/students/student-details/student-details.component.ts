import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../student.model';
import { CourseModel } from '../../courses/course.model';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../student.service';
import { StudentCoursesService } from '../../student-courses.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student!: StudentModel;
  courses: CourseModel[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private studentCoursesService: StudentCoursesService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== undefined) {
        const student = this.studentService.getStudentById(id);
        if (student !== undefined) this.student = student;
        this.courses = this.studentCoursesService.getStudentCourses(id);
      }
    });
  }
}
