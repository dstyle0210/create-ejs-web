/**
 * sitemap 구하기
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.22 : Mabongpapa : 최초생성
 */
import path from "path";
import fs from "fs";
import glob from "fast-glob";
import timeStamp from "../util/getTimeStamp";

const getMatchText = (str:string,reg:RegExp) => str.match(reg) ? str.match(reg)[0] : "null";
const getMatchArray = (str:string,reg:RegExp) => str.match(reg) ? str.match(reg) : [];
export const crawler = async (options:{base:string,src:string|string[]}):Promise<{name:string,devUrl:string,buildUrl:string}[]> => {
    const pageMap:{name:string,devUrl:string,buildUrl:string}[] = [];
    const addPageMapp = (name:string,devUrl:string,buildUrl:string) => {
        pageMap.push({
            name,
            devUrl:devUrl.replace(options.base,""),
            buildUrl:buildUrl.replace(options.base,"")
        });
    };

    const srcs = await glob(options.src);
    for await (const src of srcs){
        const srcPath = "./"+path.relative("./",src).replace(/\\/g,"/");
        const htmlRaw = fs.readFileSync(srcPath,"utf8");
        const htmlDoc = getMatchText(htmlRaw,/^(<!-- PAGEDOC)((?!-->).|[\r\n])+(-->)/g);
        const pageName = getMatchText(htmlDoc,/@page (.)+/).replace("@page ","");
        
        // 기본 페이지 정보
        addPageMapp(pageName,srcPath,srcPath);

        // 파라매터별 페이지 정보
        const caseBys = getMatchArray(htmlDoc,/@caseby (.)+/gi);
        caseBys.forEach((caseBy,idx)=>{
            let [caseUrl,caseName] = caseBy.replace(/(@caseBy)\s/gi,"").split("//");
            const buildUrl = caseUrl.trim().replace(/\?.+/gi,"").replace(".html","-"+idx+".html");
            addPageMapp(pageName+ " > "+(caseName || "null").trim(),caseUrl.trim(),buildUrl);
        });
    };
    return pageMap;
};

export const save = async (options:{base:string,src:string|string[]},jsonSavePath:string):Promise<void> => {
    const pageMap = await crawler(options);
    fs.mkdirSync(path.dirname(jsonSavePath),{recursive:true}); // 저장할 폴더 생성
    fs.writeFileSync(jsonSavePath,JSON.stringify(pageMap),"utf8"); // 파일 저장
    console.log(`${timeStamp().task}[Sitemap:save] ${pageMap.length} page crawlings`);

}

import type {IServer} from "../@types/gulpfile.d";
import * as Config from "../config"; // 해당 포트 및 폴더 변경 가능
import findPidFromPort from "../util/findPidFromPort";
import request from "request";
export const dist = async (sitemapHtml:string):Promise<void> => {
    let pid = await findPidFromPort(Config.sitemapPort); // 서버실행 여부 확인
    let isDevServerReady = !!pid; // 서버가 있다면 true , 없으면 false.
    if(!isDevServerReady){ // 서버가 없었으면 실행 시킨다.
        const server:IServer = await import("../servers/server");
        await server.dev({root:Config.devServerRoot,port:Config.sitemapPort});
    };
    const url = `http://localhost:${Config.sitemapPort}${sitemapHtml.replace(Config.devServerRoot,"")}`;
    const fileName = path.basename(url);
    const htmlRaw = await asyncRequest(url);
    fs.writeFileSync(Config.buildServerRoot+"/"+fileName,htmlRaw,"utf8");

    if(!isDevServerReady){
        setTimeout(()=>{
            console.log(`${timeStamp().task}[sitemap:dist] process.kill , port ${Config.sitemapPort}`);
            process.kill(pid);
        },2000);
    };
}

const asyncRequest = (url:string):Promise<string> => {
    return new Promise((resolve,reject)=>{
        request(url,(error,response,body)=>{
            // TODO : 디플로이 로직 추가필요.
            resolve(body);
        });
    });
}