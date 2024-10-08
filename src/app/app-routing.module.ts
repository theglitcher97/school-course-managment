import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoursesComponent } from './home/courses/courses.component';
import { CourseComponent } from './home/courses/course/course.component';
import { TeachersComponent } from './home/teachers/teachers.component';
import { TeacherComponent } from './home/teachers/teacher/teacher.component';
import { AddCourseComponent } from './home/courses/add-course/add-course.component';
import { AddTeacherComponent } from './home/teachers/add-teacher/add-teacher.component';
import { CanDeactivateComponent } from './home/teachers/add-teacher.can-deactivate';
import { StudentsComponent } from './home/students/students.component';
import { AddStudentComponent } from './home/students/add-student/add-student.component';
import { StudentComponent } from './home/students/student/student.component';
import { CourseStudentsResolver } from './home/courses/course-students.resolver';
import { CourseDetailsComponent } from './home/courses/course-details/course-details.component';
import { TeacherDetailsComponent } from './home/teachers/teacher-details/teacher-details.component';
import { StudentDetailsComponent } from './home/students/student-details/student-details.component';

const appRoutes: Route[] = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: 'add-course',
        component: AddCourseComponent,
        canDeactivate: [CanDeactivateComponent],
      },
      {
        path: ':id',
        component: CourseDetailsComponent,
        resolve: {courseStudents: CourseStudentsResolver}
      },
      {
        path: ':id/edit',
        component: AddCourseComponent,
        canDeactivate: [CanDeactivateComponent],
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
        canDeactivate: [CanDeactivateComponent],
      },
      {
        path: ':id',
        component: TeacherDetailsComponent,
      },
      {
        path: ':id/edit',
        component: AddTeacherComponent,
        canDeactivate: [CanDeactivateComponent],
      },
    ],
  },
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      {
        path: 'add-student',
        component: AddStudentComponent,
        canDeactivate: [CanDeactivateComponent],
      },
      {
        path: ':id',
        component: StudentDetailsComponent,
      },
      {
        path: ':id/edit',
        component: AddStudentComponent,
        canDeactivate: [CanDeactivateComponent],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
