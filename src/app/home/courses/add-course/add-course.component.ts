import { Component, ElementRef, ViewChild } from '@angular/core';
import { CourseModel } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  @ViewChild("courseName") courseNameInput!: ElementRef;
  @ViewChild("teacherName") teacherNameInput!: ElementRef;
  @ViewChild("totalStudents") totalStudentsInput!: ElementRef;
  @ViewChild("courseImage") courseImageInput!: ElementRef;

  private course!: CourseModel;

  constructor(private courseService: CourseService){}

  onSaveCourse(){
    const courseName = this.courseNameInput.nativeElement.value;
    const teacherName = this.teacherNameInput.nativeElement.value;
    const totalStudents = this.totalStudentsInput.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;
    
    this.course = new CourseModel(teacherName, courseName, totalStudents, courseImage);
    this.courseService.addCourse(this.course);
  }
}
