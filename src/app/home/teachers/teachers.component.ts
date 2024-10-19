import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from './teacher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit, OnDestroy {
  public teachers!: TeacherModel[];
  teachersSubs!: Subscription;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
      this.teachers = this.teacherService.getTeachers();
      this.teachersSubs = this.teacherService.teachersUpdatedEvent.subscribe(teachers => {
        this.teachers = teachers;
      })
  }

  ngOnDestroy(): void {
      this.teachersSubs.unsubscribe();
  }
}
