import { EventEmitter, Injectable } from "@angular/core";
import { CourseModel } from "./course.model";

@Injectable({providedIn: "root"})
export class CourseService {
    public coursesUpdatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    private courses: CourseModel[] = [
        new CourseModel("Lindsay Cole", 'Computer Science', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.elmueble.com%2Fmedio%2F2023%2F05%2F23%2Fgato-somali_714fa25d_230523111547_900x900.jpg&f=1&nofb=1&ipt=a86c7f9b1cbf2b32aea90741017dc83416e110d36a021f4fc0fe653ac9516b56&ipo=images"),
        new CourseModel("Lindsay Cole", 'Physics', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.elmueble.com%2Fmedio%2F2023%2F05%2F23%2Fgato-somali_714fa25d_230523111547_900x900.jpg&f=1&nofb=1&ipt=a86c7f9b1cbf2b32aea90741017dc83416e110d36a021f4fc0fe653ac9516b56&ipo=images"),
        new CourseModel("John Doe", 'English', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2013%2F12%2F12%2F03%2F09%2Fkitten-227011_1280.jpg&f=1&nofb=1&ipt=4df81019512a8919930c705626850ed3e1bd371bb5d1cdf150d4a50fe53b9932&ipo=images"),
        new CourseModel("John Doe", 'French', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2013%2F12%2F12%2F03%2F09%2Fkitten-227011_1280.jpg&f=1&nofb=1&ipt=4df81019512a8919930c705626850ed3e1bd371bb5d1cdf150d4a50fe53b9932&ipo=images"),
        new CourseModel("Mazzy Moi", 'Economic', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffarm2.staticflickr.com%2F1946%2F30689176647_85b85d05b6_o.jpg&f=1&nofb=1&ipt=79084bc9f7ba379f9f2f51500da078f815672341de5f1a092cd44de5c9c1542b&ipo=images"),
        new CourseModel("Mazzy Moi", 'Society', 30, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffarm2.staticflickr.com%2F1946%2F30689176647_85b85d05b6_o.jpg&f=1&nofb=1&ipt=79084bc9f7ba379f9f2f51500da078f815672341de5f1a092cd44de5c9c1542b&ipo=images"),
    ]

    public getCourses(): CourseModel[] {
        return this.courses.slice();
    }

    getCourseById(courseId: number): CourseModel | undefined {
        return this.courses.find(c => c.id === courseId);
    }

    deleteCourse(id: number) {
        this.courses = this.courses.filter(c => c.id !== id);   
    }

    addCourse(course: CourseModel) {
       this.courses.unshift(course);
       this.coursesUpdatedEvent.next(true);
    }
}

