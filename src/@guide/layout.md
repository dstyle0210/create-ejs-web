# 레이아웃
본 "프로젝트명" 프로젝트 공통부분을 설명합니다.

## 헤더
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1, target-densitydpi=medium-dpi, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" >
    <meta property="og:site_name" content="사이트명" >
    <meta property="og:title" content="페이지 타이틀" >
    <meta property="og:description" content="페이지 설명" >
    <meta property="og:url" content="https://www.test.kr" >
    <meta property="og:image" content="이미지주소" >
    <meta property="og:image:url" content="이미지주소" >
    <meta property="og:image:type" content="image/jpeg" >
    <meta property="og:image:width" content="300" >
    <meta property="og:image:height" content="300" >
    
    <!-- TITLE -->
    <title>메인</title>

    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/base.css" />
    <link rel="stylesheet" href="/assets/css/layout.css" />
    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="stylesheet" href="/assets/css/sub.css" />

    <!-- JS -->
    <script type="text/javascript" charset="utf-8" src="/assets/lib/jquery/jquery-3.7.1.min.js"></script> <!-- jquery built-in-->
    <script type="text/javascript" charset="utf-8" src="/assets/js/main.js"></script>
</head>
<body>
    
<!-- [S] 본문 바로가기 빠른이동 -->
<div class="s-skipHeader"><a href="#mainContent" class="skipNav"><span>본문 바로가기</span></a></div>
<!-- // [S] 본문 바로가기 빠른이동 -->

<header>공통헤더</header>
```

## 풋터
```html
<footer>공통풋터</footer>
</body>
</html>
```
