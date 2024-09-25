import { Component, Input } from '@angular/core';
import { TeacherModel } from '../teacher.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  @Input("teacher") teacher!: TeacherModel;
}
