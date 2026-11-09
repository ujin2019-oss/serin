# SÉRIN — Beauty, from within.

프리미엄 이너뷰티 브랜드의 포트폴리오용 가상 홈페이지입니다. HTML5, CSS3, Vanilla JavaScript로 제작했으며 프레임워크와 런타임 외부 서비스에 의존하지 않습니다.

**본 웹사이트는 포트폴리오 목적으로 제작된 가상 브랜드 데모입니다.**

최신 UI/UX 개선 내용과 검수 범위는 [종합 개선 보고서](docs/uiux-improvement-report.md)를 참고하세요. 기존 가상 구성·단가로 수량과 선택 금액을 확인하는 계산 데모, 모바일 Ritual scroll-snap, 가독성 개선을 추가했습니다. 실제 주문·결제는 제공하지 않습니다.


## 실행

가장 간단하게 `index.html`을 브라우저에서 열면 됩니다. 이미지·폰트를 모두 로컬에 포함했습니다.

로컬 HTTP 미리보기는 Node.js가 설치된 환경에서 실행합니다. 서버 실행에는 npm 패키지 설치가 필요하지 않습니다.

```powershell
cd C:\Users\luk_9\OneDrive\Documents\Git_Work\otherpr\serinpr
npm run dev
```

브라우저에서 **http://127.0.0.1:4173** 접속. 종료는 `Ctrl+C`.

개발 도구를 다시 설치하거나 이미지 최적화·검수를 실행하려면:

```powershell
npm ci
npm run optimize
npm run check
```

## 생성 파일

```text
serinpr/
├── index.html                  # 10개 섹션, 제품 상세, 저널 3편, 데모 안내
├── css/
│   ├── style.css               # 디자인 토큰, 타이포그래피, 레이아웃·인터랙션
│   └── responsive.css          # 데스크톱·태블릿·모바일 규칙
├── js/main.js                  # 모바일 메뉴, 갤러리, 상세창, 스크롤 등장
├── assets/
│   ├── favicon.svg
│   ├── fonts/                  # Manrope·Pretendard WOFF2 및 OFL 라이선스
│   └── images/                 # 컨셉 화보 15종 PNG·WebP, 반응형/썸네일 파생본
├── docs/
│   ├── reference-analysis.md   # 실제 확인 범위와 디자인 적용 근거
│   ├── image-prompts.md        # 이미지 제작 방식과 프롬프트
│   ├── assets.json             # 이미지 경로·프롬프트 매니페스트
│   └── qa-report.md            # 검수 결과와 미확인 사항
├── tools/
│   ├── serve.mjs               # 로컬 정적 HTTP 서버
│   ├── optimize-images.mjs     # PNG → WebP, 파생 이미지 생성
│   ├── fetch-fonts.mjs         # 공식 배포처에서 폰트·라이선스 다운로드
│   ├── asset-contact-sheet.mjs # 이미지 QA 시트 생성
│   ├── check.mjs               # 구조·로컬 경로·폰트 형식 검수
│   ├── check-interactions.mjs  # 브라우저 외 DOM 통합 동작 검수
│   └── check-responsive.mjs    # 지정 너비의 CSS 규칙 검수 (렌더링 아님)
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

기존 폴더는 비어 있었으며 기존 프로젝트 파일을 삭제하거나 덮어쓰지 않았습니다. `node_modules/`는 개발 도구 설치 결과이며 배포에 필요하지 않습니다. `.preview/`는 이미지 검수용 임시 파일입니다.

## 적용 이미지

모든 화보는 내장 **image_gen**으로 직접 생성했습니다. 제품·일상 화보는 `hero-master`의 패키지를 참조했고, 모델 상세 화보는 `campaign-main`과 패키지를 함께 참조했습니다. 원본과 WebP는 `assets/images/`에 있습니다. 이후 모델이 등장하는 캠페인 2종은 사용자 제공 인물·올리브색 의상을 기준으로 교체했습니다. 이전 화보는 보존하며 현재 경로와 편집 프롬프트는 `docs/model-update.md`에 기록했습니다.

| 이미지명 | 사용 위치 |
| --- | --- |
| hero-full-v2 / hero-full-v2-mobile | 첫 번째 히어로·제품 화보 및 반응형 세로 구도 |
| hero-sensory / hero-sensory-mobile | 두 번째 히어로·젤리 질감 및 반응형 세로 구도 |
| philosophy | 브랜드 철학 |
| product-group | 박스·스틱 그룹 및 제품 상세 |
| product-box | 제품 갤러리 박스 이미지 |
| product-stick | 제품 갤러리 개별 스틱 |
| texture-macro | 젤리 매크로 |
| texture-peach | 화이트 피치 맛 기획 |
| ritual-morning | 아침 일상 |
| ritual-work | 업무 중 휴식 |
| ritual-travel | 외출·여행 |
| campaign-main-model-v2 | 사용자 제공 사진 기준 모델·올리브색 의상 캠페인 |
| campaign-detail-model-v2 | 동일 모델·올리브색 의상과 제품 사용 장면 |
| journal-beauty | 아름다움의 기준 저널 |
| journal-ritual | 자기관리 루틴 저널 |
| journal-ingredients | 원료 정보 저널 |

최초 제작 이미지와 이후 교체 이미지를 함께 보존합니다. 현재 히어로는 전체 배경 이미지와 세로 구도 파생본으로 교체했으며, 상세 경로와 프롬프트는 `docs/hero-update.md`에 있습니다. 히어로는 `srcset`·고우선순위 로딩, 본문 이미지는 lazy loading을 사용합니다. Manrope·Pretendard는 프로젝트 내 로컬 파일로 로드합니다.

## 구현 내용

히어로는 제품 화보와 젤리 질감 화보의 2장으로 구성됩니다. 기본 3초 간격으로 자동 전환되며 화살표·선택 점·키보드·모바일 스와이프로도 조작할 수 있습니다. 재생·일시정지 버튼을 제공하고, 마우스 hover·키보드 포커스·화면 밖·비활성 탭에서는 일시정지합니다. 모션 감소 설정에서는 자동 재생을 기본으로 중지합니다. 두 번째 장의 버튼은 맛·식감 섹션으로 연결됩니다. 제작 기록은 `docs/hero-sensory-slide.md`에 있습니다.

- 브랜드 인지 → 철학 → 제품 이해 → 원료 투명성 → 감각·일상 → 캠페인 → 저널 → FAQ → 브랜드 마무리의 10개 섹션.
- 반응형: 1100·850·700·374px 경계에서 레이아웃 조정. 모바일 전용 메뉴와 세로형 콘텐츠 순서.
- 제품 갤러리 3장 전환, 단일 구성·수량·선택 합계 계산 데모, 제품 상세 모달, 기존 본문이 있는 저널 3편.
- 모바일 Ritual은 CSS scroll-snap·이전/다음·키보드로 탐색하며 자동 재생하지 않습니다.
- 네이티브 `details/summary` FAQ 5개, 네이티브 `dialog` 상세창 6개.
- 메뉴 Escape 닫기·포커스 순환, 상세창 포커스 복원, skip link, 의미 있는 대체 텍스트.
- 스크롤 등장·이미지 hover·메뉴 등장·CTA hover, `prefers-reduced-motion` 지원.
- 가상 상품·미확정 배합·맛·식감·알레르기 상태와 실제 영업 정보 없음 표시.
- SEO·Open Graph 기본 메타 태그. 실제 배포 시 절대 URL을 추가해야 합니다.

## 검수 상태

`npm run check` 통과: 10개 섹션, 유일한 ID, 로컬 파일·앵커, 이미지 대체 텍스트·크기 속성, 폰트 WOFF2 형식, 상세창 연결, 메뉴·갤러리·모달의 DOM 통합 동작을 확인했습니다. 모든 생성 이미지도 직접 검토했습니다.

**실제 브라우저 렌더링 검수는 미완료입니다.** 브라우저 연결 호스트를 사용할 수 없었고, Windows 브라우저 도구가 현재 URL을 확인하지 못해 보안상 중단되었습니다. 다른 UI 자동화로 우회하지 않았습니다. 1440·1024·768·390px의 실제 렌더링, 키보드 포커스·네이티브 FAQ·모달 동작, 대비·겹침·크롭은 브라우저에서 최종 확인이 필요합니다. DOM 검수는 시각 검수나 브라우저 접근성 검수의 대체가 아닙니다.

SOOO의 공개 문서 구조·브랜드 철학·기술 아카이브는 확인했습니다. MONO ARCHIVE는 조회 도구 접근 오류로 직접 분석하지 못해 사용자가 제공한 에디토리얼 방향을 적용했습니다. 자세한 근거는 `docs/reference-analysis.md`에 기록했습니다.

## 미구현 및 실제 운영 전 보완

- 구매·결제·장바구니·회원가입·배송·문의 접수·뉴스레터·SNS 연동 없음. 관련 가상 성공 처리를 하지 않습니다.
- 제품 배합·함량·출처·알레르기·영양성분·섭취 지침 확정 및 검증 필요.
- 실제 가격·구성·사업자 정보·고객지원·정책 문서 준비 필요.
- 생성 이미지 패키지 인쇄의 미세한 자간 차이가 있어 양산 시 단일 패키지 아트워크와 실제 제품 사진으로 교체 권장.
- 실제 배포 도메인 설정 후 `og:image`, `og:url`, canonical 절대 주소와 공유 미리보기 검수 필요. 현재 로컬 결과물이며 배포하지 않았습니다.
