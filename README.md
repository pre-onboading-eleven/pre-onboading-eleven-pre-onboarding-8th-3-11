## 시작하기

```
npm install
npm run dev
```

## 캐싱 구현 방법

1. 검색해야 하는 데이터는 <b>병명 코드</b>로서, 검색결과가 바뀔 가능성은 상당히 낮습니다. 따라서 캐싱을 위해 로컬의 Web Storage를 사용했고, 검색결과가 영구적이지는 않으므로 Session Storage를 사용했습니다.
2. 검색한 정보는 전부 캐싱 했고, 검색 효율성을 위해 검색결과가 없는 경우와 있는 경우를 나눠서 저장했습니다.
3. 만일 검색한 정보가 Session Storage가 존재하면(캐시라면) 꺼내와서 정보를 표출합니다. 없다면 서버에 정보를 요청합니다.
4. 사용자가 타이핑 하는 모든 글자에 결과를 줄 필요는 없으므로 500ms의 debounce를 주었습니다.

## 특장점

- 관심사 분리와 의존성 역전을 위해 Class, Context API를 활용했습니다.
- 과제 시작 전에 사용할 모든 기술을 미리 맞춰둬 소통이 원활했습니다.




## 유의점

- HTTP 요청이 http://localhost:4000/sick 으로 됩니다. 이를 위해 먼저 로컬 서버를 돌려주세요.

# 원티드 프리온보딩 3주차 과제

## 🤝 과제 
- 
- 기간: 

## ✈️ 배포 링크


## 👨‍👩‍👧‍👦 팀 소개

<table>
<tr>
    <td align="center">
        <a href="https://github.com/hozunlee">
        <img src="https://avatars.githubusercontent.com/u/60101732?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@hozunlee</b></sub>
        <br />
        <sub><b>이호준(팀장)</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/8dong">
        <img src="https://avatars.githubusercontent.com/u/96307662?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@8dong</b></sub>
        <br />
        <sub><b>김동현</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/yesharry">
        <img src="https://avatars.githubusercontent.com/u/101863209?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@yesharry</b></sub>
        <br />
        <sub><b>노해리</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/blan19">
        <img src="https://avatars.githubusercontent.com/u/66871265?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@blan19</b></sub>
        <br />
        <sub><b>박준서</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center">
        <a href="https://github.com/gandy818">
        <img src="https://avatars.githubusercontent.com/u/67881881?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@gandy818</b></sub>
        <br />
        <sub><b>유나영</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/perago">
        <img src="https://avatars.githubusercontent.com/u/99804262?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@perago</b></sub>
        <br />
        <sub><b>장태경</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/homile">
        <img src="https://avatars.githubusercontent.com/u/56163157?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@homile</b></sub>
        <br />
        <sub><b>조민우</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ALSRUD29">
        <img src="https://avatars.githubusercontent.com/u/107922059?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@ALSRUD29</b></sub>
        <br />
        <sub><b>박민경</b></sub>
        </a>
    </td>
</tr>
</table>

## ⚡️ 프로젝트 실행 방법

```
npm install
npm run dev

```

## 🌲 src 폴더 구조
```

```


## 🎬 기능 소개(gif)

```


##⚒️ 기술 스택 / 라이브러리

TypeScript, React, tailwindCss, recoil

## 📝 Commit message Convention & branch 전략

- commit message


| Type             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| feat             | 새로운 기능 추가                                             |
| fix              | 버그 수정                                                    |
| docs             | 문서 수정                                                    |
| style            | 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우     |
| refactor         | 코드 리팩터링                                                |
| test             | 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X) |
| merge            | 브랜치간 병합, 충돌 해결 |
| chore            | 빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)     |
| design           | CSS 등 사용자 UI 디자인 변경                                 |
| comment          | 필요한 주석 추가 및 변경                                     |
| rename           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| remove           | 파일을 삭제하는 작업만 수행한 경우                           |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                       |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야 하는 경우                      |

- branch 전략

| Branch Name | Description                                                        |
| ----------- | ----------------------------------------------------------------- |
|    main     | 배포 및 최종본, 출시 버전 브랜치                                    |
|     dev     | 개발 단계 브랜치. dev 브랜치에서 에러가 안 날 경우에만 최종적으로 main으로 push 가능 |
|    feat/    | 세부 기능 개발 단계 브랜치                                          |
|   design/   | 디자인 작업 단계 브랜치                                             |
|    docs/    | 문서 작업 브랜치                                                    |

