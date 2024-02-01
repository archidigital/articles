import "reflect-metadata";
import AppModule from "./application/app.module";

async function main(): Promise<void> {
    const app = new AppModule();
    await app.bootstrapApplication();
    app.listen();
}

main();
