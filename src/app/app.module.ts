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

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    HomeComponent,
    CoursesComponent,
    CourseComponent,
    TeachersComponent,
    TeacherComponent,
    AddCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
