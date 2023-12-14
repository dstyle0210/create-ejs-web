/**
 * HTML 경로용 src 및 dist 주소 변환
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import path from "path";
const getSrcDist = (options:{src:string,base:string,dist:string}) => {
    const getPath = (path_:string,isFolder = false) => ("./"+path.relative("./",path_)).replace(/\\/g,"/") + ((isFolder) ? "/" : "");
    const src = getPath(options.src);
    const dist = getPath(options.dist,true) + src.replace( getPath(options.base,true) ,""); // dist 전체경로(폴더) + src 경로에서 base경로만 지운거
    return {src,dist}
}
export default getSrcDist;