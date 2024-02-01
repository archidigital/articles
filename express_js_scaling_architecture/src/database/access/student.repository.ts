import { StudentModel } from "../models/student/student.model";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import { DatabaseModule } from "../database.module";
import { CreateStudentDto } from "../../business/DTO/student/student.dto";

export interface IStudentRepository {
    find(): Promise<StudentModel[]>;
    save(createStudentDto: CreateStudentDto): Promise<StudentModel>;
}

@Service()
class StudentRepository implements IStudentRepository {
    private _DBContext: DataSource;

    constructor() {
        this._DBContext = DatabaseModule.instance.dataSource;
    }

    public async find(): Promise<StudentModel[]> {
        return await this._DBContext.getRepository(StudentModel).find();
    }

    public async save(createStudentDto: CreateStudentDto): Promise<StudentModel> {
        const student = new StudentModel();

        student.FirstName = createStudentDto.firstName;
        student.LastName = createStudentDto.lastName;
        student.Age = createStudentDto.age;

        return await this._DBContext.getRepository(StudentModel).save(student);
    }
}

export default StudentRepository;
