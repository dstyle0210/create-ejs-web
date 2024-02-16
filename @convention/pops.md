<!--
컨벤션은, 웹퍼블리싱 작업자들 사이에서,
본 프로젝트를 이용해서 개발하는 과정에 도움을 주기 위한 설명서 입니다.
-->
# POPS
- pops 는 pop(뛰어오르다) 계열의 popup , modal , nonmodal 을 통칭합니다.
- popup은 ```./pages/popup``` 으로 존재
- modal 은 ```./uikit/modal``` 에 존재
- non-modal 은 ```./uikit/nonmodal``` 에 존재



---

## popup
- 팝업은 새로운 페이지로서 온전한 하나의 페이지를 가지고 있습니다.
- opener 를 가지게 됩니다.

### page와 popup의 구분
- ```./pages``` 는 웹사이트의 본문을 표시
- ```./pops/popup``` 은 웹사이트의 본문이 opener가 되는 신규페이지로 봐야함.

---

## modal
- 모달은 페이지 내부에서 발생하는 레이어의 일종입니다.
- 배경(dimmed or scrim)을 통해 발생시킨 페이지의 기능을 제한합니다.
- 페이지 전환 없이 새로운 입력이나, 공지를 위해 사용합니다.

### modal : 대표적 구분
- Dialog : 딤드내 가운데 표시되는 경우가 많음.
  - alert
  - confirm
  - select List (or link List)
- Side Sheet : 뷰포트중 한변 이상을 전체 사용하는 경우가 많음.
  - fullScreen
  - sideBar
  - dockBar (bottomBar)

---

## non-modal
- 논모달은 페이지 내부에서 발생하는 레이어의 일종입니다.
- 배경이 없이 발생하여, 페이지의 기능을 사용할수 있게 합니다.
- 단순공지나, 별도의 기능 제공을 위해 사용합니다.

### non-modal : 대표적 구분
- tooltip : 특정 항목에 위치하여 설명해 주는 툴팁영역
- snackbar : alert 대신 사용하는 push 같은 노티
- linkList : 특정 버튼에 속한 링크목록표시
- banner : 특정영역 위로 올라오는 베너 (대부분 "X" 기능을 포함함)


---

#### 참고
- [모달과 팝업, 정확히 알아야 하는 이유](https://brunch.co.kr/@tigrisdesign/3)