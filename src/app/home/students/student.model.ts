export class StudentModel {
    private static COURSE_COUNTER = 0;
  
    public id!: number;
  
    constructor(
      public firstName: string,
      public lastName: string,
      public career: string,
      public img: string
    ) {
      this.id = StudentModel.COURSE_COUNTER++;
    }
  }
  
  
  