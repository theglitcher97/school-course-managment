export class TeacherModel {
  private static COURSE_COUNTER = 0;

  public id!: number;
  public teacherCode!: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public img: string
  ) {
    this.id = TeacherModel.COURSE_COUNTER++;
    this.teacherCode = getTeacherCode();
  }
}

function getTeacherCode(): string {
    let code = "1";
    for (let i = 0; i < 5; i++) {
        code += Math.ceil(Math.random() * 10);
    }
    return code;
}

