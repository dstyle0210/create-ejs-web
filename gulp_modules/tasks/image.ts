/**
 * 이미지 복사 , 감시
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import {src,dest,watch} from "gulp";
import timeStamp from "../util/getTimeStamp";

// 시작시 전체 컴파일용
export const copy = async (options:{base:string,src:string,dist:string}):Promise<void> => {
    await imageCopy(options,"Image:copy");
};

// 감시자 적용
export const watcher = (options:{base:string,src:string,dist:string}):Promise<void> => {
    return new Promise(async (resolve,reject)=>{
        const toCopy = (src:string) => imageCopy(Object.assign(options,{src:src.replace(/\\+/g,"/")}),"Image:Watcher");
        watch(options.src,{usePolling:true}).on("change",(path)=>{
            toCopy(path);
        }).on("add",(path)=>{
            toCopy(path);
        }).on("ready",()=>{
            console.log(`${timeStamp().task}[Image:Watch] Ready`);
            resolve();
        });
    });
};

const imageCopy = (options:{base:string,src:string,dist:string},callerName?:string):Promise<void> => {
    return new Promise((resolve,reject)=>{
        src(options.src,{base:options.base})
        .pipe(dest(options.dist))
        .on("end",()=>{
            console.log(`${timeStamp().task}[${callerName}] ${options.src}`);
            resolve();
        });
    });
}