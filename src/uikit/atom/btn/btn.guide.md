<!--
본 가이드는 사용법 예제를 위한 간단 가이드파일 입니다.
-->
# 버튼
프레임워크로 사용가능한 버튼들을 소개 합니다.

## ejs 컴포넌트
<div class="highlight">

```
<include src="@src/uikit/atom/btn/btn.ejs" props="프로퍼티객체"></include>
```

</div>

## 예제

### 기본형
<div class="example">
    <include src="@src/uikit/atom/btn/btn.ejs" props="{text:'버튼'}"></include>
</div>

### 목적에 따라
<div class="example"> 
    <include src="@src/uikit/atom/btn/btn.ejs" props="{preset:'submit'}"></include>
    <include src="@src/uikit/atom/btn/btn.ejs" props="{preset:'cancel'}"></include>
</div>

