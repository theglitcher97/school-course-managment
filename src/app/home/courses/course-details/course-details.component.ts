import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from '../../students/student.model';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { StudentService } from '../../students/student.service';
import { CourseStudentsService } from '../../course-students.service';
import { CourseModel } from '../course.model';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course!: CourseModel | undefined;
  courseStudents: StudentModel[] = [];
  students: StudentModel[] = [];
  @ViewChild('studentId') studentSelected!: ElementRef;

  courseStudentsObs!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private courseStudentsService: CourseStudentsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== undefined) {
        this.course = this.courseService.getCourseById(id);
        this.getCourseAndStudents();
      }
    });

    // data coming from the resolver
    this.activeRoute.data.subscribe((data: Data) => {
      console.log('Resolver');
      this.courseStudents = data['courseStudents'] as StudentModel[];
      this.students = this.students.filter(
        (s) => !this.courseStudents.some((cs) => cs.id === s.id)
      );
    });

    this.courseStudentsObs = this.courseStudentsService.courseStudentsUpdated.subscribe(() => {
      if (this.course !== undefined)
        this.getCourseAndStudents();
    });
  }

  private getCourseAndStudents() {
    this.students = this.studentService.getStudents();
    if (this.course !== undefined) {
      this.courseStudents = this.courseStudentsService.getStudentForCourse(
        this.course?.id
      );
    }
    this.students = this.students.filter(
      (s) => !this.courseStudents.some((cs) => cs.id === s.id)
    );
  }

  removeFromCourse(studentId: number) {
    if (this.course == undefined) return;
    this.courseStudentsService.removeStudentFromCourse(this.course.id,studentId);
  }

  onAssignStudentToCourse() {
    const id = +this.studentSelected.nativeElement.value;
    if (this.course == undefined) return;
    this.courseStudentsService.addStudentToCourse(this.course.id, id);
    this.students = this.students.filter((s) => s.id !== id);
  }

  ngOnDestroy(): void {
      this.courseStudentsObs.unsubscribe()
  }
}
