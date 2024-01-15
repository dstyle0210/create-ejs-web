/**
 * 가이드 생성 : md to html
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2024.01.02 : Mabongpapa : 최초생성
 */
import path from "path";
import fs from "fs";
import glob from "fast-glob";
import {src,watch,dest} from "gulp";
import marked from "marked";
import * as Config from "../config"; // 해당 포트 및 폴더 변경 가능
import timeStamp from "../util/getTimeStamp";
import getSrcDist from "../util/getSrcDist";
import pretty from "pretty";
import cEjs from "../util/customEjsToEjs";

const getSrcRelative = (srcPath:string) => path.relative(path.dirname(srcPath),path.resolve(__dirname,"../../","src")).replace(/\\/gi,"/");
const mdToEjsHtml = (options:{src:string,dist:string},callerName?:string):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        const headerRaw = fs.readFileSync(Config.guideHeader,"utf8"); // 가이드 헤더파일
        const footerRaw = fs.readFileSync(Config.guideFooter,"utf8"); // 가이드 풋터파일
        const {src,dist} = options;
        const srcRelative = getSrcRelative(src); // 소스파일 경로 부터, 소스루트경로(./src) 까지의 "상대경로" 위치

        // md 원본 추출
        const mdRaw = fs.readFileSync(src,"utf8");

        // markdown to customEjs 처리.
        let cEjsRaw = await marked.parse(mdRaw); // md to html
        cEjsRaw = cEjsRaw.replace(/\.md/gi,".html");  // md주소는 html 주소로 변경한다.

        // custom Ejs 를 순수 Ejs로 변경.
        let htmlRaw = cEjs((headerRaw+"\n"+cEjsRaw +"\n"+footerRaw)); // 완전한 가이드 ejs 파일 생성
        htmlRaw = htmlRaw.replace(/\@src\//g,srcRelative+"/") // @src 주소는 상대경로로 변경한다.
        
        // 가이드 변환 파일 저장
        fs.mkdirSync(path.dirname(dist),{recursive:true}); // 저장할 폴더 생성
        fs.writeFileSync(dist,htmlRaw,"utf8");
        console.log(`${timeStamp().task}[${callerName}] ${options.src}`);

        resolve();
    });
}

const getMatchText = (str:string,reg:RegExp) => str.match(reg) ? str.match(reg)[0] : "null";
const crawler = async (options:{base:string,src:string|string[]}):Promise<{name:string,devUrl:string,buildUrl:string}[]> => {
    const guideMap:{name:string,devUrl:string,buildUrl:string}[] = [];
    const addGuideMapp = (name:string,pageOption:{
            devUrl:string,
            buildUrl:string
        }) => {
            guideMap.push({
                name,
                devUrl:pageOption.devUrl.replace(options.base,""),
                buildUrl:pageOption.buildUrl.replace(options.base,"")
            });
        };

    const srcs = await glob(options.src);
    for await (const src of srcs){
        // md 원본 추출
        const mdRaw = fs.readFileSync(src,"utf8");
        const name = getMatchText(mdRaw,/(\#\s)(.+)/g).replace("# ","");
        addGuideMapp(name,{
            devUrl:src.replace(".md",".html"),
            buildUrl:src.replace(".md",".html"),
        })
    };
    return guideMap;
};
export const save = async (options:{base:string,src:string|string[]},jsonSavePath:string):Promise<void> => {
    const pageMap = await crawler(options);
    fs.mkdirSync(path.dirname(jsonSavePath),{recursive:true}); // 저장할 폴더 생성
    fs.writeFileSync(jsonSavePath,JSON.stringify(pageMap),"utf8"); // 파일 저장
    console.log(`${timeStamp().task}[Guide:save] ${pageMap.length} page crawlings`);
}


export const libCopy = () => {
    return src(Config.guideOptions.base+"/**/*.{css,js}").pipe(dest(Config.guideOptions.dist));
}

export const compiler = async (options:{base:string,src:string|string[],dist:string}):Promise<void> => {
    const srcs = await glob(options.src);
    for await (const srcPath_ of srcs){
        const {src , dist} = getSrcDist({base:options.base,dist:options.dist,src:srcPath_});
        const save = dist.replace(/((.md)|(.ejs))$/g,".html"); // 저징될 경로(파일명 포함) , .md, .ejs 인경우, .html로 변환 됨.
        await mdToEjsHtml({src,dist:save},"Guide:Compiler");
    };

    await crawler(options);
};

export const watcher = (options:{base:string,src:string|string[],dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        watch(options.src,{usePolling:true}).on("change",async (path)=>{
            const {src,dist} = getSrcDist(Object.assign(options,{src:path}));
            const save = dist.replace(/((.md)|(.ejs))$/g,".html"); // 저징될 경로(파일명 포함) , .md, .ejs 인경우, .html로 변환 됨.
            await mdToEjsHtml({src,dist:save},"Guide:Watcher");
        }).on("ready",()=>{
            console.log(`${timeStamp().task}[Guide:Watch] Ready`);
            resolve();
        });
    });
};

export const dist = (options:{base:string,src:string|string[],dist:string}):Promise<void> => {
    return new Promise((resolve,reject) => {
        src(options.src,{base:options.base})
        // TODO : 디플로이 변환로직 추가 필요.
        .pipe(dest(options.dist))
        .on("end",()=>{
            resolve();
        })
    });
}