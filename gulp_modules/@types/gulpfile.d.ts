/**
 * Gulp 실행용 Type 정리
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
/* Task */
export type TOptions = {src:string|string[],base:string,dist:string}; // 테스크 파라매터 옵션 기본형식
export type TCompiler = (options:TOptions) => Promise<void>; // 컴파일러 공통 타입
export type TWatcher = (options:TOptions) => Promise<void>; // 감시자 공통 타입
export type TCopy = (options:TOptions) => Promise<void>; // 복사 공통타입
export type TDist = (options:TOptions) => Promise<void>; // 컴파일러 공통 타입

export interface ICompilerTask {compiler:TCompiler}
export interface IWatcherTask {watcher:TWatcher}
export interface ICopyTask {copy:TCopy}
export interface IDistTask {dist:TDist}

/* SERVER */
export type TServerOptions = {root:string,port:number,statics?:{route:string,path:string}[]}
export interface IServer {
    dev:(options:TServerOptions)=>Promise<void>,
    build:(options:TServerOptions)=>Promise<void>
}

/* SITEMAP */
export interface ISitemap {
    crawler:(options:{base:string,src:string|string[]}) => Promise<{name:string,devUrl:string,buildUrl:string}[]>,
    save:(options:{base:string,src:string|string[]},jsonSavePath:string) => Promise<void>,
}