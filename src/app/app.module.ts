import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './home/courses/course/course.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesComponent } from './home/courses/courses.component';
import { TeachersComponent } from './home/teachers/teachers.component';
import { TeacherComponent } from './home/teachers/teacher/teacher.component';
import { AddCourseComponent } from './home/courses/add-course/add-course.component';
import { TeacherService } from './home/teachers/teacher.service';
import { FormsModule } from '@angular/forms';
import { AddTeacherComponent } from './home/teachers/add-teacher/add-teacher.component';
import { CanDeactivateComponent } from './home/teachers/add-teacher.can-deactivate';
import { StudentsComponent } from './home/students/students.component';
import { StudentComponent } from './home/students/student/student.component';
import { AddStudentComponent } from './home/students/add-student/add-student.component';
import { StudentService } from './home/students/student.service';
import { CourseDetailsComponent } from './home/courses/course-details/course-details.component';
import { CourseStudentsResolver } from './home/courses/course-students.resolver';
import { CourseStudentsService } from './home/course-students.service';
import { TeacherDetailsComponent } from './home/teachers/teacher-details/teacher-details.component';
import { TeacherCoursesService } from './home/teacher-courses.service';
import { StudentDetailsComponent } from './home/students/student-details/student-details.component';
import { StudentCoursesService } from './home/student-courses.service';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    TeachersComponent,
    TeacherComponent,
    AddCourseComponent,
    AddTeacherComponent,
    StudentsComponent,
    StudentComponent,
    AddStudentComponent,
    CourseDetailsComponent,
    TeacherDetailsComponent,
    StudentDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    TeacherService,
    CanDeactivateComponent,
    StudentService,
    CourseStudentsService,
    CourseStudentsResolver,
    TeacherCoursesService,
    StudentCoursesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
