import { Injectable } from "@angular/core";
import { CourseModel } from "./courses/course.model";
import { CourseService } from "./courses/course.service";

@Injectable()
export class StudentCoursesService {
    // courseId -> [studentId, courseId]
    public studentCourses: Map<number, Set<number>> = new Map<number, Set<number>>();

    constructor(private courseService: CourseService){}

    addCourseToStudent(studentId: number, courseId: number) {
        if (!this.studentCourses.has(studentId))
            this.studentCourses.set(studentId, new Set<number>());
        this.studentCourses.get(studentId)?.add(courseId);
    }

    removeCourseFromStudent(studentId: number, courseId: number) {
        if (!this.studentCourses.has(studentId))
            return;
        this.studentCourses.get(studentId)?.delete(courseId);
    }

    getStudentCourses(studentId: number){
        const courses: CourseModel[] = [];
        if(!this.studentCourses.has(studentId))
            return courses;
        
        this.studentCourses.get(studentId)?.forEach(courseId => {
            let course = this.courseService.getCourseById(courseId);
            if (course !== undefined)
                courses.push(course);
        })

        return courses;
    }
}