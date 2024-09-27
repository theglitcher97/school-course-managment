import { EventEmitter, Injectable, Injector } from "@angular/core";
import { TeacherModel } from "./teacher.model";
import { CourseService } from "../courses/course.service";

@Injectable()
export class TeacherService {
    
    public teacherUpdatedEvent: EventEmitter<TeacherModel> = new EventEmitter<TeacherModel>();
    public teachersUpdatedEvent: EventEmitter<TeacherModel[]> = new EventEmitter<TeacherModel[]>();

    constructor(private injector: Injector){}
   
    private teachers: TeacherModel[] = []


    public getTeachers() {
        return this.teachers.slice();
    }

    getTeacherById(teacherId: number) {
        return this.teachers.slice().find((t: TeacherModel) => t.id === teacherId);
    }

    save(teacher: TeacherModel) {
      this.teachers.unshift(teacher);
      this.teachersUpdatedEvent.next(this.teachers.slice())
    }

    update(id: number, teacher: TeacherModel) {
      const oldTeacherIndex = this.teachers.findIndex(t => t.id === id);
      if (oldTeacherIndex === -1) return;
      this.teachers.splice(oldTeacherIndex, 1, teacher);
      this.teacherUpdatedEvent.next(teacher);
    }

    deleteTeacher(id: number):boolean {
      const courseService = this.injector.get(CourseService);
      const hasCourseAssigned = courseService.hasAnyCourseAssigned(id)
      if (hasCourseAssigned) return false;
      const oldTeacherIndex = this.teachers.findIndex(t => t.id === id);
      this.teachers.splice(oldTeacherIndex, 1);
      this.teachersUpdatedEvent.next(this.teachers.slice())
      return true;
    }
    
}