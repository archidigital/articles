import { DataSource, DataSourceOptions } from "typeorm";
import { StudentModel } from "./models/student/student.model";
import dotenv from "dotenv";

dotenv.config();

const CONFIG_POSTGRES = {
    host: "localhost",
    port: parseInt(process.env.POSTGRES_PORT ?? "0"),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
};

export const DB_OPTIONS: DataSourceOptions = {
    type: "postgres",
    host: CONFIG_POSTGRES.host,
    port: CONFIG_POSTGRES.port,
    username: CONFIG_POSTGRES.user,
    password: CONFIG_POSTGRES.password,
    database: CONFIG_POSTGRES.database,
    entities: [StudentModel],
    synchronize: true,
};

export class DatabaseModule {
    private _dataSource: DataSource;
    private static _instance: DatabaseModule;

    private constructor() {}

    public async initializeDataSource(options: DataSourceOptions): Promise<DataSource> {
        this._dataSource = new DataSource(options);
        return await this._dataSource.initialize();
    }

    public static get instance(): DatabaseModule {
        if (!this._instance) this._instance = new DatabaseModule();

        return this._instance;
    }

    public get dataSource(): DataSource {
        return this._dataSource;
    }
}

export const DefaultDataSource = new DataSource(DB_OPTIONS); // this export is needed for database migrations scripts
