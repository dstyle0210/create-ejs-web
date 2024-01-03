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
import {src,dest} from "gulp";
import marked from "marked";
import * as Config from "../config"; // 해당 포트 및 폴더 변경 가능
import timeStamp from "../util/getTimeStamp";
import getSrcDist from "../util/getSrcDist";
import pretty from "pretty";

export const compiler = (options:{base:string,src:string|string[],dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        const srcs = await glob(options.src);
        const distPath = path.normalize(options.dist).replace(/\\+/g,"/");
        const headerRaw = fs.readFileSync("./src/@guide/_inc/header.html","utf8");
        const footerRaw = fs.readFileSync("./src/@guide/_inc/footer.html","utf8");
        src(Config.guideOptions.base+"/**/*.{css,js}")
        .pipe(dest(Config.guideOptions.dist))
        .on("end",async ()=>{
            for await (const srcPath_ of srcs){
                const {src , dist} = getSrcDist(Object.assign(options,{src:srcPath_}));
                const save = dist.replace(/((.md)|(.ejs))$/g,".html"); // 저징될 경로(파일명 포함) , .md, .ejs 인경우, .html로 변환 됨.
                const mdRaw_ = fs.readFileSync(src,"utf8");
                const mdRaw = mdRaw_.replace(/\.md/gi,".html");
                const guideHtml = pretty(headerRaw + (await marked.parse(mdRaw)) + footerRaw,{
                    indent_size:4, // Tab1 , space 4
                    unformatted:["code","pre","xmp"], // 해당 부분은 포메팅 안함.
                    ocd:true // 줄바꿈된 문자 한줄로 + 문자 앞뒤 공백제거, 주석 앞 공백 적용
                });
                fs.mkdirSync(path.dirname(save),{recursive:true}); // 저장할 폴더 생성
                fs.writeFileSync(save,guideHtml,"utf8");
                resolve();
            };
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