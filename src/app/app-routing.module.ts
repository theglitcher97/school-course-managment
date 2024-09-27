import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoursesComponent } from './home/courses/courses.component';
import { CourseComponent } from './home/courses/course/course.component';
import { TeachersComponent } from './home/teachers/teachers.component';
import { TeacherComponent } from './home/teachers/teacher/teacher.component';
import { AddCourseComponent } from './home/courses/add-course/add-course.component';
import { AddTeacherComponent } from './home/teachers/add-teacher/add-teacher.component';
import { AddTeacherCanDeactivate } from './home/teachers/add-teacher.can-deactivate';

const appRoutes: Route[] = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: 'add-course',
        component: AddCourseComponent,
      },
      {
        path: ':id',
        component: CourseComponent,
      },
      {
        path: ':id/edit',
        component: AddCourseComponent,
      },
    ],
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    children: [
      {
        path: 'add-teacher',
        component: AddTeacherComponent,
        canDeactivate: [AddTeacherCanDeactivate]
      },
      {
        path: ':id',
        component: TeacherComponent,
      },
      {
        path: ':id/edit',
        component: AddTeacherComponent,
        canDeactivate: [AddTeacherCanDeactivate]
      },
    ],
  },
  {
    path: "**", redirectTo: "/courses", pathMatch: "full"
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
