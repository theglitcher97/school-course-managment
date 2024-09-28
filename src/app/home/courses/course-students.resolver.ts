import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { StudentModel } from "../students/student.model";
import { Observable } from "rxjs";
import { CourseStudentsService } from "../course-students.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CourseStudentsResolver implements Resolve<StudentModel[]> {
    constructor(private courseStudentsService: CourseStudentsService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): StudentModel[] | Observable<StudentModel[]> | Promise<StudentModel[]> {
        const id = +route.params["id"];
        if (id === undefined)
            return [];
        return this.courseStudentsService.getStudentForCourse(id);
    }
}