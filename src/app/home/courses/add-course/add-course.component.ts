import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CourseModel } from '../course.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeacherService } from '../../teachers/teacher.service';
import { TeacherModel } from '../../teachers/teacher.model';
import { CanComponentDeactivate } from '../../teachers/add-teacher.can-deactivate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
  @ViewChild('courseName') courseNameInput!: ElementRef;
  @ViewChild('teacherId') teacherIdInput!: ElementRef;
  @ViewChild('totalStudents') totalStudentsInput!: ElementRef;
  @ViewChild('courseImage') courseImageInput!: ElementRef;

  private course!: CourseModel;
  private isEditing = false;
  public teachers: TeacherModel[] = [];
  private canLeave = false;

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.teachers = this.teacherService.getTeachers();
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = this.activatedRoute.snapshot.params['id'];
      if (id !== undefined) {
        let course = this.courseService.getCourseById(+id);
        if (course === undefined) return;

        this.course = course;
        this.courseNameInput.nativeElement.value = this.course.name;
        this.teacherIdInput.nativeElement.value = this.course.teacherId;
        this.totalStudentsInput.nativeElement.value = this.course.totalStudents;
        this.courseImageInput.nativeElement.value = this.course.img;
        this.isEditing = true;
      }
    });
  }

  onSaveCourse() {
    console.log(this.teacherIdInput);
    
    const courseName = this.courseNameInput.nativeElement.value;
    const teacherId = +this.teacherIdInput.nativeElement.value;
    const totalStudents = this.totalStudentsInput.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;

    if (!this.isEditing) {
      this.course = new CourseModel(
        teacherId,
        courseName,
        totalStudents,
        courseImage
      );
    }else{
      this.course.name = courseName;
      this.course.teacherId = teacherId;
      this.course.totalStudents = totalStudents;
      this.course.img = courseImage;
    }

    if (this.isEditing) this.courseService.updateCourse(this.course);
    else this.courseService.addCourse(this.course);
    this.canLeave = true;
    this.router.navigate([".."], {relativeTo: this.activatedRoute})

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.canLeave) return true;

    if (this.courseNameInput == undefined) return true;

    const courseName = this.courseNameInput.nativeElement.value;
    const teacherId = +this.teacherIdInput.nativeElement.value;
    const totalStudents = this.totalStudentsInput.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;

    if (courseName || teacherId || totalStudents || courseImage)
      return window.confirm("Your progress will be lost")
    return true;
  }
}
