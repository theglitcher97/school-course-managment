import { EventEmitter, Injectable } from "@angular/core";
import { StudentModel } from "./student.model";

@Injectable()
export class StudentService {
    
    public studentUpdatedEvent: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
    public studentsUpdatedEvent: EventEmitter<StudentModel[]> = new EventEmitter<StudentModel[]>();

    constructor(){}
   
    private students: StudentModel[] = [];


    public getStudents() {
        return this.students.slice();
    }

    getStudentById(studentId: number) {
        return this.students.slice().find((s: StudentModel) => s.id === studentId);
    }

    save(student: StudentModel) {
      this.students.unshift(student);
      this.studentsUpdatedEvent.next(this.students.slice())
    }

    update(id: number, student: StudentModel) {
      const oldIndex = this.students.findIndex(s => s.id === id);
      if (oldIndex === -1) return;
      this.students.splice(oldIndex, 1, student);
      this.studentsUpdatedEvent.next(this.students.slice())
    }

    delete(id: number):boolean {
      // TODO: If student is part of a course, remove it from there too
      const oldIndex = this.students.findIndex(s => s.id === id);
      this.students.splice(oldIndex, 1);
      this.studentsUpdatedEvent.next(this.students.slice())
      return true;
    }
    
}