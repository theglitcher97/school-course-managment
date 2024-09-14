import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CourseModel } from '../course.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit, AfterViewInit {
  @ViewChild('courseName') courseNameInput!: ElementRef;
  @ViewChild('teacherName') teacherNameInput!: ElementRef;
  @ViewChild('totalStudents') totalStudentsInput!: ElementRef;
  @ViewChild('courseImage') courseImageInput!: ElementRef;

  private course!: CourseModel;
  private isEditing = false;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Init');
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = this.activatedRoute.snapshot.params['id'];
      if (id !== undefined) {
        let course = this.courseService.getCourseById(+id);
        if (course === undefined) return;

        this.course = course;
        this.courseNameInput.nativeElement.value = this.course.name;
        this.teacherNameInput.nativeElement.value = this.course.teacher;
        this.totalStudentsInput.nativeElement.value = this.course.totalStudents;
        this.courseImageInput.nativeElement.value = this.course.img;
        this.isEditing = true;
      }
    });
  }

  onSaveCourse() {
    const courseName = this.courseNameInput.nativeElement.value;
    const teacherName = this.teacherNameInput.nativeElement.value;
    const totalStudents = this.totalStudentsInput.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;

    if (!this.isEditing) {
      this.course = new CourseModel(
        teacherName,
        courseName,
        totalStudents,
        courseImage
      );
    }else{
      this.course.name = courseName;
      this.course.teacher = teacherName;
      this.course.totalStudents = totalStudents;
      this.course.img = courseImage;
    }

    if (this.isEditing) this.courseService.updateCourse(this.course);
    else this.courseService.addCourse(this.course);
  }
}
