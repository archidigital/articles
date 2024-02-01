import express, { Application } from "express";
import { useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import { DataSource } from "typeorm";
import { StudentsController } from "../api/controllers/students.controller";
import StudentRepository from "../database/access/student.repository";
import { DatabaseModule, DB_OPTIONS } from "../database/database.module";
import { StudentsService } from "../services/student.service";

class AppModule {
    private _app: Application;

    constructor() {
        this._app = express();
    }

    private async initializeDatabase(): Promise<DataSource> {
        const databaseInstance = DatabaseModule.instance;
        return await databaseInstance.initializeDataSource(DB_OPTIONS);
    }


    private injectDependencies(): void {
        useContainer(Container);

        //** repositories */
        Container.set("studentRepositoryToken", Container.get(StudentRepository));

        //** services */
        Container.set("studentsServiceToken", Container.get(StudentsService));

        //** controllers */
        useExpressServer(this._app, {
            controllers: [StudentsController]
        });
    }

    public async bootstrapApplication(): Promise<void> {
        await this.initializeDatabase();

        this.injectDependencies();
    }

    public listen(): void {
        this._app.listen(8000, () => console.log("Server started"));
    }
}

export default AppModule;