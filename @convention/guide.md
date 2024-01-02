<!--
컨벤션은, 웹퍼블리싱 작업자들 사이에서,
본 프로젝트를 이용해서 개발하는 과정에 도움을 주기 위한 설명서 입니다.
-->
# Guide
퍼블리싱 완료 후, 고객에게 인도되는 html에 대한 스펙 및 레이아웃 구조를 설명합니다.   
퍼블리셔 들마다 제공하는 정보가 다르기 때문에 딱 정할수는 없으나, 개인적으로 가장 간소화해서 작성해 놓았습니다.

## 작성법
- markdown(.md)파일로 작성이 가능합니다.
- ```./src/@guide/_inc``` 내 ```header.html``` 와 ```footer.html``` 이 더 해집니다.
- 공통파일은 지정(header.html , footer.html) 되어있으며, 변경 불가합니다.
- [github-markdown-light.css](https://github.com/sindresorhus/github-markdown-css) 테마를 기본으로 가지고 있습니다.
- [highlightjs](https://highlightjs.org/) 테마를 기본으로 가지고 있습니다.
- markdown link 기능 ```[링크명](링크주소)``` 은 .md가 .html로 변환 됩니다.

## 사용법
- npm script 사용
```
# 컴파일 및 빌드 처리, gulp guide:build 와 동일
npm run guide
```
- gulp task 사용
```
# 컴파일만 처리
gulp guide:compiler

# 산출물용으로 저장
gulp guide:dist

# 컴파일 및 산출물 저장 처리
gulp guide:build
```
