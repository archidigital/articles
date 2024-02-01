import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Students" })
export class StudentModel {
    @PrimaryGeneratedColumn("uuid")
    UID: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Age: number;
}
