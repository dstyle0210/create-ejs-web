<!--
가이드는, 프로젝트 완료 후, 최종산출물에 대한 정의를 제공하며,
본 프로젝트의 결과에 대한 최종 정보를 제공합니다.
아래는 간단하게 작성되어있으므로, 프로젝트에 맞게 추가 및 가공하여 제공합니다.
npm run build 시에 같이 빌드됩니다.(기존설정 기준 ./build/@guide 폴더에 저장됩니다)
-->

# 프로젝트 명
본 "프로젝트명" 프로젝트는 아래와 같은 환경을 기준으로 퍼블리싱 되었습니다.

## 프로젝트 가이드
### 지원환경
|항목|설정
|---|---|
| 사용언어 | HTML5, CSS3 , Javascript
| 인코딩 | UTF-8
| 지원 PC 브라우저 | Edge, Chrome, Firefox
| 지원 모바일 브라우저 | 삼성인터넷브라우저, 크롬브라우저
| PC 해상도 기준 | 1200px * auto (width * height)
| 모바일 해상도 기준 | 320px ~ 1199px (width)
| 레이아웃유형 | 반응형웹
| 반응기준 | mobile( ~ 767px) , tablet(768px ~ 1023px) , pc (1024px ~ )

### 레이아웃
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1, target-densitydpi=medium-dpi, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <!-- Open Graph -->
    <!-- Favicon -->
    <!-- TITLE -->
    <title>타이틀</title>

    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/style.css" />

    <!-- JS -->
    <script src="/assets/lib/jquery/jquery-3.7.1.min.js"></script>
    <script defer src="/assets/js/main.js"></script>
</head>
<body>
<header>공통헤더</header>
<main>본문</main>
<footer>공통풋터</footer>
</body>
</html>
```

### 사이트맵
퍼블리싱 된 모든 페이지 목록 입니다.
- [사이트맵 이동](http://localshot:3000/sitemap.html)




