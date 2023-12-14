/**
 * 현재 시간 표시
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */

const setNum = (num:number) => (num<10) ? "0"+num : ""+num; // 10이하면, 01 형식으로 변경
const getTimeStamp = (options = {useSeparator:true}) => {
    const separators = {
        date:(options.useSeparator) ? "-" : "", // 구분자 사용시, 날짜 구분 (2023-11-29)
        time:(options.useSeparator) ? ":" : "" // 구분자 사용시 시간 구분 (13:00:10)
    };
    const now = new Date();
    const date = `${now.getFullYear()}${separators.date}${setNum(now.getMonth()+1)}${separators.date}${setNum(now.getDate())}`;
    const time = `${setNum(now.getHours())}${separators.time}${setNum(now.getMinutes())}${separators.time}${setNum(now.getSeconds())}`;
    return {full:date+" "+time,task:`[${time}] `,date,time};
};
export default getTimeStamp;