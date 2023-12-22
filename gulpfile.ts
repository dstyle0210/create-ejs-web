import type {ICompilerTask, IWatcherTask, ICopyTask, IServer, ISitemap} from "./gulp_modules/@types/gulpfile.d";
import { task, series } from "gulp";
import * as Config from "./gulp_modules/config"; // gulp 설정 포트 및 폴더 변경 가능

// config
const html = {name:"html",module:"html",options:Config.htmlOptions};
const scss = {name:"scss",module:"scss",options:Config.scssOptions};
const ts = {name:"ts",module:"typescript",options:Config.tsOptions};
const image = {name:"image",module:"image",options:Config.imageOptions};
const lib = {name:"lib",module:"lib",options:Config.libOptions};

// 컴파일 테스크 등록
const compilers = [html,scss,ts];
compilers.forEach((taskItem)=>{
    task(`${taskItem.name}:compiler`,async (done)=>{
        const module:ICompilerTask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.compiler(taskItem.options);
        done();
    });
});


// 감시자 테스크 등록
const watchers = [html,scss,ts,image];
watchers.forEach((taskItem)=>{
    task(`${taskItem.name}:watcher`,async (done)=>{
        const module:IWatcherTask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.watcher(taskItem.options);
        done();
    });
});

// 복사하기 테스크 등록
const copys = [image,lib];
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
const compilerSeries = compilers.map((taskItem)=>taskItem.name+":compiler");
const watcherSeries = watchers.map((taskItem)=>taskItem.name+":watcher");
task("compile",series("lib:copy",...compilerSeries));
task("watch",series(...watcherSeries));


// 사이트맵 생성
task("sitemap:save",async (done)=>{
    const sitemap:ISitemap = await import("./gulp_modules/tasks/sitemap");
    sitemap.save(Config.htmlDistOptions,Config.devServerRoot+"/sitemap.json"); // 개발서버 루트폴더에 저장
    done();
});
task("sitemap",series("html:compiler","sitemap:save"));


// 퍼블시작
task("dev",series("watch","compile","server:dev"));