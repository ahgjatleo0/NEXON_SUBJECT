# 이벤트 / 보상 관리 플랫폼 구축

## 📚 프로젝트 소개

이 프로젝트는 **이벤트 및 보상 관리 시스템**을 구축하기 위한 백엔드 애플리케이션입니다. 운영자가 이벤트와 보상을 설정하고, 유저가 조건을 충족하면 보상을 요청할 수 있는 시스템을 제공합니다. 이 시스템은 효율적인 보상 관리 및 자동화를 목적으로 개발되었습니다.

## 🎯 목표

- 이벤트 등록, 보상 정의, 유저 보상 요청
- 관리자와 감사자가 보상 요청을 확인하고 승인/거절할 수 있는 기능 제공
- **JWT** 인증 및 **권한 제어** (운영자, 관리자, 유저 역할 구분)

## 🔧 기술 스택

- **Node.js** (18.x)
- **NestJS** (최신 버전)
- **MongoDB** (데이터베이스)
- **JWT** (인증)
- **Docker** (배포 및 실행 환경)
- **TypeScript** (언어)

## 🧩 프로젝트 구조

이 프로젝트는 **MSA(Microservice Architecture)** 구조를 따릅니다.

### 1. Auth Server
- **유저 관리** (회원가입, 로그인)
- **JWT 발급** 및 **역할 관리**

### 2. Event Server
- **이벤트 생성 및 조회**
- **보상 정의** (포인트, 아이템, 쿠폰 등)
- **보상 요청 처리** (유저 요청 검증, 상태 관리)

### 3. Gateway Server
- **API 요청의 진입점** 역할
- 모든 요청을 라우팅하고, 인증 및 권한 검사를 담당합니다.

## ⚡️ 실행 방법

### 1. 프로젝트 클론

먼저 GitHub에서 프로젝트를 클론합니다:

```bash
git clone https://github.com/ahgjatleo0/NEXON_SUBJECT.git
cd reword_event
```

2. 환경 설정
각 서버 (auth, event, gateway)의 의존성을 설치합니다:

```bash
cd auth && npm install
cd ../event && npm install
cd ../gateway && npm install
```

3. Docker 환경 설정 (선택)
Docker를 사용하여 각 서버를 하나의 네트워크에서 실행할 수 있습니다. docker-compose.yml 파일을 사용하여 전체 서비스를 한 번에 실행할 수 있습니다.

```bash
docker-compose up --build
```

4. 로컬 환경에서 실행
각 서버를 로컬에서 실행하려면 아래 명령어를 사용합니다:
```
bash
# Auth 서버 실행
cd auth
npm run start:dev
```

```
bash
# Event 서버 실행
cd ../event
npm run start:dev
```

```
bash
# Gateway 서버 실행
cd ../gateway
npm run start:dev
```

5. 환경변수 설정
각 서버의 .env 파일에 환경변수를 설정합니다. 예시:

```
bash
# auth/.env 예시
DATABASE_URL=mongodb://localhost:27017/authdb
JWT_SECRET=your-secret-key

# event/.env 예시
DATABASE_URL=mongodb://localhost:27017/eventdb
JWT_SECRET=your-secret-key
```

🧪 테스트 방법
1. 서버 실행 확인
서버가 정상적으로 실행되었는지 확인하려면 아래 URL을 통해 각 서버에 접근합니다:

Auth Server: http://localhost:3001

Event Server: http://localhost:3002

Gateway Server: http://localhost:3000

2. 테스트 실행
각 서버의 디렉토리에서 다음 명령어를 실행하여 단위 테스트를 실행할 수 있습니다:

```bash
# Auth 서버 테스트
cd auth
npm run test

# Event 서버 테스트
cd ../event
npm run test

# Gateway 서버 테스트
cd ../gateway
npm run test
```

3. API 테스트 (Postman)
Postman을 사용하여 API를 테스트합니다:

POST /auth/register: 유저 등록

POST /auth/login: 로그인 및 JWT 발급

GET /events: 이벤트 조회

POST /rewards: 보상 등록

POST /reward-requests: 보상 요청

4. API 예시
```bash
# 유저 생성 예시
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "user123"
}

# 로그인 예시
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# 이벤트 생성 예시
POST /event/create
{
  "name": "Login Event",
  "condition": "login 3 days",
  "reward": "100 points",
  "duration": "2025-06-30"
}

# 보상 요청 예시
POST /reward-requests
{
  "rewardId": "682b3721b6431e97e1557e56", 
  "status": "PENDING"
}
```
🔐 인증 및 권한 제어
JWT 인증: 모든 요청은 JWT 토큰을 통해 인증됩니다.

권한 제어: RolesGuard와 @Roles() 데코레이터를 사용하여 역할에 따른 접근 제어가 이루어집니다.

🚀 성능 최적화 및 확장성
이 프로젝트는 MSA(Microservice Architecture) 구조로 설계되었으며, 각 서버는 독립적으로 실행되면서도 서로 연결되어 작동합니다. 각 서비스는 확장성을 고려하여 설계되었으며, 향후 추가 기능 및 서비스를 손쉽게 통합할 수 있습니다.

확장 가능성
새로운 이벤트 유형과 보상 시스템을 추가할 수 있는 유연성

추가 인증 방식(예: OAuth, Social Login) 지원

API rate limiting 및 보안 강화를 통한 대규모 서비스 운영

📝 결론
이 시스템은 실제 프로덕션 환경에 적용 가능한 효율적인 보상 관리 시스템으로, 이벤트 및 보상 관리의 자동화를 통해 운영 효율성을 크게 개선할 수 있습니다. Docker와 Kubernetes 등을 사용하여 배포 및 운영을 더욱 안정적이고 효율적으로 할 수 있습니다.

### 개선 사항 및 설명:
- **프로젝트 구조**와 각 서버의 기능에 대한 **자세한 설명**을 추가했습니다.
- **확장성**과 **성능 최적화** 측면에서 이 프로젝트의 **실제 적용 가능성**을 강조했습니다.
- **Docker**를 사용한 배포 및 실행 방법, **테스트** 절차를 보다 구체적으로 설명하여 
