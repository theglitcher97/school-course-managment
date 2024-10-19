import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { StudentModel } from './student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {

  public students: StudentModel[] = [];
  studentsObs!: Subscription;

  constructor(private studentService: StudentService){}

  ngOnInit(): void {
      this.students = this.studentService.getStudents();
      this.studentsObs = this.studentService.studentsUpdatedEvent.subscribe(students => {
        this.students = students;
      })
  }

  ngOnDestroy(): void {
      this.studentsObs.unsubscribe();
  }
}
