import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoursesComponent } from './home/courses/courses.component';
import { CourseComponent } from './home/courses/course/course.component';
import { TeachersComponent } from './home/teachers/teachers.component';
import { TeacherComponent } from './home/teachers/teacher/teacher.component';

const appRoutes: Route[] = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: ':id',
        component: CourseComponent,
      },
    ],
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    children: [
      {
        path: ':id',
        component: TeacherComponent,
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
