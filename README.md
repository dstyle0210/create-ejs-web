# create-ejs-web
ejs 기반 웹 퍼블리싱 보일러 플레이트 입니다.

## 제공환경
- [expressJs](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [SCSS](https://sass-lang.com/)
- [typescript](https://www.typescriptlang.org)

## 설치(npm)
1. [NodeJs](https://nodejs.org/) v18 이상 설치
2. 실행창( Windows + R ) 을 열어 아래의 코드를 실행창에 넣어 실행(설치)합니다.
```bash
npm i npm@latest -g
npm i gulp-cli -g
npm i
gulp dev
```
3. 브라우저에서 ```localhost:3000``` 을 입력해서 접속해봅니다.
4. 혹시 오류나면 아래 추가내용 QA을 참고해주세요.
5. 상세 설정은 "./gulp_modules/config.ts" 파일을 확인하세요.

## Gulp Task
```bash
# gulp 테스트명 으로 실행
```
| 테스크명 | 연결 테스크 | 기능
|---|---|---|
| html:compile | - | ejs와 html을 ejs형식으로 컴파일합니다.
| scss:compile | - | scss을 css로 컴파일합니다.
| ts:compile | - | .ts을 .js로 컴파일합니다.
| **compile** | html:compile,  scss:compile,  ts:compile | 리소스 들이 컴파일 됩니다.
| lib:copy | - | 라이브러리 파일들을 카피합니다.( ex : ./src/assets/lib )
| server:dev | - | 임시폴더(ex : .pub)을 루트로 서버가 실행 됩니다. (기본포트 3000)
| **dev** | lib:copy,  compile,  server:dev | 개발환경으로 시작합니다.

## 폴더구조
### 프로젝트 폴더구조
```
./
+-- /.pub // ./src 에서 컴파일된 결과물 임시저장소, 개발서버의 루트
+-- /build // 완료후 산출물 제출을 위해, 순수 html,css,js 로 컴파일 되는 곳
+-- /gulp_modules // gulp 실행을 위한 설정 및 실행모듈들
|   +-- @Types // gulp 환경용 types
|   +-- servers // 서버실행
|   +-- tasks // 컴파일 등 실행함수
|   +-- util // gulp 공통함수
|   +-- config.ts // gulp 환경설정 (가장중요)
+-- /src // 실제 퍼블리싱을 하는 소스의 위치 (아래 참고)
```

### src 폴더구조
```
./src
+-- /@guide // 웹퍼블리싱 가이드
+-- /assets
|   +-- scss // scss을 모아주는(@import) 엔트리 성격의 scss
|   +-- ts // typescript을 모아주는(import) 엔트리 성격의 ts
|   +-- lib // 라이브러리 들
+-- /layouts
|   +-- header // 헤더 공통 영역
|   +-- footer // 풋터 공통 영역
+-- /pages // 페이지
|   +-- main // 메인 페이지
|   +-- sub // 서브 페이지 들
+-- index.html // 초기 접속페이지
+-- sitemap.html // 사이트맵
```

## QA
### Q. gulp 에서 보안오류가 나와요.
```
gulp : 이 시스템에서 스크립트를 실행할 수 없으므로 *** 파일을 로드할 수 없습니다. 
+ gulp dev
+ ~~~~
    + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
1. 검색에 powershell 을 찾고, **"관리자 권한으로 실행"** 을 눌러주세요.
2. ```Set-ExecutionPolicy RemoteSigned```을 입력하시고 엔터.
3. "y" 하시고 엔터 하시면 됩니다.

### Q. intelliJ (또는 Webstorm) 에서 안되요.
일단 기준은 vscode을 기준으로 만들어 졌고... 사실 확인 안 해봤어요.   
오류 상황을 보내주시면 확인해볼께요.

### Q. ```** vulnerabilities (* moderate, ** high)``` 이런식으로 나와요.
CSS의 프로퍼티를 정렬해주는 라이브러리(gulp-csscomb) 가 오래된거라(...) 그렇습니다.   
정상 실행됩니다. 마음에 안드시겠지만 그냥 써주시면...

### Q. ".pub" 폴더랑 "build" 폴더가 생겼어요.
".pub" 폴더는 개발서버용 임시 폴더 입니다.(근데 사실 제일 중요한 폴더예요. src보다 더 중요할수도 있음)  
"build" 폴더는 배포용폴더 라고 하는데, 웹퍼블리싱 완료 후에 산출물 제출용이예요.

## 참고하세요.
### typescript(.ts)의 import 
본 프로젝트에서 ".src/" 하위의 typescript(.ts) 의 import는 기존과 다릅니다.  
본래는 ts파일의 export 된 객체(모듈)을 가져와 사용하는 개념이지만, 웹퍼블리싱은 보통 번들링을 하지 않고, 브라우저 자체에서의 import 기능을 쓰지 않기 때문에, 번들링이 아닌, 합치기(include) 개념으로 동작합니다.

### ejs 와 html
본 프로젝트에서 ejs와 html은 동일하게 취급합니다.
즉 html파일 안에 ejs을 사용해도 둥일하게 동작하며, 모든 ejs의 구문이 사용가능합니다.
단, "./src" 폴더 내에 사용된 ".ejs" 파일은 compile 시에 ".pub" 폴더 안에 ".html" 파일로 변경되서 저장됩니다.

### html 의 ```<include>``` 구문
html에서 ejs의 include 구문으로 적용하면 에디터의 스마트링크(Ctrl+클릭)시 해당 파일이동이 동작하지 않습니다. 해서 임의적으로 ```<include src="경로" options="전달객체"></include>```를 추가적으로 커스텀해서 넣었습니다.  

```
# "./src/sub/sub.html" 의 <include> 문 (컴파일 전, html 확장형식, 스마트링크 가능)
<include src="./_inc/subCommon.html" options="{param:'sub.html 에서 파라매터 전달'}"></include>

# "./.pub/sub/sub.html" 의 <%- include %> 문 (컴파일 후, ejs 형식, 스마트링크 불가능)
<%-include(`./_inc/subCommon.html`,{param:'sub.html 에서 파라매터 전달'}) %>
```

