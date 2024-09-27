import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  public teachers!: TeacherModel[];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
      this.teachers = this.teacherService.getTeachers();
      this.teacherService.teachersUpdatedEvent.subscribe(teachers => {
        this.teachers = teachers;
      })
  }
}
