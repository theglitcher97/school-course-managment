import { Injectable } from "@angular/core";
import { StudentModel } from "./students/student.model";
import { StudentService } from "./students/student.service";
import { StudentCoursesService } from "./student-courses.service";
import { Subject } from "rxjs";

@Injectable()
export class CourseStudentsService {
    
    // courseId -> [courseId, studentId]
    public courseStudents: Map<number, Set<number>> = new Map<number, Set<number>>();
    public courseStudentsUpdated: Subject<boolean> = new Subject<boolean>();

    constructor(private studentService: StudentService, private studentCoursesService: StudentCoursesService){}

    public addStudentToCourse(courseId: number, studentId: number) {
        if (!this.courseStudents.has(courseId))
            this.courseStudents.set(courseId, new Set<number>())
        this.courseStudents.get(courseId)?.add(studentId);
        this.studentCoursesService.addCourseToStudent(studentId, courseId);
        this.courseStudentsUpdated.next(true);
    }   

    public getStudentForCourse(courseId: number): StudentModel[] {
        const students: StudentModel[] = [];
        if (!this.courseStudents.has(courseId))
            return students;

        this.courseStudents.get(courseId)?.forEach(stdId => {
            let student = this.studentService.getStudentById(stdId);
            if (student !== undefined)
                students.push(student);
        })
        
        return students;
    }

    removeStudentFromCourse(id: number, studentId: number) {
        if (!this.courseStudents.has(id))
            return;
        this.courseStudents.get(id)?.delete(studentId);
        this.studentCoursesService.removeCourseFromStudent(studentId, id);
        this.courseStudentsUpdated.next(true);
    }
}