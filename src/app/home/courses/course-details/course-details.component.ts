import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../students/student.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  students: StudentModel[] = [];

  constructor(private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.students = data['courseStudents'] as StudentModel[];
      console.log("students ", this.students)
    })
  }
}
