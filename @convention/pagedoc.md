<!--
컨벤션은, 웹퍼블리싱 작업자들 사이에서,
본 프로젝트를 이용해서 개발하는 과정에 도움을 주기 위한 설명서 입니다.
-->
# PAGEDOC
[JSDOC](https://jsdoc.app/)의 기본형태를 이용하여, 임의로 PAGEDOC 이라는 명칭아래 ejs나 html 파일 최상단에 작성합니다.
기본형태나, 파라매터 선언(@), 의미는 JSDOC을 기반합니다.

---

## 간단 템플릿
```html
<!-- PAGEDOC
@since 2023.12.22
@author 작성자
@page 카테고리명 > 페이지명
@desc 페이지에 대한 설명
@stats 퍼블리싱 진행상태, 진행예정,진행중,퍼블완료,삭제됨 으로 표기한다.
@param {파라매터목록} 파라매터기본형식 : 파라매터 설명
@member 경로(./src 이후) // 케이스 설명
@see 샘플페이지 또는 함께 봐야할 페이지 주소
@example 
인클루드 선언문이나, 또는 사용법 등 예제
@editBy 수정이력 한줄코멘트
-->
```
- ```@page``` 파라매터만 필수, 그외는 옵션 입니다.

---

## 설명
### ```@since```
- 페이지가 생성된 날짜나 버전 등 을 기입합니다.
- JSDOC의 [@since](https://jsdoc.app/tags-since)와 동일합니다.
```html
<!-- PAGEDOC
@since 2023.12.22
@since 0.7.0
-->
```
### ```@author```
- 페이지 생성자 또는 책임자를 작성합니다.
- JSDOC의 [@author](https://jsdoc.app/tags-author)과 동일합니다.
```html
<!-- PAGEDOC
@author Mabongpapa
-->
```
### ```@page```
- 웹사이트의 구조상의 페이지 위치를 표시합니다.
- 맨 처음에 작성된 명칭(대카테고리)를 기준으로 sitemap.json이 생성됩니다.
```html
<!-- PAGEDOC
@page 메인
@page 서브
@page 서브 > 서브1
-->
```
### ```@desc```
- 페이지 설명을 작성합니다.
- 특정조건들 (회원만 접근가능, 상품에 따라 다르게표시 등)
- JSDOC의 [@description](https://jsdoc.app/tags-description)과 동일합니다.
```html
<!-- PAGEDOC
@desc 서브안에서만 링크로 접근 가능한 페이지 입니다.
-->
```
### ```@stats```
- 퍼블리싱 진행상태를 작성합니다.
- 진행예정,진행중,퍼블완료,삭제됨 중 하나만 사용합니다.
- 진행예정 : 스토리보드에 존재하여, html파일은 생성했으나, 퍼블이 진행되지 않은 상태
- 진행중 : 퍼블리싱 진행중인 상태
- 퍼블완료 : 퍼블리싱 완료. 기획자 or 개발자 확인 요청 상태
- 삭제됨 : 퍼블리싱 진행 or 완료 되었으나, 삭제(폐기)된 상태.
```html
<!-- PAGEDOC
@stats 진행예정
@stats 진행중
@stats 퍼블완료
@stats 삭제됨
-->
```
### ```@param```
- 웹주소(get방식)이나, ejs의 include props 를 통해 전달받는 파라매터를 설명합니다.
- JSDOC 의 [@param](https://jsdoc.app/tags-param) 과 동일합니다.

```html
<!-- PAGEDOC
@param {String} loginId 로그인 아이디
@param {Number} count 카운트
@param {"member"|"guest"} [memberType="member"] 회원타입(member:회원, guest:손님)
-->
```
### ```@caseBy```
- 웹주소(get방식)이나, ejs의 include props 를 통해 달라지는 화면의 목록 입니다.
- ```@caseBy(반칸)웹주소(빈칸 + //)코멘트``` 식으로 작성합니다.
```html
<!-- PAGEDOC
@caseBy /pages/main/main.html?login=true // 로그인 상태(true값 , 파라매터 예제)
@caseBy /pages/main/main.html?login=false // 로그인 상태(false값 , 파라매터 예제)
-->
```
### ```@see```
- 해당 페이지와 비슷하거나, 베이스가 된 페이지의 주소를 작성합니다.
```html
<!-- PAGEDOC
@see /pages/sub/sub1.html // 서브>서브1페이지 에서 복사됨.
-->
```
### ```@example```
- 해당 페이지의 사용법이나 샘플링에 대해 작성합니다.
- JSDOC의 [@example](https://jsdoc.app/tags-example) 과 동일합니다.
```html
<!-- PAGEDOC
@example
<%# 페이지 내 인클루드 파일, "_inc" 폴더에 따른 제외처리 예제 %>
<include src="./_inc/subCommon.html" options="{param:'sub.html 에서 파라매터 전달'}"></include>
-->
```
### ```@comment```
- 페이지의 필요 코멘트나 수정이력을 작성합니다.
- description 과의 차이점은 desc는 페이지를 설명하는 목적이고,
- comment 는 협업하는 인원이 보아야할 내용입니다.
```html
<!-- PAGEDOC
@comment 2024.01.08 코멘트 기능추가 "어쩌구 버튼 클릭시 확인가능"
@comment 2024.01.09 요고조고 수정함. 어디어디 색상변경.
-->
```






