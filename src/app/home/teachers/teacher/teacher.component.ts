import { Component, Input } from '@angular/core';
import { TeacherModel } from '../teacher.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  @Input("teacher") teacher!: TeacherModel;

  constructor(private teacherService: TeacherService){}

  onDeleteTeacher(){
    const wasRemoved = this.teacherService.deleteTeacher(this.teacher.id);
    if (!wasRemoved) window.alert("Cannot removed teacher is it has any course assigned")
  }
}
