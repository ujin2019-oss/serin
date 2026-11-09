# 히어로 두 번째 슬라이드 — A Sensory Moment.

사용자가 첨부한 젤리 질감 사진을 시각 레퍼런스로 삼아, 내장 image_gen 도구로 웹용 가로·세로 구도를 제작했습니다. 첨부 원본 파일을 그대로 복사한 것이 아니라 질감·조명·구도를 참고한 생성 편집본입니다.

## 현재 적용 파일

- `assets/images/hero-sensory.png` / `assets/images/hero-sensory.webp`: 데스크톱 1672×941
- `assets/images/hero-sensory-1024.webp`: 작은 가로 파생본
- `assets/images/hero-sensory-mobile.png` / `assets/images/hero-sensory-mobile.webp`: 850px 이하 세로 구도 1024×1536
- `assets/images/hero-sensory-mobile-768.webp`: 작은 세로 파생본

## 구성·동작

첫 장은 기존 제품 화보, 두 번째 장은 젤리 질감 화보입니다. 두 번째 카피는 ‘A Sensory Moment.’ / ‘매일의 루틴을 더 감각적으로.’이며, 버튼은 실제 `#sensory` 섹션으로 연결합니다. 맛·식감이 제품 개발 기획이고 사진이 컨셉 화보임을 명시했습니다.

이전·다음 화살표, 선택 점, 키보드 좌우 방향키, 모바일 수평 스와이프로 전환합니다. 기본 3초 간격으로 자동 재생합니다. 화면은 1.15초 페이드로 전환하고, 카피는 짧은 시차를 두어 부드럽게 나타납니다. 배경 사진에는 1.4% 범위의 느린 확대 해제 움직임을 적용했습니다. 재생·일시정지 버튼을 제공하며, hover·키보드 포커스·터치 조작 중·히어로가 화면 밖일 때·다른 탭을 볼 때에는 전환을 멈춥니다. 수동 조작 이후에는 다음 전환까지 다시 3초를 기다립니다. `prefers-reduced-motion`에서는 자동 재생을 기본 중지하고 전환 애니메이션을 끕니다. 사용자가 재생 버튼을 누르면 모션 감소 환경에서도 애니메이션 없이 자동 전환을 시작할 수 있습니다. 비활성 슬라이드는 `inert`와 `aria-hidden`으로 포커스·보조기기 탐색에서 제외하고 자동 전환 중에는 라이브 알림을 끄고, 정지·수동 조작 중에는 현재 화면을 라이브 영역으로 안내합니다. 모바일 세로 스크롤은 방해하지 않습니다.

번호형 제목·카운터는 다시 추가하지 않았습니다. 선택 점의 접근성 이름은 제품 이야기/맛과 식감 이야기입니다.

생성 결과의 질감·카피 공간을 직접 이미지로 확인했습니다. `npm run check`에서 이전·다음 순환, 직접 선택, 키보드, 수평 스와이프, 세로 제스처·취소 유지, 비활성 접근성 상태와 CTA 연결을 DOM 환경으로 검수했습니다. 가상 시계로 3초 주기·순환·hover/포커스 중지·재생/일시정지·비활성 탭 정지/재개·모션 감소 정지도 확인했습니다. 실제 브라우저의 시각·터치·포커스 검수를 했다는 의미는 아닙니다.

## 생성 프롬프트

### hero-sensory

Use case: style-transfer / faithful responsive reframing. Use the attached landscape jelly photograph as the authoritative visual reference. Create a premium SÉRIN wellness website SECOND HERO photograph that faithfully keeps its translucent pale champagne-gold jelly folds, warm ivory ceramic plate, soft natural sunlight and luminous caustics, subtle botanical leaf shadows near upper left, real tactile ivory tabletop. ONE continuous scene, wide 16:9 landscape, ideally 1672x941 or larger. Place all sculptural jelly and the plate mainly in the RIGHT 52 percent. LEFT 45 percent is an unobstructed light warm ivory photographed background with gentle natural texture and very faint diffuse shadow, dark-green HTML headline will be overlaid there. No strongly contrasting foliage over this copy space. Match the reference's macro detail, quiet premium light and realistic food texture; avoid excessively saturated orange. No package, no people, no fruit, no titles, no text, no UI, no split-screen, no artificial gradient panel. This is an actual full-width photographic background, not a web mockup. Keep reference essence and composition faithful.

### hero-sensory-mobile

Use case: style-transfer / responsive reframing. Use the attached landscape jelly photograph as the authoritative material and lighting reference. Create a PORTRAIT 2:3, 1024x1536 companion photograph for the same SÉRIN second hero: translucent champagne jelly folds on ivory ceramic plate in soft natural sun, warm ivory tabletop/wall and tiny botanical shadows only near top corners. CRITICAL: TOP 60 PERCENT is real light ivory photographed surface with gentle natural grain, no objects, no dark or busy shadow; that space is for live HTML headline, subtitle and button. Jelly and ivory plate occupy only LOWER 34 percent, from about 61% to 94% down, centered within middle 70% width, all folds of interest visible and enough side margin for mobile cropping. Lowest 6% only clean ivory surface. Match the reference's realistic delicate translucent texture and luminous caustics, restrained champagne coloring rather than orange, premium quiet wellness editorial. ONE seamless photograph, no people, no package, no fruit, no typography, no UI, no gradient panel or artificial color block.

