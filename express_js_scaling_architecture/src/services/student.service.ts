import { Inject, Service } from "typedi";
import { CreateStudentDto } from "../business/DTO/student/student.dto";
import { StudentEntity } from "../business/entities/student.entity";
import { StudentPresenter } from "../business/presenters/Student.presenter";
import { IStudentRepository } from "../database/access/student.repository";

export interface IStudentsService {
    findAll(): Promise<StudentEntity[]>;
    create(createStudentDto: CreateStudentDto): Promise<StudentEntity>;
}

@Service()
export class StudentsService implements IStudentsService {
    constructor(@Inject("studentRepositoryToken") protected _studentRepository: IStudentRepository) {}

    async findAll(): Promise<StudentEntity[]> {
        const students = await this._studentRepository.find();
        return students.map((student) => StudentPresenter.GetStudentEntity(student));
    }

    async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        const student = await this._studentRepository.save(createStudentDto);
        return StudentPresenter.GetStudentEntity(student);
    }
}
