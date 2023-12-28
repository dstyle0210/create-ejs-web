/**
 * 서버설정
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import type {TServerOptions} from "../../gulp_modules/@types/gulpfile.d";
import * as Config from "../config";
import fs from "fs";
import path from "path";
import express from "express";
import timeStamp from "../util/getTimeStamp";

const createServer = (options:TServerOptions,callerName?:string):Promise<void> => {
    return new Promise((resolve,reject)=>{
        const app = express();

        // 리소스 라우트
        Config.devServerStatics.forEach((staticData)=>{
            app.use(staticData.route,express.static(staticData.path));
        });

        // ejs 서버 셋팅
        const root = path.join(__dirname,"../../",options.root);
        app.set("views",root); // 루트설정
        app.set("view engine","ejs"); // 렌더링엔진은 ejs엔진 사용
        app.engine("html",require("ejs").renderFile); // html도 ejs로 처리
        app.get("/favicon.ico",(req,res)=>res.sendStatus(204)); // 파비콘 미사용

        // ejs 라우트
        app.use("/",(req,res)=>{
            try{
                // JSON 인 경우 
                if( (/\.json$/i).test(req.url) ){
                    const data = JSON.parse(fs.readFileSync(root+req.url,"utf8"));
                    res.json(data);
                    return;
                };

                // 페이지 주소 구하기
                const requestPath = `.${req.url.endsWith("/") ? req.url+"index.html" : req.url}`; // 접속할 상대경로 구하기(src로 부터)
                const [renderPath,param] = requestPath.split("?");
                const props = (param) ? JSON.parse('{"'+decodeURI(param.replace(/&/g,"\",\"").replace(/=/g,"\":\""))+'"}') : {};

                // param location 추가
                const pathname = renderPath.replace("./","/");
                const paths = renderPath.replace("./","").split("/").map(str => str);
                props.location = {pathname,paths}

                // 사이트맵 인경우의 처리
                if(path.basename(Config.sitemapHtml) == path.basename(requestPath)){ // 지정된 사이트맵과 파일명이 같은가?
                    const sitemap = JSON.parse(fs.readFileSync(Config.sitemapJson,"utf8"));
                    props.sitemap = sitemap;
                    props.isTempServer = (options.port == Config.sitemapPort); // 사이트맵 구하는용 임시서버 포트번호 비교
                }

                console.log(`${timeStamp().task}[${callerName}] ${renderPath}`);
                res.render(renderPath,props);
            }catch(e){
                res.end(0); // 에러가 생기면 request 종료를 위해 실행함
                console.log(e);
            };
        });

        app.listen(options.port,()=>{
            console.log(`${timeStamp().task}[${callerName}] server start , port ${options.port}`);
            resolve();
        });
    });
}

// 개발서버 실행
const dev = async (options?:TServerOptions):Promise<void> => {
    await createServer(Object.assign({
        root:Config.devServerRoot,
        port:Config.devPort
    },options),`server:dev`);
};

// 배포서버 실행
const build = async (options?:TServerOptions):Promise<void> => {
    await createServer(Object.assign({
        root:Config.buildServerRoot,
        port:Config.buildPort
    },options),`server:deploy`);
};
export {dev,build};