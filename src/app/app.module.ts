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
import { AddTeacherCanDeactivate } from './home/teachers/add-teacher.can-deactivate';

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
    AddTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TeacherService, AddTeacherCanDeactivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
