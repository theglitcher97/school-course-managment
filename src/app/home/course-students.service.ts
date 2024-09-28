import { Injectable } from "@angular/core";
import { StudentModel } from "./students/student.model";
import { StudentService } from "./students/student.service";

@Injectable()
export class CourseStudentsService {
    // courseId -> [studentId, studentId]
    public courseStudents: Map<number, Set<number>> = new Map<number, Set<number>>();

    constructor(private studentService: StudentService){}

    public addStudentToCourse(courseId: number, studentId: number) {
        if (!this.courseStudents.has(courseId))
            this.courseStudents.set(courseId, new Set<number>())
        this.courseStudents.get(courseId)?.add(studentId);
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
}