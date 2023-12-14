// 소스폴더 설정
export const srcRoot = "./src"; // 소스폴더

// 개발용 임시폴더, 개발서버루트 설정
export const devServerRoot = "./.pub"; // 개발서버 루트폴더
export const devServerStatics = [{route:"/assets",path:devServerRoot+"/assets"},{route:"/images",path:devServerRoot+"/images"}]; // 개발서버 스테틱리소스 폴더
export const devPort = 3000; // 개발용 서버 포트
export const devServerOptions = {
    root:devServerRoot,
    port:devPort
}

// 배포용 폴더(산출물) , 배포서버루트 설정
export const buildServerRoot = "./build"; // 배포서버 루트폴더
export const buildServerStatics = [{route:"/assets",path:buildServerRoot+"/assets"},{route:"/images",path:buildServerRoot+"/images"}]; // 배포서버 스테틱리소스 폴더
export const buildPort = 3100; // 배포서버 포트

// 리소스 설정
export const scssOptions = {
    src:srcRoot+"/assets/scss/*.scss",
    base:srcRoot+"/assets/scss",
    dist:devServerRoot+"/assets/css"
};

export const tsOptions = {
    src:srcRoot+"/assets/ts/*.ts",
    base:srcRoot+"/assets/ts",
    dist:devServerRoot+"/assets/js",
}

export const imageOptions = {
    src:srcRoot+"/images/**/*.{jpg,png,gif,ico}",
    base:srcRoot+"/images",
    dist:devServerRoot+"/images"
}

export const htmlOptions = {
    src:srcRoot+"/**/*.html",
    base:srcRoot,
    dist:devServerRoot
}

export const libOptions = {
    src:srcRoot+"/assets/lib/**/*.{js,css}",
    base:srcRoot+"/assets/lib",
    dist:devServerRoot+"/assets/lib"
}

/**
 * 디플로이 설정
 */
export const cssDistOptions = {
    src:scssOptions.dist+"/**/*.css",
    base:devServerRoot,
    dist:buildServerRoot
}

export const jsDistOptions = {
    src:tsOptions.dist+"/**/*.js",
    base:devServerRoot,
    dist:buildServerRoot
}

export const imageDistOptions = {
    src:imageOptions.dist+"/**/*.{jpg,png,gif,ico}",
    base:devServerRoot,
    dist:buildServerRoot
}

// 개발서버에 ejs로 된 html을 순수 html로(소스보기) 가져와서 배포폴더에 저장
export const htmlDistOptions = {
    src:[devServerRoot+"/pages/**/*.html","!"+devServerRoot+"/**/_inc/*.html"],
    base:devServerRoot,
    dist:buildServerRoot
}

// 가이드 작성 옵션
export const guideOptions = {
    src:srcRoot+"/@guide/**/*.{md,ejs,html}",
    base:srcRoot+"/@guide",
    dist:devServerRoot+"/@guide"
}