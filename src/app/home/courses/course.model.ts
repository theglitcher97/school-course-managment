export class CourseModel {
  private static COURSE_COUNTER = 0;

  public id!: number;
  public teacher!: {
    name: string;
    code: string;
  };

  constructor(
    public teacherId: number,
    public name: string,
    public totalStudents: number,
    public img: string
  ) {
    this.id = CourseModel.COURSE_COUNTER++;
  }
}
