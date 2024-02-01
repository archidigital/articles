import { Inject, Service } from "typedi";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { StudentEntity } from "../../business/entities/student.entity";
import { IStudentsService } from "../../services/student.service";
import { CreateStudentDto } from "../../business/DTO/student/student.dto";

@JsonController("/students")
@Service()
export class StudentsController {
    constructor(@Inject("studentsServiceToken") protected _studentsService: IStudentsService) {}

    @Get("/")
    public async findAll(): Promise<StudentEntity[]> {
        const students = await this._studentsService.findAll();
        return students;
    }

    @Post("/")
    public async create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        const student = await this._studentsService.create(createStudentDto);
        return student;
    }
}
