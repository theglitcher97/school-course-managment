import { Component, Input } from '@angular/core';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() student!: StudentModel;

  constructor(private studentService: StudentService){}

  onDeleteStudent(){
    this.studentService.delete(this.student.id);
  }
}
