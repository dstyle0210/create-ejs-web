// 포트번호 기준해서, pid값 구하는거 (netstat 이용)
import { exec } from "child_process"; // 작으니까 exec
const splitStat = (stat:string):string[] => stat.trim().split(/\s+/); // 띄어쓰기를 기준으로 스플릿
const findPidFromPort = (port_:number):Promise<number> => {
    return new Promise((resolve,reject) => {
        exec(`netstat -ano`,(err,stdout,stderr) => {
            if(err) reject(err); // 에러가 존재 한다면 리턴해준다.
            if(stderr) reject(stderr); // 표준에러가 존재 한다면 리턴해준다.
            
            const _portReg = new RegExp(`:${port_}$`); // 포트번호가 딱 떨어져야함
            const _row = stdout.split(/\n/).find((row_) => {
                const _target = splitStat( row_ )[1]; // 내부아이피만 체크
                return (_portReg).test(_target); // 입력된 내부포트를 가진 row 만 리턴.
            });

            // 포트가 존재하면
            const _result = (_row) ? Number( splitStat(_row).pop() ) : 0;
            resolve(_result);
        });
    });
};
export default findPidFromPort;