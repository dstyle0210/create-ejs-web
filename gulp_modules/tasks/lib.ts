/**
 * 라이브러리 복사(gulp 용)
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import type {TOptions,ICopyTask} from "../../gulp_modules/@types/gulpfile.d"
import {src , dest} from "gulp";
import timeStamp from "../util/getTimeStamp";

export const copy = (options:TOptions):Promise<void> => {
    return new Promise((resolve,reject)=>{
        src(options.src,{base:options.base})
            .pipe(dest(options.dist))
            .on("end",()=>{
                console.log(`${timeStamp().task}[Lib:Copy] Copy Complete`);
                resolve();
            });
    });
}