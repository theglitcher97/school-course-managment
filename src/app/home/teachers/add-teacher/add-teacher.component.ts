import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeacherModel } from '../teacher.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from '../add-teacher.can-deactivate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent
  implements OnInit, AfterViewInit, CanComponentDeactivate
{
  public firstName!: string;
  public lastName!: string;
  public img!: string;
  private teacher!: TeacherModel | undefined;

  constructor(
    private teacherService: TeacherService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((param: Params) => {
      const id = +param['id'];
      if (id === undefined) return;

      this.teacher = this.teacherService.getTeacherById(id);
      if (this.teacher === undefined) return;

      this.firstName = this.teacher.firstName;
      this.lastName = this.teacher.lastName;
      this.img = this.teacher.img;
    });
  }

  onSaveTeacher() {
    if (this.teacher !== undefined) {
      this.teacher.firstName = this.firstName;
      this.teacher.lastName = this.lastName;
      this.teacher.img = this.img;
      this.teacherService.update(this.teacher.id, this.teacher);
    } else {
      this.teacher = new TeacherModel(this.firstName, this.lastName, this.img);
      this.teacherService.save(this.teacher);
    }
    this.router.navigate(['..'], { relativeTo: this.activeRoute });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.firstName || this.lastName || this.img)
      return window.confirm("Your progress will be lost")
    return false;
  }
}
