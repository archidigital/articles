import { StudentModel } from "../../database/models/student/student.model";
import { StudentEntity } from "../entities/student.entity";

export class StudentMapper {
    public static MapStudentEntity(model: StudentModel): StudentEntity {
        return {
            fullName: `${model.FirstName} ${model.LastName}`,
            age: model.Age,
        };
    }
}
