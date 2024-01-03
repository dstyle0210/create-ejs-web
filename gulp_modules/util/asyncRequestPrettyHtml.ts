/**
 * URL을 통해 가져온 HTML을 정렬해서 문자열로 리턴
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2024.01.03 : Mabongpapa : 최초생성
 */
import request from "request";
import pretty from "pretty";
const asyncRequestPrettyHtml = (url:string):Promise<string> => {
    return new Promise((resolve,reject)=>{
        request(url,(error,response,body)=>{
            const pagedocText = ((pagedoc)=>((pagedoc)?pagedoc[0]:""))(body.match(/^(<!-- PAGEDOC)((?!-->).|[\r\n])+(-->)/gi));
            const htmlBody = body.replace(pagedocText,"");
            const prettyHtml = pretty(htmlBody,{
                indent_size:4, // Tab1 , space 4
                unformatted:["code","pre","xmp"], // 해당 부분은 포메팅 안함.
                ocd:true // 줄바꿈된 문자 한줄로 + 문자 앞뒤 공백제거, 주석 앞 공백 적용
            });
            resolve(prettyHtml);
        });
    });
};
export default asyncRequestPrettyHtml;