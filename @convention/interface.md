<!--
컨벤션은, 웹퍼블리싱 작업자들 사이에서,
본 프로젝트를 이용해서 개발하는 과정에 도움을 주기 위한 설명서 입니다.
-->
# 개발환경
구축 및 운영을 위한 기술과, 환경에 대해서 설명합니다.
- [개발환경](#개발환경)
- [사용언어](#사용언어)
- [폴더구조](#폴더구조)
- [Config](#configts)
- [Gulp실행](#gulp-task)

---

## IO
NodeJs v20.10.1 ( Gulp 4.1 , Typescript )

## 사용언어
HTML5 , SASS(scss) , Typescript

## 폴더구조
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
+-- /src // 실제 퍼블리싱을 하는 소스의 위치
```

## Config.ts
[Config파일](../../../gulp_modules/config.ts)을 확인 해주세요.


## Gulp Task
```bash
# gulp 테스트명 으로 실행
```
| 테스크명 | 연결 테스크 | 기능
|---|---|---|
| html:compiler | - | 지정된 위치의 ejs와 html을 ejs형식으로 컴파일합니다.
| html:watcher | - | 지정된 위치의 ".ejs" 또는 ".html" 가 변경 될 경우, 컴파일 되도록 감시합니다.
| scss:compiler | - | 지정된 위치의 ".scss"을 컴파일합니다.
| scss:watcher | - | 지정된 위치의 ".scss"가 변경 될 경우 컴파일 되도록 감시합니다.
| ts:compiler | - | 지정된 위치의 ".ts"을 컴파일합니다.
| ts:watcher | - | 지정된 위치의 ".ts"가 변경 될 경우 컴파일 되도록 감시합니다.
| image:copy | - | 지정된 위치의 ".jpg, .png, .gif, .ico"을 임시폴더로 복사합니다.
| image:watcher | - | 지정된 위치의 ".jpg, .png, .gif, .ico" 가 변경 될 경우 임시폴더로 복사 되도록 감시합니다.
| lib:copy | - | 라이브러리 파일들을 임시폴더로 복사합니다.( ex : ./src/assets/lib )
| server:dev | - | 임시폴더(ex : .pub)을 루트로 서버가 실행 됩니다. (기본포트 3000)
| **compile** | lib:copy, html:compiler,  scss:compiler,  ts:compiler | 컴파일러 통합 실행
| **watch** | html:watcher,  scss:watcher,  ts:watcher | 감시자 통합 실행
| **dev** | watch, compile, server:dev | 컴파일 및 감시자, 서버시작 통합 실행