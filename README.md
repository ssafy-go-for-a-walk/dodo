<img src="https://i.ibb.co/DRS4Zs6/logo.png" />

## 사용자 맞춤형 버킷리스트 제작 사이트 (23.02.20 ~ 23.04.07)



### Contributors 👩‍👧‍👧

|                           BackEnd                            |                           BackEnd                            |                           BackEnd                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.ibb.co/1Qh4BJQ/Image-Pasted-at-2023-4-6-15-29.jpg" height="200px"/> | <img src="https://i.ibb.co/VWXtTnr/Image-Pasted-at-2023-4-6-15-29-2.png" height="200px"/> | <img src="https://i.ibb.co/bB30NK8/Image-Pasted-at-2023-4-6-15-29-1.png" height="200px"/> |
|                           😀 김종성                           |                           💜 이희진                           |                           🍀 염유리                           |

|                           FrontEnd                           |                           FrontEnd                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.ibb.co/f8G2CwJ/Kakao-Talk-20230316-184621852.jpg" height="200px"/> | <img src="https://i.ibb.co/3YwdfYz/Image-Pasted-at-2023-4-6-15-29-3.png" height="200px"/> |
| 😎 박승재|                           🐭 이진욱                           |



<hr />

### 서비스 배경

버킷리스트를 작성해본 경험이 있나요?

보통 버킷리스트를 만들 때 열심히 검색해보고 고민하여 종이에 작성합니다.

그 후 시간이 지나면 작성한 버킷리스트를 잃어버리거나 작성한 사실을 까먹기도 합니다.

이러한 이유로 프로젝트 "Do? Do!"를 제작하게 되었습니다.



### 서비스 설명

"Do? Do!"는 간단한 설문조사를 통해 사용자의 성향을 파악하여 성향에 맞는 Challenge(버킷)을 추천해줍니다.

간편한 로그인과 이메일 리마인드를 위하여 카카오로그인을 제공합니다.

사용자는 여러개의 버킷리스트를 만들 수 있고 친구들끼리 같이 만들 수 있는 그룹 버킷리스트도 제공합니다.

사용자가 일정 기간 담은 Challenge(버킷)을 완료하지 않는다면 카카오에 등록된 이메일로 리마인드 메일이 도착하게 됩니다.

완료한 Challenge(버킷)에 대하여 경험을 작성할 수 있는 경험일기 기능 또한 제공합니다.

마지막으로 작성된 버킷리스트를 서로 공유하고 이미지 파일로 내보낼 수 있습니다.



### 개발 환경 및 기술 스택

#### FrontEnd

- HTML
- Styled Component
- JavaScript
- Node.js
- React
- Redux
- Router-Dom



#### BackEnd

- Spring Boot 2.7.9
- Gradle
- JPA
- openjdk 11
  - https://github.com/ojdkbuild/ojdkbuild
  - https://jdk.java.net/java-se-ri/11
- MySQL Driver
- FAST API



#### Infra

- Docker
- Jenkins
- EC2
- S3
  - RDS



#### 버전/이슈 관리

- Jira
- Gitlab
- Notion



#### Tool

- Postman
- Figma
- ERDcloud



#### 서비스 구조도

<img src="https://i.ibb.co/VN4MTcz/SSAFY-DODO-1.png" />



#### ERD

<img src="https://user-images.githubusercontent.com/43941336/230526103-f6ce14f7-d618-4cb5-af5e-82fb50ab761d.png" />

#### Figma

- <a href="https://www.figma.com/file/aoJdWaHvSGDClShwiXPxUW/B104?node-id=0-1">Figma</a>



### 주요 기능

#### 설문조사

![설문](https://user-images.githubusercontent.com/109258034/230552400-5fa39ba5-33b0-46ed-a75e-23b4fbc8e1b5.gif)

- 사용자의 취향을 알기 위한 사전 설문 페이지입니다.
- 많은 양의 버킷리스트를 보여주기 위하여 무한 스크롤을 적용했습니다.



#### 추천 서비스

![추천](https://user-images.githubusercontent.com/109258034/230553186-86ff8ad7-c7c8-4a01-b8dd-29ff4f047fea.gif)

- 추천 알고리즘을 적용한 검색 페이지입니다.
- 검색어를 입력하여 검색시 검색기능이 되고 전체 카테고리를 클릭시 추천 알고리즘에 의한 결과가 나오게 됩니다.
- 무한스크롤이 적용되었습니다.



#### 관리 페이지

![관리](https://user-images.githubusercontent.com/109258034/230553255-cb3fe351-b8d1-4a96-8cd0-00ec5da6ee69.gif)

<br />

![경험일기 모아보기](https://user-images.githubusercontent.com/109258034/230553401-2a1a7335-1b50-4216-be4e-1ae5f9025a76.gif)

<br />

<img src="https://i.ibb.co/NxBZDHQ/image.png" height="400px" weight="500px" />

- 관리페이지에서는 담아놓은 버킷리스트를 확인할 수 있고 경험일기를 작성할 수 있습니다.
- 경험일기 탭에서 그동안 작성한 경험일기를 모아볼 수 있습니다.
- 설정 탭에서 버킷리스트의 사진, 이름, 공개여부, 공유하기, 내보내기 기능이 있습니다.



#### 구경하기

![소셜](https://user-images.githubusercontent.com/109258034/230552806-05bf694d-1be5-4dbb-908f-a06a5a55bd6f.gif)

- 관리 페이지에서 공개한 버킷리스트들을 나와 유사한 성향을 가진 유저를 찾아내서 구경할 수 있습니다.
- 무한스크롤이 적용되었습니다.



#### 버킷리스트 생성

<img src="https://i.ibb.co/KLRhSmY/1.png" height="400px" weight="500px" />

<br />

<img src="https://i.ibb.co/tHwk8gz/2.png" height="400px" weight="500px" />

- 나의 버킷리스트와 그룹 버킷리스트를 생성할 수 있습니다.



#### 그룹 버킷리스트 참여

<img src="https://i.ibb.co/9V3jQGQ/image.png" />

<br />

<img src="https://i.ibb.co/kcHZSyk/image.png" height="400px" weight="500px"/>

- 관리페이지의 설정 탭의 참여코드 생성으로 참여코드를 생성하여 참여코드를 통해 그룹 버킷리스트에 참여할 수 있습니다.



