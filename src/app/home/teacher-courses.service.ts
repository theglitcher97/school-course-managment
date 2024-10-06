import { Injectable } from "@angular/core";
import { CourseModel } from "./courses/course.model";
import { CourseService } from "./courses/course.service";

@Injectable()
export class TeacherCoursesService {
    // courseId -> [teacherId, courseId]
    public teacherCourses: Map<number, Set<number>> = new Map<number, Set<number>>();

    constructor(private courseService: CourseService){}

    addCourseToTeacher(teacherId: number, courseId: number) {
        if (!this.teacherCourses.has(teacherId))
            this.teacherCourses.set(teacherId, new Set<number>());
        this.teacherCourses.get(teacherId)?.add(courseId);
    }

    removeCourseFromTeacher(teacherId: number, courseId: number) {
        if (!this.teacherCourses.has(teacherId))
            return;
        this.teacherCourses.get(teacherId)?.delete(courseId);
    }

    swapCourseToTeacher(teacherId: number, prevCourseId: number, newCourseId: number) {
        if (!this.teacherCourses.has(teacherId))
            return;
        this.removeCourseFromTeacher(teacherId, prevCourseId);
        this.addCourseToTeacher(teacherId, newCourseId);
    }

    getTeacherCourses(teacherId: number){
        const courses: CourseModel[] = [];
        if(!this.teacherCourses.has(teacherId))
            return courses;
        
        this.teacherCourses.get(teacherId)?.forEach(courseId => {
            let course = this.courseService.getCourseById(courseId);
            if (course !== undefined)
                courses.push(course);
        })

        return courses;
    }
}