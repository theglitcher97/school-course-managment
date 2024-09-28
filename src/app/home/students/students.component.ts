import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public students: StudentModel[] = [];
  constructor(private studentService: StudentService){}

  ngOnInit(): void {
      this.students = this.studentService.getStudents();
      this.studentService.studentsUpdatedEvent.subscribe(students => {
        this.students = students;
      })
  }
}
