import type {ITask, IServer, ICopyTask} from "./gulp_modules/@types/gulpfile.d";
import { task, series } from "gulp";
import * as Config from "./gulp_modules/config"; // gulp 설정 포트 및 폴더 변경 가능

// Gulp Tasks 목록
const compilers = [
    {name:"html",module:"html",options:Config.htmlOptions}, // gulp html:compile
    {name:"scss",module:"scss",options:Config.scssOptions}, // gulp scss:compile
    {name:"ts",module:"typescript",options:Config.tsOptions} // gulp ts:compile
];
compilers.forEach((taskItem)=>{
    task(`${taskItem.name}:compile`,async (done)=>{
        const module:ITask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.compiler(taskItem.options);
        done();
    });
});

// Gulp Copy Tasks
const copys = [
    {name:"lib",module:"lib",options:Config.libOptions} // gulp lib:copy
];
copys.forEach((taskItem)=>{
    task(`${taskItem.name}:copy`,async (done)=>{
        const module:ICopyTask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.copy(taskItem.options);
        done();
    });
});


// 서버실행
task("server:dev",async (done)=>{
    const server:IServer = await import("./gulp_modules/servers/server");
    await server.dev(Config.devServerOptions);
    done();
});


// 실무용 통합 Task
const compileSeries = compilers.map((taskItem)=>taskItem.name+":compile");
task("compile",series(...compileSeries));
task("dev",series("lib:copy","compile","server:dev"));