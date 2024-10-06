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
export class AddCourseComponent
  implements OnInit, AfterViewInit, CanComponentDeactivate
{
  @ViewChild('courseName') courseNameInput!: ElementRef;
  @ViewChild('teacherId') teacherIdInput!: ElementRef;
  @ViewChild('maxStudents') maxStudents!: ElementRef;
  @ViewChild('courseImage') courseImageInput!: ElementRef;

  private prevTeacherId = -1;
  private course!: CourseModel;
  private isEditing = false;
  public teachers: TeacherModel[] = [];
  private canLeave = false;

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teachers = this.teacherService.getTeachers();
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id !== undefined) {
        let course = this.courseService.getCourseById(+id);
        if (course === undefined) return;

        this.course = course;
        this.courseNameInput.nativeElement.value = this.course.name;
        this.teacherIdInput.nativeElement.value = this.course.teacherId;
        this.maxStudents.nativeElement.value = this.course.totalStudents;
        this.courseImageInput.nativeElement.value = this.course.img;
        this.isEditing = true;
      }
    });
  }

  onSaveCourse() {
    const courseName = this.courseNameInput.nativeElement.value;
    const teacherId = +this.teacherIdInput.nativeElement.value;
    const maxCourseStudents = this.maxStudents.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;

    if (
      !courseName.trim() ||
      !courseImage.trim() ||
      maxCourseStudents === undefined ||
      maxCourseStudents <= 0
    ) {
      window.alert('Looks like some info is missing, please check');
      return;
    }

    if (!this.isEditing) {
      this.course = new CourseModel(
        teacherId,
        courseName,
        maxCourseStudents,
        courseImage
      );
      this.prevTeacherId = teacherId;
    } else {
      this.course.name = courseName;
      this.course.teacherId = teacherId;
      this.course.totalStudents = maxCourseStudents;
      this.course.img = courseImage;
    }

    const prevTeacherId = this.prevTeacherId !== -1 ? this.prevTeacherId : this.course.teacherId;
    if (this.isEditing) this.courseService.updateCourse(this.course, prevTeacherId);
    else this.courseService.addCourse(this.course);
    this.canLeave = true;
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.canLeave) return true;

    if (this.courseNameInput == undefined) return true;

    const courseName = this.courseNameInput.nativeElement.value;
    const teacherId = +this.teacherIdInput.nativeElement.value;
    const totalStudents = this.maxStudents.nativeElement.value;
    const courseImage = this.courseImageInput.nativeElement.value;

    if (courseName || teacherId || totalStudents || courseImage)
      return window.confirm('Your progress will be lost');
    return true;
  }
}
