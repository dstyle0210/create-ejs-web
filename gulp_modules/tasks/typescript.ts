/**
 * Typescript 컴파일 및 감시자
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import fs from "fs";
import path from "path";
import glob from "fast-glob";
import {src , dest , watch} from "gulp";
import babel from "gulp-babel";
import replace from "gulp-replace";
import concat from "gulp-concat";
import timeStamp from "../util/getTimeStamp";

export const dist = (options:{src:string,base:string,dist:string}):Promise<void> => {
    return new Promise((resolve,reject) => {
        src(options.src,{base:options.base})
        // TODO : 디플로이 변환로직 추가 필요.
        .pipe(dest(options.dist))
        .on("end",()=>{
            resolve();
        })
    });
};

// 공통 함수
const _jsDocRegs = new RegExp(/(\/\*)(\**)(\s*)((?!\*\/).(\s*))+(\s*)(\*\/)/,"gim"); // jsdoc,tsdoc 삭제용 정규식
const _inlineComment = new RegExp(/(\/\/)(\s)*((?!shoppingflv)(?!img).|\d+)+/,"gi"); // 한줄 주석(//) 처리삭제용 정규식
const _importsRegs = new RegExp(/@?import ('|")(.*d?)('|")(;)?/,"gi"); // import 구문 구해오기

export const compiler = async (options):Promise<void> => {
    const srcs = await glob(options.src);
    const distPath = path.normalize(options.dist).replace(/\\+/g,"/");
    for await (const srcPath_ of srcs){
        const srcPath = path.normalize(srcPath_).replace(/\\+/g,"/");
        await tsGulpPipe({src:srcPath,dist:distPath},"TS:Compiler");
    };
}

export const watcher = async (options):Promise<void> => {
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
                await tsGulpPipe(options,"TS:Watcher");
            };
        }).on("ready",()=>{
            console.log(`${timeStamp().task}[TS:Watch] Ready`);
            resolve();
        });
    });
};
const addWatchList = async (entryPath:string):Promise<{srcPath:string,entryPath:string}[]> => {
    const result = [];
    const entryBase = path.dirname(entryPath);
    const importList = await getTsImportList({src:entryPath});
    result.push({
        srcPath:entryPath.replace(/\\+/g,"/"),
        entryPath:entryPath.replace(/\\+/g,"/")
    });
    importList.forEach((importPath)=>{
        result.push({
            srcPath:importPath,
            entryPath:entryPath.replace(/\\+/g,"/")
        })
    });
    return result;
}

// ts 엔트리 파일을 js파일로 변환하기
const tsGulpPipe = async (options:{src:string,dist:string},callerName?:string):Promise<void> => {
    await new Promise(async (resolve,reject) => {
        const importList = await getTsImportList(options); // 엔트리ts 파일 내 import 된 파일 목록 가져오기
        const tsSrc = [options.src,...importList]; // 엔트리 파일 및 임폴트된 파일 전체 목록을 가져온다.
        src(tsSrc)
        .pipe(concat( path.basename(options.src) )) // 엔트리 이름으로 합치기
        .pipe(replace(_jsDocRegs,"")) // jsdoc 형식 지우기
        .pipe(replace(_inlineComment,"")) // 한줄 주석 지우기
        .pipe(replace(_importsRegs,""))// import 구문 지우기
        .pipe(babel({presets: ["@babel/preset-typescript"]})) // ts to js
        .on("error",(e)=>{
            console.log(e);
            reject();
        })
        .pipe(dest(options.dist))
        .on("end",()=>{
            console.log(`${timeStamp().task}[${callerName}] ${options.src}`);
            resolve("");
        });
    });
};

const getTsImportList = async (options:{src:string,dist?:string}):Promise<string[]> => {
    const _tsRaw = fs.readFileSync(options.src,'utf8'); // ts파일 원문 가져오기
    const importList = _tsRaw.replace(_jsDocRegs,"") // jsdoc , tsdoc 삭제
                            .replace(_inlineComment,"") // 한줄주석 삭제
                            .match(_importsRegs) ?? []; // import 구문 가져오기
    const result:string[] = importList.map((importTsPath:string)=>{
        const subTsPath = importTsPath
                    .replace(/import ('|")([./]*)(.+)('|")(;?)/gi, "$2$3") // import 경로만 뽑아내기
                    .replace(/\.ts$/,"") // 확장자가 .ts이면 일단 삭제
                     + ".ts"; // .ts 확장자 붙여서 리턴
        return path.join(path.dirname(options.src),subTsPath).replace(/\\+/g,"/"); // 엔트리 파일기준 서브파일 위치
    });
    return result;
}