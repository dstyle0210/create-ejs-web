<!--
컨벤션은, 웹퍼블리싱 작업자들 사이에서,
본 프로젝트를 이용해서 개발하는 과정에 도움을 주기 위한 설명서 입니다.
-->
### CSS 기본규칙
- 모든 파일에는 캐릭터셋(@charset)을 최상단에 선언한다.
```css
@charset "utf-8";
```
- 속성에 사용되는 모든 문자형값은 특수한 경우를 제외하고 "" (따움표) 표시를 기준한다.
```css
.example{background-image:url("이미지경로");}
```
- 마지막 선언 값 에도 ; (세미콜론)을 사용한다.
```css
.example{color:#000;font-size:14px;}
```
- 속성별에 따른 들여쓰기는 하지 않는다.
```css
.example{color:#000;font-size:14px;} /* (O) */

.example{  /* (X) */
    color:#000;
    font-size:14px;
}
```
- 같은 속성에 따른 선택자는 줄바꿈한다.
```css
.example,
.example2{color:#000;font-size:14px;} /* (O) */

.example,.example2{color:#000;font-size:14px;} /* (X) */
```
- 시작 주석만 작성한다.
```css
/* 코멘트 */  /* (O) */
.example{color:#000;font-size:14px;}

/* 코멘트 */
.example{color:#000;font-size:14px;}
/* // 코멘트 */ /* (X) */
```