import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CanDeactivateComponent } from '../../teachers/add-teacher.can-deactivate';
import { Observable } from 'rxjs';
import { StudentModel } from '../student.model';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements CanDeactivateComponent, OnInit {
  public firstName!: string;
  public lastName!: string;
  public img!: string;
  private student!: StudentModel | undefined;

  constructor(
    private StudentService: StudentService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = +params['id']; 
      if (id !== undefined) {
        this.student = this.StudentService.getStudentById(id);
        if (this.student !== undefined) {
          this.firstName = this.student.firstName;
          this.lastName = this.student.lastName;
          this.img = this.student.img;
        }
      }

    })
    
  }

  onSaveStudent() {
    if (this.student == undefined) {
      this.student = new StudentModel(this.firstName, this.lastName, this.img);
      this.StudentService.save(this.student);
      this.student = undefined;
    } else {
      this.student.firstName = this.firstName;
      this.student.lastName = this.lastName;
      this.student.img = this.img;
      this.StudentService.update(this.student.id, this.student);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // TODO
    return true;
  }
}
