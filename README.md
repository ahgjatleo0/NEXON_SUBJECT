# 🎯 이벤트 / 보상 관리 플랫폼

NestJS + MongoDB + Docker 기반의 이벤트/보상 자동화 시스템입니다.  
유저 행동 기반 조건 검증 및 보상 자동 지급 흐름을 MSA 구조로 구현하였습니다.

---

## 📦 프로젝트 구조

NEXON_SUBJECT/
├── gateway/ # API 진입점, 인증/인가 및 라우팅
├── auth/ # 유저 관리, JWT 인증, 역할 시스템
├── event/ # 이벤트 생성, 보상 요청 처리
├── docker-compose.yml
└── README.md

yaml

---

## 🚀 실행 방법 (Docker Compose)

```bash
# 루트 디렉토리에서 실행
docker-compose up --build
✅ 서버 확인
Gateway API: http://localhost:3000

MongoDB: mongodb://localhost:27017/

🧱 사용 기술
항목	스택/도구
언어	TypeScript
런타임	Node.js 18
프레임워크	NestJS
DB	MongoDB
인증	JWT
배포	Docker + docker-compose

🔐 역할(Role) 정의
역할	권한 설명
USER	이벤트 보상 요청 가능
OPERATOR	이벤트 생성, 보상 등록 가능
AUDITOR	보상 요청/지급 내역 조회 가능
ADMIN	모든 기능 접근 가능

📌 주요 기능
✅ 공통
JWT 기반 인증 / 인가

역할 기반 접근 제어 (RolesGuard)

✅ Auth 서버
유저 등록 / 로그인 / 역할 부여

JWT 발급 및 검증

✅ Event 서버
이벤트 등록 / 조회 (조건, 기간, 상태 포함)

보상 등록 / 조회 (포인트, 아이템, 쿠폰 등)

조건 검증 기반 보상 요청 처리

요청 중복 방지 및 지급 상태 기록

유저별 / 관리자별 보상 이력 확인

🔄 이벤트 조건 예시
3일 연속 로그인

친구 3명 초대

특정 퀘스트 클리어

이벤트 조건은 동적으로 정의 가능하며, 실제 유저 행동 데이터 기반으로 검증합니다.

✅ API 예시 (요약)
POST /event
Authorization: Bearer <token>
Body:
{
  "title": "3일 연속 로그인 보상",
  "condition": "login_3_days",
  "reward": {
    "type": "point",
    "amount": 1000
  }
}
Swagger 또는 Postman 컬렉션 제공 예정

🧪 테스트
일부 서비스는 단위 테스트 포함 (예: Auth, 보상 중복 검사)

향후 통합 테스트 추가 예정

# 예시
cd auth
npm run test
🧠 설계 철학 및 의도
MSA 구조로 기능 분리를 통해 유지보수성과 확장성 고려

실무 상황을 반영한 역할 기반 권한 시스템

동적인 이벤트 조건 정의로 다양한 이벤트 적용 가능

실제 서비스에서도 운영 가능한 구조를 목표로 구현

🙋‍♂️ 향후 개선 방향 (선택사항)
보상 지급 실패 시 재시도 로직 추가

이벤트 자동 시작/종료 스케줄러 추가

Redis 기반 캐싱 및 알림 시스템 연동

Webhook / MQ 기반 알림 시스템 구성