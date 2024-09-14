export class CourseModel {
  private static COURSE_COUNTER = 0;

  public id!: number;
  constructor(
    public teacher: string,
    public name: string,
    public totalStudents: number,
    public img: string,
  ) {
    this.id = CourseModel.COURSE_COUNTER++
  }

}
