/**
* 서브 스크립트
*
* @Modification Information
*
* 수정일 : 수정자 : 수정내용
* --------------------------
* 2023.12.14 : Mabongpapa : 최초생성
*/
type TsubFn = () => Promise<string>;

// 예제 함수
const subFn:TsubFn = () => {
    return new Promise((resolve,reject)=>{
        try{
            resolve("sub!"); 
        }catch(e){
            reject(e); 
        };
    });
};

/*! 가져오기 : ts 변환 및 합치기가 실행 됨 */
// 번들링이 되는것은 아니므로, import를 통한 가져오기가 아님에 유의, 단순 합치기(include) 개념으로 봐야함
import "./sub/subFunc1";
import "./sub/subFunc2";