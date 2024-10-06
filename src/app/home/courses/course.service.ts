import { EventEmitter, Injectable, Injector, OnInit } from '@angular/core';
import { CourseModel } from './course.model';
import { TeacherService } from '../teachers/teacher.service';
import { TeacherCoursesService } from '../teacher-courses.service';

@Injectable({ providedIn: 'root' })
export class CourseService implements OnInit {
  
  public coursesUpdatedEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  private courses: CourseModel[] = [];

  constructor(private teacherService: TeacherService, private injector: Injector) {}

  ngOnInit(): void {
    
  }

  public getCourses(): CourseModel[] {
    return this.courses.slice();
  }

  getCourseById(courseId: number): CourseModel | undefined {
    return this.courses.find((c) => c.id === courseId);
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter((c) => c.id !== id);
    this.coursesUpdatedEvent.next(true);
  }

  addCourse(course: CourseModel) {
    const teacherCoursesService = this.injector.get(TeacherCoursesService);
    const teacher = this.teacherService.getTeacherById(course.teacherId);
    if (teacher == undefined) return false;

    course.teacher = {
      code: teacher.teacherCode,
      name: `${teacher.firstName} ${teacher.lastName}`,
    };
    this.courses.unshift(course);

    teacherCoursesService.addCourseToTeacher(course.teacherId, course.id);
    this.coursesUpdatedEvent.next(true);
    return true;
  }

  updateCourse(course: CourseModel, prevTeacherId: number) {
    const teacherCoursesService = this.injector.get(TeacherCoursesService);
    let index = this.courses.findIndex((c) => c.id === course.id);
    if (index === -1) return false;

    const teacher = this.teacherService.getTeacherById(course.teacherId);
    if (teacher == undefined) return false;

    course.teacher.code = teacher.teacherCode;
    course.teacher.name = `${teacher.firstName} ${teacher.lastName}`;

    this.courses.splice(index, 1, course);
    if (course.teacherId !== prevTeacherId)
      teacherCoursesService.swapCourseToTeacher(course.teacherId, prevTeacherId, course.teacherId);
    
    this.coursesUpdatedEvent.next(true);
    return true;
  }

  hasAnyCourseAssigned(teacherId: number) {
    return this.courses.some(c => c.teacherId === teacherId);
  }
}
