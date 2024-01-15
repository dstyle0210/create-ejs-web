import path from "path";

// 소스폴더 설정
export const srcRoot = "./src"; // 소스폴더

// 컴파일된 파일 저장소, 개발서버루트 설정
export const devServerRoot = "./.pub"; // 개발서버 루트폴더
export const devServerStatics = [ // 개발서버 스테틱 리소스 폴더
    {route:"/assets",path:devServerRoot+"/assets"}, // css, js
    {route:"/images",path:devServerRoot+"/images"}, // image
    {route:"/@guide",path:devServerRoot+"/@guide"} // guide
];
export const devPort = 3000; // 개발용 서버 포트 ( http://localhost:3000 )
export const devServerOptions = {
    root:devServerRoot,
    port:devPort
}

// 사이트맵 설정
export const sitemapJson = devServerRoot+"/sitemap.json"; // PAGEDOC을 통해 저장되는 html 목록
export const sitemapHtml = devServerRoot+"/sitemap.html"; // 사이트맵을 보여주는 템플릿
export const sitemapPort = 3001; // 사이트맵 dist 할경우 적용할 임시서버 포트

// 리소스 설정
export const scssOptions = {
    src:srcRoot+"/assets/scss/*.scss", // scss 엔트리 위치
    base:srcRoot+"/assets/scss",
    dist:devServerRoot+"/assets/css" // 컴파일 된 파일들이 저장될 위치(base 기준)
};

export const tsOptions = {
    src:srcRoot+"/assets/ts/*.ts", // .ts 엔트리 위치
    base:srcRoot+"/assets/ts",
    dist:devServerRoot+"/assets/js" // 컴파일 된 파일들이 저장될 위치(base 기준)
}

export const imageOptions = {
    src:srcRoot+"/images/**/*.{jpg,png,gif,ico}", // 이미지 파일 위치
    base:srcRoot+"/images",
    dist:devServerRoot+"/images" // 복사 될 위치(base 기준)
}

export const htmlOptions = {
    src:[srcRoot+"/**/*.{ejs,html}","!"+srcRoot+"/@guide/_inc/*.html"], // ejs,html 파일들 위치
    base:srcRoot,
    dist:devServerRoot // 컴파일 된 파일들이 저장될 위치(base 기준)
}

export const libOptions = {
    src:srcRoot+"/assets/lib/**/*.{js,css}",
    base:srcRoot+"/assets/lib",
    dist:devServerRoot+"/assets/lib"
}

// 가이드 작성 옵션
export const guideHeader = "./src/@guide/_inc/header.html"; // 가이드 레이아웃 헤더
export const guideFooter = "./src/@guide/_inc/footer.html"; // 가이드 레이아웃 풋터
export const guideOptions = {
    src:[srcRoot+"/@guide/**/*.md",srcRoot+"/**/*.guide.md"],
    base:srcRoot,
    dist:devServerRoot
}

/**
 * 디플로이 설정
 */
export const buildServerRoot = "./build";
export const buildPort = 3100; // 배포용 서버 포트 ( http://localhost:3100 )


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

// 개발서버폴더 내 html을 순수 html로(소스보기) 가져와서 배포폴더에 저장
export const htmlDistOptions = {
    src:[devServerRoot+"/pages/**/*.html","!"+devServerRoot+"/**/_inc/*.html"],
    base:devServerRoot,
    dist:buildServerRoot
}

// 가이드 작성 옵션
export const guideDistOptions = {
    src:devServerRoot+"/@guide/**/*.{html,css,js}",
    base:devServerRoot+"/@guide",
    dist:buildServerRoot+"/@guide"
}