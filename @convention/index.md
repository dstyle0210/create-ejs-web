# 웹퍼블리싱 컨벤션
본 "프로젝트명" 프로젝트는 아래와 같은 환경을 에서 개발하도록 합니다.

## [개발환경](./interface/index.md)
- [IO](./interface/index.md#io)
- [개발언어](./interface/index.md#사용언어)
- [폴더구조](./interface/index.md#폴더구조)
- [Config](./interface/index.md#configts)
- [Gulp Task](./interface/index.md#gulp-task)

## 작성규약

### 공통
#### 들여쓰기
- 들여쓰기는 spaces 4 , tab 1 을 사용합니다.

## Naming
- 특수한 경우를 제외하고, 카맬케이스를 기본으로 사용합니다.
- 약어표를 제외한 모든 단어는 스펠링 전부를 사용합니다.
```
prd (X)
cs (X)
---
product (O)
customerService (O)
```
- 공백은 사용하지 않습니다.
- 배열은 복수형(s)으로 사용합니다.
- HTML은 소문자로 작성합니다.


### HTML
- 의미에 맞는 태그를 사용합니다.
- 속성은 큰따옴표(")를 사용합니다.
- 태그명, 속성명, 속성값 등에는 모두 소문자만 사용한다.
- Boolean 속성은 값을 따로 명시하지 않습니다.
```html
<input type="text" disabled=true> <!-- (X) -->
<input type="text" disabled> <!-- (O) -->

<input type="checkbox" value="1" checked=true> <!-- (X) -->
<input type="checkbox" value="1" checked> <!-- (O) -->

<select>
  <option value="1" selected=true>1</option> <!-- (X) -->
</select>
<select>
  <option value="1" selected>1</option> <!-- (O) -->
</select>
```
- CSS/Javascript 파일을 불러오는 경우 type을 명시하지 않습니다.

### EJS
- 


### SCSS , CSS
### Javascript (Typescript)
- 변수선언은 "var" 가 아닌 "const" , "let" 으로 합니다.
- 선택자는 id를 기준(#)하여 선택합니다.
```html
<div id="exampleDiv" class="exampleDiv">example</div>
<ul id="example">
    <li class="item">사과</li>
    <li class="item">배</li>
    <li class="item">오렌지</li>
</ul>
<script>
    
    const selectorDivX = ".exampleDiv"; // (X)
    const selectorDivO = "#exampleDiv"; // (O)

    const selectorItemX = ".item"; // (X)
    const selectorItemO = "#example .item"; // (O)
</script>
```
- Boolean형 변수는 "is"을 앞에 븥도록 권고합니다.
- 


### Typescript
- any는 미사용합니다.
- Type은 "T" 대문자 및 파스칼케이스로 사용합니다.
- Interface는 "I" 대문자 및 파스칼케이스로 사용합니다.
- Enum 선언은 파스칼케이스로 사용합니다.
```typescript
type example = string; // (X) , "T"로 시작 안함
type Texample = string; // (X) , 카멜케이스로 선언됨
type TExample = string; // (O)

interface exampleInterface {}; // (X) , "T"로 시작 안함
interface I_example_interface {}; // (X) , 스네이크 케이스로 선언됨
interface IExampleInterface {}; // (O)

enum exampleEnum {APPLE:"apple",ORANGE:"orange"}; // (X) , 카멜케이크로 선언됨
enum ExampleEnum {APPLE:"apple",ORANGE:"orange"}; // (O)
```

### Framework (React , Vue)
- 컴포넌트명은 파스칼케이스를 사용합니다.
- inline 스타일 선언을 지양합니다.
- 함수형 컴포넌트를 기본으로 합니다.


