export class CourseModel {
  constructor(
    public id: number,
    public teacher: string,
    public name: string,
    public totalStudents: number,
    public img: string,
  ) {}
}
