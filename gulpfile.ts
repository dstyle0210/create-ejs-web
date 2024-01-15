import type {ICompilerTask, IWatcherTask, ICopyTask, IServer, ISitemap,IDistTask} from "./gulp_modules/@types/gulpfile.d";
import { task, series } from "gulp";
import * as Config from "./gulp_modules/config"; // gulp 설정 포트 및 폴더 변경 가능

// config
const html = {name:"html",module:"html",options:Config.htmlOptions,dists:Config.htmlDistOptions};
const scss = {name:"scss",module:"scss",options:Config.scssOptions,dists:Config.cssDistOptions};
const ts = {name:"ts",module:"typescript",options:Config.tsOptions,dists:Config.jsDistOptions};
const image = {name:"image",module:"image",options:Config.imageOptions,dists:Config.imageDistOptions};
const lib = {name:"lib",module:"lib",options:Config.libOptions};
const guide = {name:"guide",module:"guide",options:Config.guideOptions,dists:Config.guideDistOptions};

// 컴파일 테스크 등록
const compilers = [html,scss,ts,guide];
compilers.forEach((taskItem)=>{
    task(`${taskItem.name}:compiler`,async (done)=>{
        const module:ICompilerTask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.compiler(taskItem.options);
        done();
    });
});


// 감시자 테스크 등록
const watchers = [html,scss,ts,image,guide];
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
task("guide:libCopy",async (done)=>{
    const module = await import("./gulp_modules/tasks/guide");
    await module.libCopy();
    done();
});

// 산출물 빌드
const dists = [html,scss,ts,image,guide];
dists.forEach((taskItem)=>{
    task(`${taskItem.name}:dist`,async (done)=>{
        const module:IDistTask = await import("./gulp_modules/tasks/"+taskItem.module);
        await module.dist(taskItem.dists);
        done();
    });
});

// 서버실행
task("server:dev",async (done)=>{
    const server:IServer = await import("./gulp_modules/servers/server");
    await server.dev(Config.devServerOptions);
    done();
});

// 사이트맵 생성
task("sitemap:save",async (done)=>{
    const sitemap:ISitemap = await import("./gulp_modules/tasks/sitemap");
    await sitemap.save(Config.htmlDistOptions,Config.sitemapJson); // 개발서버 루트폴더(.pub)에 저장된다.
    done();
});
task("sitemap:dist",async (done)=>{
    const sitemap:{dist:(sitemapHtml:string)=>Promise<void>} = await import("./gulp_modules/tasks/sitemap");
    await sitemap.dist(Config.sitemapHtml); // 개발서버 사이트맵 주소
    done();
});
task("sitemap",series("html:compiler","sitemap:save"));

// 실무용 통합 Task
const compilerSeries = compilers.map((taskItem)=>taskItem.name+":compiler");
const watcherSeries = watchers.map((taskItem)=>taskItem.name+":watcher");
task("compile",series("lib:copy","guide:libCopy",...compilerSeries,"image:copy"));
task("watch",series(...watcherSeries));

// 퍼블시작
task("dev",series("watch","guide:compiler","compile","sitemap:save","server:dev"));

// 통합빌드
task("html:build",series("html:compiler","html:dist"));
task("scss:build",series("scss:compiler","scss:dist"));
task("ts:build",series("ts:compiler","ts:dist"));
task("image:build",series("image:copy","image:dist"));
task("guide:build",series("guide:compiler","guide:dist"));
task("dist",series("html:dist","scss:dist","ts:dist","image:dist","guide:dist"));
task("build",series("compile","sitemap:save","dist","sitemap:dist","guide:build"));