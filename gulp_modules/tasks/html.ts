/**
 * HTML(ejs) 컴파일러
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import type {IServer} from "../@types/gulpfile.d";
import path from "path";
import fs from "fs";
import glob from "fast-glob";
import {watch} from "gulp";
import timeStamp from "../util/getTimeStamp";
import getSrcDist from "../util/getSrcDist";
import request from "request";
import {crawler} from "./sitemap"; // dist 목록 가져오기
import * as Config from "../config"; // 해당 포트 및 폴더 변경 가능
import findPidFromPort from "../util/findPidFromPort";
import asyncRequest from "../util/asyncRequestPrettyHtml"; // URL to HTML


// 시작시 전체 컴파일용
export const compiler = async (options:{src:string,base:string,dist:string}) => {
    const srcs = await glob(options.src);
    const distPath = path.join(__dirname,path.relative(__dirname,"./"),options.dist);
    for await (const srcPath_ of srcs){
        const srcDist = getSrcDist(Object.assign(options,{src:srcPath_}));
        await ejsCompileToHtml(srcDist,"HTML:Compiler");
    };
};

// 감시자 적용
export const watcher = (options:{base:string,src:string,dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        watch(options.src,{usePolling:true}).on("change",async (path)=>{
            const srcDist = getSrcDist(Object.assign(options,{src:path}));
            await ejsCompileToHtml(srcDist,"HTML:Watcher");
        }).on("ready",()=>{
            console.log(`${timeStamp().task}[HTML:Watch] Ready`);
            resolve();
        });
    });
};

// 1개씩 처리하는 함수(내부 코어용)
const ejsCompileToHtml = async (options:{src:string,dist:string},callerName?:string) => {
    const isPage = (options.src.indexOf("/pages/") != -1); // 페이지 내 html(ejs) 여부
    const htmlRaw = fs.readFileSync(options.src,{encoding:"utf8",flag:"r"}); // html(ejs) 원문
    const distPath = options.dist.replace(".ejs",".html"); // 저징될 경로(파일명 포함) , .ejs 인경우, .html로 변환 됨.

    let _htmlRaw = htmlRaw
        .replace(/(<include)\s*(src=("|'))(.+)("|')\s*(options=("|'))(.+)(("|'))\s*(\/)?(>)(<\/include>)?/gi,"<%-include(`$4`,$8) %>") // 옵션이 포함된 인클루드 구문 변환
        .replace(/(<include)\s*(src=("|'))(.+)("|')\s*(\/)?(>)(<\/include>)?/gi,"<%-include(`$4`) %>") // 옵션이 없는 인클루드 구문 변환
        .replace(/(include')(.+)(.ejs)(')/gi,"$1$2.html$4"); // ejs로 로드 했을경우, html파일로 변환
    if(!isPage) _htmlRaw.replace(/(<!-- HTMLDOC)((?!-->)[\n\d\D])*(-->)/gi,""); // 페이지가 아니라면, HTMLDOC 삭제

    fs.mkdirSync(path.dirname(distPath),{recursive:true}); // 저장할 폴더 생성
    fs.writeFileSync(distPath,_htmlRaw,{encoding:"utf8"}); // 파일 저장
    console.log(`${timeStamp().task}[${callerName}] ${options.src}`);
    return;
}


// 시작시 전체 컴파일용
export const dist = (options:{src:string,base:string,dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject) => {
        const pageMap = await crawler(options);

        // 개발서버 실행(기존에 실행되어 있다면 미동작)
        let pid = await findPidFromPort(Config.devPort); // 서버실행 여부 확인
        let isDevServerReady = !!pid; // 서버가 있다면 true , 없으면 false.
        if(!isDevServerReady){ // 서버가 없었으면 실행 시킨다.
            const server:IServer = await import("../servers/server");
            await server.dev({root:options.base,port:Config.devPort});
        };
        
        for await (const page of pageMap){
            const url = `http://localhost:${Config.devPort}${page.devUrl}`;
            const htmlRaw = await asyncRequest(url);
            const buildPath = Config.buildServerRoot+page.buildUrl;
            fs.mkdirSync(path.dirname(buildPath),{recursive:true});
            fs.writeFileSync(buildPath,htmlRaw,"utf8");
            console.log(`${timeStamp().task}[html:dist] ${buildPath}`);
        };

        if(!isDevServerReady){
            pid = await findPidFromPort(Config.devPort); // 서버실행 여부 확인
            setTimeout(()=>{
                console.log(`${timeStamp().task}[html:dist] process.kill , port ${Config.devPort}`);
                process.kill(pid);
            },2000);
        };

        resolve();
    });
};