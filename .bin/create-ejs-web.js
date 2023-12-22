#! /usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
if (process.argv.length < 3) {
    console.log("생성할 폴더명을 입력해주세요.");
    console.log("예 :");
    console.log("    npx create-ejs-web my-app");
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "https://github.com/dstyle0210/create-ejs-web.git";

async function main() {
    try {
        console.log("파일을 다운로드 합니다. Downloading files.");
        execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);
        if (projectName !== ".") process.chdir(projectPath); // 생성된 폴더로 이동

        console.log("디펜던시 설치중. Installing dependencies.");
        execSync("npm install");

        console.log("불필요한 파일을 삭제 합니다. Delete unnecessary files.");
        execSync("npx rimraf ./.git"); // git 리파지토리 제거
        execSync("npx rimraf ./.bin"); // 설치파일 제거
        execSync("npx rimraf ./LICENSE"); // 라이센스 제거

        console.log("설치가 완료되었습니다. 'npm run dev' 를 실행해보세요. The installation is done, Please run 'npm run dev'.");
    } catch (error) {
        console.log(error);
    }
}
main();