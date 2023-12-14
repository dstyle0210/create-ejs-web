/**
* 메인 스크립트
*
* @Modification Information
*
* 수정일 : 수정자 : 수정내용
* --------------------------
* 2023.12.14 : Mabongpapa : 최초생성
*/
type TmainFn = () => Promise<string>;

// 예제 함수
const mainFn:TmainFn = () => {
    return new Promise((resolve,reject)=>{
        try{
            resolve("main!"); 
        }catch(e){
            reject(e); 
        };
    });
};