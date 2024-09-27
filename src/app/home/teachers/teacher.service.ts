import { EventEmitter, Injectable } from "@angular/core";
import { TeacherModel } from "./teacher.model";

@Injectable()
export class TeacherService {
    public teacherUpdatedEvent: EventEmitter<TeacherModel> = new EventEmitter<TeacherModel>();
   
    private teachers: TeacherModel[] = [
        new TeacherModel("Fernando", "Orozco", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.bg6ge_Og9wjOvsxM2dkkWgHaGz%26pid%3DApi&f=1&ipt=6f9a19311eeab46c9afde97b4b7a0b8da5a77b39c3627229a02c97b557480983&ipo=images"),
        new TeacherModel("Valentina", "Solis", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Jdx85dYNgspN9EOjyCihfwHaE8%26pid%3DApi&f=1&ipt=75e2f0f26d6ac40df211305e534c35cdcb4268d4e6786cd93bbbcbcf5ed0a285&ipo=images"),
        new TeacherModel("Claudia", "Diaz", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.12nPg3IqGdh0qxl7mFLwFAAAAA%26pid%3DApi&f=1&ipt=301282f3d506aa2bfb6079b5df1e96691b15d0b9838ea37374bbc2dc562bd613&ipo=images"),
        new TeacherModel("Jhon", "Cerna", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tei9Vsc8styOGZ9nN0I3RAAAAA%26pid%3DApi&f=1&ipt=3c0d7f56fe172f37dd65678507bcca10b5b847645d898e73849bf25903e7269c&ipo=images"),
        new TeacherModel("Nestor", "Castilla", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tei9Vsc8styOGZ9nN0I3RAAAAA%26pid%3DApi&f=1&ipt=3c0d7f56fe172f37dd65678507bcca10b5b847645d898e73849bf25903e7269c&ipo=images"),
        new TeacherModel("Vanessa", "Merlene", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn9.dissolve.com%2Fp%2FD2115_185_363%2FD2115_185_363_1200.jpg&f=1&nofb=1&ipt=ab3885ba018bf6b6217b13cfe89c184377cefa3e7b26e094224892b179fa69fb&ipo=images"),
    ]

    public getTeachers() {
        return this.teachers.slice();
    }

    getTeacherById(teacherId: number) {
        return this.teachers.slice().find((t: TeacherModel) => t.id === teacherId);
    }

    save(teacher: TeacherModel) {
      this.teachers.unshift(teacher);
    }

    update(id: number, teacher: TeacherModel) {
      const oldTeacherIndex = this.teachers.findIndex(t => t.id === id);
      if (oldTeacherIndex === -1) return;
      this.teachers.splice(oldTeacherIndex, 1, teacher);
      this.teacherUpdatedEvent.next(teacher);
    }
    
}