# create-ejs-web
- ejs 기반 웹 퍼블리싱 보일러 플레이트 입니다.

---

## 설치(npx)
1. [NodeJs](https://nodejs.org/) v18 이상 설치해 주세요.
2. 실행창( Windows + R ) 을 열고, "cmd" 를 입력, 엔터 해서 콘솔창(터미널)을 엽니다.
3. 설치할  폴더로 이동합니다. ```cd 작업할 폴더위치```
3. 아래의 코드를 실행창에 넣어 실행(설치)합니다.
```bash
npx create-ejs-web my-web
npm run dev
```
4. 브라우저에서 ```localhost:3000``` 을 입력해서 접속해봅니다.
5. 혹시 오류나면 아래 추가내용 [QA](#qa)을 참고해주세요.
6. 상세 설정은 "./gulp_modules/config.ts" 파일을 확인하세요.

---
## Gulp Task
```bash
# gulp 테스트명 으로 실행
```
| 테스크명 | 연결 테스크 | 기능
|---|---|---|
| html:compiler | - | 지정된 위치의 ".ejs" 또는 ".html" 을 ".html" 확장자인, ejs로 컴파일합니다.
| html:watcher | - | 지정된 위치의 ".ejs" 또는 ".html" 가 변경 될 경우, 컴파일 되도록 감시합니다.
| scss:compiler | - | 지정된 위치의 ".scss"을 컴파일합니다.
| scss:watcher | - | 지정된 위치의 ".scss"가 변경 될 경우 컴파일 되도록 감시합니다.
| ts:compiler | - | 지정된 위치의 ".ts"을 컴파일합니다.
| ts:watcher | - | 지정된 위치의 ".ts"가 변경 될 경우 컴파일 되도록 감시합니다.
| image:copy | - | 지정된 위치의 ".jpg, .png, .gif, .ico"을 임시폴더로 복사합니다.
| image:watcher | - | 지정된 위치의 ".jpg, .png, .gif, .ico" 가 변경 될 경우 임시폴더로 복사 되도록 감시합니다.
| lib:copy | - | 라이브러리 파일들을 임시폴더로 복사합니다.( ex : ./src/assets/lib )
| **compile** | lib:copy, html:compiler,  scss:compiler,  ts:compiler | 컴파일러 통합 실행
| **watch** | html:watcher,  scss:watcher,  ts:watcher | 감시자 통합 실행
| server:dev | - | 임시폴더(ex : .pub)을 루트로 서버가 실행 됩니다. (기본포트 3000)
| sitemap:save | - | 임시폴더(ex : .pub)을 루트로 "./pages/" 하위의 html의 PAGEDOC 정보를 수집하여 sitemap.json을 생성합니다.
| **sitemap** | html:compiler, sitemap:save | html 컴파일 및 PAGEDOC 수집 통합실행 합니다.
| **dev** | watch, compile, sitemap:save, server:dev | 컴파일 및 감시자, 사이트맵생성, 서버시작 통합 실행

## 테스크 실행
세부실행 부분은 gulp에 의존하지만, 자주쓰는 실행(두꺼운글씨)은 npm run 을 통해서도 가능합니다.
```bash
# gulp dev 와 동일
npm run dev
# gulp sitemap 와 동일
npm run sitemap
```

## 사이트맵 수집
- 개발환경 실행 ```npm run dev``` 후 사이트맵으로 빠른 이동을 시킬수 있습니다.  
- 사이트맵은 http://localhost:3000/sitemap.html 로 접근 가능 합니다.   
- 사이트맵은 [PAGEDOC](./@convention/pagedoc.md) 형식으로, 작성되면 개발환경 실행시 자동으로 크롤링 됩니다.  
- 수동으로 가져오는 경우는 ```npm run sitemap``` 로 재수집 할수 있습니다.


---

## 폴더구조
### 작업환경 폴더구조
```
./
+-- /.pub // ./src 에서 컴파일된 결과물 임시저장소, 개발서버의 루트,
+-- /build // 완료후 산출물 제출을 위해, 순수 html,css,js 로 컴파일 되는 곳
+-- /gulp_modules // gulp 실행을 위한 설정 및 실행모듈들
|   +-- @Types // gulp 환경용 types
|   +-- servers // 서버실행
|   +-- tasks // 컴파일 등 실행함수
|   +-- util // gulp 공통함수
|   +-- config.ts // gulp 환경설정 (가장중요)
+-- /src // 실제 퍼블리싱을 하는 소스의 위치 (아래 참고)
```

### 소스 폴더구조
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

---

## QA
### Q. npx를 실행하면 아래같은 에러가 나와요.
```
npm ERR! path C:\Users\사용자명\AppData\Roaming\npm
npm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory ...
```
npm이 처음 설치되었거나, 글로벌 설치가 한번도 없었어서 그래요.  
정확하겐, ```C:\Users\사용자명\AppData\Roaming\npm``` 폴더가 없어서 그래요.
```
npm i gulp-cli -g
```
를 한번 설치해주시고(gulp 글로벌 설치 입니다.) , npx로 재설치 해보세요.

### Q. gulp 가 실행할수 없는 프로그램 이래요.
```
gulp : 'gulp' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바른지 검증한 다음 다시 시도하십시오.
위치 줄:1 문자:1
+ gulp
+ ~~~~
    + CategoryInfo          : ObjectNotFound: (gulp:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```
1. ```npm i gulp-cli -g``` 로 gulp 을 글로벌설치 및 실행구문으로 등록해주세요.
2. [Gulp Task](#gulp-task) 중, dev 는 사실 ```npm run dev``` 로도 실행 할수 있어요.

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

### Q. ```** vulnerabilities (* moderate, ** high)``` 이런식으로 나와요.
CSS의 프로퍼티를 정렬해주는 라이브러리(gulp-csscomb) 가 오래된거라(...) 그렇습니다.   
정상 실행됩니다. 마음에 안드시겠지만 그냥 써주시면...

### Q. ".pub" 폴더랑 "build" 폴더가 생겼어요.
".pub" 폴더는 개발서버용 임시 폴더 입니다.(임시 이지만, 중요한 폴더예요. src보다 더 중요할수도 있음)  
"build" 폴더는 배포용폴더 라고 하는데, 웹퍼블리싱 완료 후에 산출물 제출용이예요.

---

## 참고하세요.
### typescript(.ts)의 import 
본 프로젝트에서 ".src/" 하위의 typescript(.ts) 의 import는 기존과 다릅니다.  
본래는 ts파일의 export 된 객체(모듈)을 가져와 사용하는 개념이지만, 웹퍼블리싱은 보통 번들링을 하지 않고, 브라우저 자체에서의 import 기능을 쓰지 않기 때문에, 번들링이 아닌, 합치기(include) 개념으로 동작합니다.

### ejs 와 html
본 프로젝트는 ejs와 html은 동일하게 취급합니다.
즉 html파일 안에 ejs을 사용해도 둥일하게 동작하며, 모든 ejs의 구문이 사용가능합니다.
단, "./src" 폴더 내에 사용된 ".ejs" 파일은 compile 시에 ".pub" 폴더 안에 ".html" 파일로 변경되서 저장됩니다.

### html 의 ```<include>``` 구문 (확장된 엘리먼트)
ejs의 include 구문을 적용하면 에디터(ex : vscode)의 팔로우링크(Ctrl+클릭)시 해당 파일이동이 동작하지 않습니다. 
해서 임의적으로 ```<include src="경로" options="전달객체"></include>```를 추가적으로 커스텀(확장 엘리먼트 생성)해서 넣었습니다.  

```
# "./src/sub/sub.html" 의 <include> 문 (컴파일 전, html 확장형식, 팔로우링크 가능)
<include src="./_inc/subCommon.html" options="{param:'sub.html 에서 파라매터 전달'}"></include>

# "./.pub/sub/sub.html" 의 <%- include %> 문 (컴파일 후, ejs 형식, 팔로우링크 불가)
<%-include(`./_inc/subCommon.html`,{param:'sub.html 에서 파라매터 전달'}) %>
```

---

## 제공환경
- [expressJs](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [SCSS](https://sass-lang.com/)
- [typescript](https://www.typescriptlang.org)

---

## 업데이트 이력 v0.7.0
- 임의로 생성된 PAGEDOC 형식을 통해 사이트맵 생성이 가능합니다.
- PAGEDOC 작성법은 "./@convention/pagedoc.md" 를 참고해주세요.
- PAGEDOC 을 통해 생성된 사이트맵은 ```npm run dev``` 실행 후, ```http://localhost:3000/sitemap.html``` 에서 확인이 가능합니다.
- sitemap.json 생성은 아래의 Task로 실행가능합니다.
```bash
npm run sitemap
# 또는
gulp sitemap
```