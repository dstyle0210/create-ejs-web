/**
 * SCSS 컴파일 및 감시자
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import path from "path";
import fs from "fs";
import {src , dest , watch} from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "sass";
import glob from "fast-glob";
import csso from "gulp-csso";
import csscomb from "gulp-csscomb";
import replace from "gulp-replace";
import timeStamp from "../util/getTimeStamp";

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

export const compiler = async (options:{base:string,src:string|string[],dist:string}):Promise<void> => {
    const srcs = await glob(options.src);
    const distPath = path.normalize(options.dist).replace(/\\+/g,"/");
    for await (const srcPath_ of srcs){
        const srcPath = path.normalize(srcPath_).replace(/\\+/g,"/");
        await scssGulpPipe({src:srcPath,dist:distPath},"SCSS:Compiler");
    };
};

export const watcher = (options:{base:string,src:string,dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        const srcs = await glob(options.src);
        const distPath = path.normalize(options.dist).replace(/\\+/g,"/");
        let watchList:{srcPath:string,entryPath:string}[] = [];
        for await (const srcPath_ of srcs){
            const srcPath = path.normalize(srcPath_); // 엔트리 파일경로
            watchList = watchList.concat( await addWatchList(srcPath) ); // import 목록 가져옴
        };
        const srcPaths = watchList.map((srcDist) => srcDist.srcPath); // watch 할 파일목록 (엔트리 및 엔트리에 등록된 모든 scss 파일)
        watch(srcPaths,{usePolling:true}).on("change",async (srcPath)=>{
            const entrys_ = watchList.filter((srcEntry)=> srcEntry.srcPath == srcPath ).map((srcEntry)=>{
                return {
                    base:path.dirname(srcEntry.entryPath),
                    src:srcEntry.entryPath,
                    dist:distPath
                };
            });
            for(let options of entrys_){
                await scssGulpPipe(options,"SCSS:Watcher");
            };
        }).on("ready",()=>{
            console.log(`${timeStamp().task}[SCSS:Watch] Ready`);
            resolve();
        });
    });
};

const addWatchList = async (entryPath:string):Promise<{srcPath:string,entryPath:string}[]> => {
    const result:{srcPath:string,entryPath:string}[] = [];
    const entryBase = path.dirname(entryPath);
    const entryRaw = fs.readFileSync(entryPath,"utf8"); // 엔트리 SCSS의 원문 가져오기
    const importList = entryRaw.match(/(@import ")(.*d?)(")/gi); // 원문에서 import 목록 가져오기
    result.push({
        srcPath:entryPath.replace(/\\/gi,"/"),
        entryPath:entryPath.replace(/\\/gi,"/")
    });
    if(importList){
        importList.forEach((importPath)=>{
            const src = importPath.replace(/(@import)|(")|(\s)/gi,"");
            const localSrcPath = path.join(entryBase,src); // 엔트리 기준, 호출되는 위치를 C:// 하위로 정리
            const srcPath = path.relative("./",localSrcPath);
            result.push({
                srcPath:srcPath.replace(/\\/gi,"/"),
                entryPath:entryPath.replace(/\\/gi,"/")
            });
        });
    };
    return result;
}

const scssGulpPipe = async (options:{src:string,dist:string},callerName?:string):Promise<void> => {
    const sass = gulpSass(nodeSass);
    await new Promise((resolve,reject) => {
        src(options.src)
        .pipe(sass())
        .pipe(csscomb("./zen.json"))
        .pipe(csso())
        .pipe(replace(/}/g,"}\n"))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(replace('"UTF-8";','"UTF-8";\n'))
        // keyframe or rgba 코드 줄바꿈 처리
        .pipe(replace(/\}\n\}/g,'} }'))
        .pipe(replace(/\}\nto{/g,'} to {'))
        .pipe(replace(/\n([0-4]+\%)\{/g,'$1{'))
        .pipe(replace(/\n(\.[0-9]+)\)/g,'$1)'))
        .pipe(replace(/(;@import)/g,';\n@import'))
        .pipe(replace(/(;\*,)/g,';\n*,'))
        .pipe(replace(/(} })/g,'}\n}')) // 미디어쿼리, 키프레임이 있는경우, 줄바꿈 처리
        .pipe(replace(/(\t\.)/g,'.')) // 미디어쿼리 이후, 첫번째 클래스 또는 아이디에 대하여 탭 삭제처리
        .pipe(replace(/\{([0-9])/g,'{\n$1')) // 키프레임이 이후, 첫번째 범위가 숫자 인경우 줄바꿈 처리
        .pipe(dest(options.dist))
        .on("end",()=>{
            console.log(`${timeStamp().task}[${callerName}] ${options.src}`);
            resolve("");
        });
    });
};