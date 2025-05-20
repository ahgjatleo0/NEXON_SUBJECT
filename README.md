# 이벤트 / 보상 관리 플랫폼 (Backend)

## 프로젝트 개요
이 프로젝트는 **NestJS 기반의 이벤트/보상 관리 시스템**을 구축하는 과제입니다.  
이 시스템은 **JWT 인증**, **이벤트 생성/관리**, **보상 등록 및 요청**, **관리자 승인** 등의 주요 기능을 포함하고 있습니다.  
프로젝트는 **Microservices Architecture(MSA)** 패턴을 채택하여 `auth`, `event`, `gateway` 서버를 구성하며, **MongoDB**를 데이터베이스로 사용합니다.

## 기술 스택
- **Node.js** (v18)
- **NestJS** (최신 버전)
- **MongoDB** (데이터베이스)
- **JWT** (인증)
- **Docker & Docker Compose** (배포 및 실행)
- **TypeScript** (개발 언어)

## 프로젝트 구조
- **auth_service**: 유저 정보 관리, 로그인, JWT 발급
- **event_service**: 이벤트 생성, 보상 정의, 보상 요청 처리
- **gateway_service**: 모든 API 요청의 진입점, 인증 및 권한 검사, 라우팅
- **mongodb**: 데이터베이스

### 프로젝트 디렉토리 구조

```bash
NEXON_SUBJECT/
├── auth/                       # Auth 서버
├── event/                      # Event 서버
├── gateway/                    # Gateway 서버
├── docker-compose.yml          # Docker Compose 구성 파일
└── README.md                   # 프로젝트 문서
실행 방법
1. 프로젝트 클론
bash
복사
편집
git clone https://github.com/yourusername/nexon_subject.git
cd nexon_subject
2. Docker Compose로 실행
Docker와 Docker Compose를 사용하여 모든 서버를 동시에 실행할 수 있습니다.

bash
복사
편집
# 모든 서비스 및 컨테이너를 빌드하고 실행
docker-compose up --build
서비스 설명:

auth_service: 유저 정보 관리, 로그인, JWT 발급

event_service: 이벤트 및 보상 관리

gateway_service: 모든 API 요청을 받아 라우팅, 인증 및 권한 검사

MongoDB: 데이터베이스 (기본 포트: 27017)

3. 서비스 상태 확인
Auth 서버: http://localhost:3001

Event 서버: http://localhost:3002

Gateway 서버: http://localhost:3000

4. 테스트 코드 실행
e2e-runner를 사용하여 Docker 환경에서 자동 테스트를 실행할 수 있습니다.

bash
복사
편집
docker-compose up --build e2e-runner
테스트가 성공적으로 실행되면, 해당 테스트 결과는 터미널에 출력됩니다.

5. Docker 컨테이너 로그 확인
실행 중인 Docker 컨테이너의 로그를 확인하려면 다음 명령어를 사용하세요:

bash
복사
편집
docker logs <container_name>
예를 들어, gateway_service의 로그를 확인하려면:

bash
복사
편집
docker logs gateway_service
API 문서
1. 회원가입 (POST /auth/user/register)
요청 본문:

json
복사
편집
{
  "email": "user1@example.com",
  "password": "1234",
  "nickname": "유저1"
}
응답: 201 Created

2. 로그인 (POST /auth/user/login)
요청 본문:

json
복사
편집
{
  "email": "user1@example.com",
  "password": "1234"
}
응답: 201 Created, { "access_token": "jwt_token" }

3. 이벤트 등록 (POST /events)
요청 본문:

json
복사
편집
{
  "title": "출석 이벤트",
  "description": "매일 1000포인트",
  "startAt": "2025-05-20T00:00:00",
  "endAt": "2025-05-25T00:00:00",
  "isActive": true
}
응답: 201 Created

4. 보상 등록 (POST /rewards)
요청 본문:

json
복사
편집
{
  "type": "포인트",
  "amount": 1000,
  "description": "출석 보상",
  "eventId": "event_id"
}
응답: 201 Created

5. 보상 요청 생성 (POST /reward-requests)
요청 본문:

json
복사
편집
{
  "rewardId": "reward_id"
}
응답: 201 Created

6. 보상 요청 상태 변경 (PATCH /reward-requests/{id}/status)
요청 본문:

json
복사
편집
{
  "status": "APPROVED"
}
응답: 200 OK

문제 해결
1. 포트 충돌 문제
Docker에서 실행 중인 서비스가 이미 포트를 사용하고 있을 수 있습니다. 이 경우 다음 명령어로 포트를 확인하고, 충돌을 해결해야 합니다.

bash
복사
편집
netstat -ano | findstr :3001
2. MongoDB 연결 문제
MongoDB 연결이 되지 않는 경우, .env 파일에서 MongoDB의 URI 설정을 확인하고, docker-compose.yml에서 MongoDB 서비스를 제대로 연결했는지 확인하세요.

env
복사
편집
MONGO_URI=mongodb://mongodb:27017/your-db-name
참고 문서
NestJS 공식 문서

MongoDB 공식 문서

Docker Compose 공식 문서

프로젝트 유지보수
문제 발생 시 해결 방법: 각 서비스 컨테이너의 로그를 확인하고, 문제가 발생한 서비스를 재시작합니다.

추가 기능 구현: 서비스 간 통신, 성능 최적화, API 보안 강화 등을 추가로 구현할 수 있습니다.

📝 최종 제출
이 프로젝트는 NestJS + MSA + MongoDB 기반으로 구현되었으며, Docker Compose를 통해 실행 환경을 구성했습니다.
모든 기능은 Docker 환경에서 테스트되고 실행됩니다.

markdown
복사
편집

---

### ✅ **설명**

1. **프로젝트 개요**:
   - 요구사항을 정확히 반영한 **백엔드 시스템 설계**.
   - **Docker Compose**로 서비스를 실행하는 방법을 명시.

2. **실행 방법**:
   - **`docker-compose up --build`** 명령어를 통해 서비스를 한 번에 실행하는 방법.
   - 서비스와 포트 설정을 명확하게 설명.

3. **API 문서**:
   - 각 **API 경로**와 **요청/응답 예시**를 정리하여 실제 구현한 기능을 명시.

4. **문제 해결**:
   - **포트 충돌** 및 **MongoDB 연결** 문제 해결 방법을 구체적으로 안내.

---