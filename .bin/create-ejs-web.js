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
        console.log("Downloading files...");
        execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);
        if (projectName !== ".") process.chdir(projectPath); // 생성된 폴더로 이동

        console.log("Installing dependencies...");
        execSync("npm install");
        execSync("npx rimraf ./.bin"); // 이제 보일러플레이트 git과 관련된 내용 제거2

        console.log("The installation is done, this is ready to use !");
    } catch (error) {
        console.log(error);
    }
}
main();