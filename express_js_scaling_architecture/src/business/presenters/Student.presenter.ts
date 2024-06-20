import { StudentModel } from "../../database/models/student/student.model";
import { StudentEntity } from "../entities/student.entity";

export class StudentPresenter {
    public static GetStudentEntity(model: StudentModel): StudentEntity {
        return {
            fullName: `${model.FirstName} ${model.LastName}`,
            age: model.Age,
        };
    }
}
