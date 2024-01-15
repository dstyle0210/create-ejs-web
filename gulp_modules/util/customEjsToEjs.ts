// 임의 커스텀Ejs 을 순수 ejs 구문으로 변경
const customEjsToEjs = (cEjs:string) => {
    return cEjs
    .replace(/(<include)\s*(src=("|'))(.+)("|')\s*((props|options)=("|'))(.+)(("|'))\s*(\/)?(>)(<\/include>)?/gi,"<%-include(`$4`,$9) %>") // 옵션이 포함된 인클루드 구문 변환
    .replace(/(<include)\s*(src=("|'))(.+)("|')\s*(\/)?(>)(<\/include>)?/gi,"<%-include(`$4`) %>") // 옵션이 없는 인클루드 구문 변환
    .replace(/(include\(`)(.+)(.ejs)(`)/gi,"$1$2.html$4"); // ejs로 로드 했을경우, html파일로 변환
}
export default customEjsToEjs;