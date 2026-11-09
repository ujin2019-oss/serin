# 히어로 전체 이미지 적용

사용자의 ‘히어로 전체를 하나의 이미지로’ 요청에 따라 내장 image_gen 도구로 기존 패키지를 참조해 장면을 확장했습니다. 카피 뒤의 별도 단색 영역과 CSS 그라데이션을 제거하고 실제 아이보리 벽·석재 표면이 화면 전체에 이어지게 적용했습니다.

- 데스크톱: `assets/images/hero-full-v2.png` / `assets/images/hero-full-v2.webp` (1672×941), 작은 파생본 `hero-full-v2-1024.webp`
- 850px 이하: `assets/images/hero-full-v2-mobile.png` / `assets/images/hero-full-v2-mobile.webp` (1024×1536), 작은 파생본 `hero-full-v2-mobile-768.webp`
- 화면마다 하나의 사진을 전체 배경으로 표시합니다. 작은 화면에서는 같은 장면의 세로 구도를 선택합니다.
- 헤드라인·설명·버튼은 접근 가능한 실제 HTML로 유지했습니다.
- 이전 `hero-master` 파일은 패키지 기준 이미지로 보존했습니다.
- 생성 결과의 패키지·연속된 재질·카피용 여백을 직접 이미지로 확인했고, 경로·메뉴·상세창의 자동 검수를 수행했습니다. 실제 브라우저 화면별 시각 검수는 별도로 수행하지 않았습니다.

## 생성·편집 프롬프트

### hero-full-v2

Use case: precise-object-edit / outpainting for website hero. Edit and expand the supplied SÉRIN product reference into ONE seamless premium editorial product photograph filling a whole website hero. Output a wide 16:9 landscape, ideally 2304x1296 or 2560x1440. Preserve the EXACT reference matte deep botanical green box with ivory SÉRIN and Essential Collagen Jelly typography, box dimensions/proportions, two ivory narrow foil sachets with green SÉRIN print, and rough limestone pedestal. Keep box and sachets entirely visible in the RIGHT 45 percent of the final composition, grouped together at moderate scale; box top about 20% down, pedestal base about 88% down, generous right margin. LEFT 48 percent must be a REAL PHOTOGRAPHED light warm ivory plaster wall and ivory stone tabletop with faint organic natural variation: light enough for dark green website typography, calm and uncluttered, no objects or strong shadows behind the future text. Extend the actual physical studio scene continuously across the whole frame, with natural perspective and material grain, soft sunlight from upper left and restrained botanical leaf shadows only near the far edges. No blank digital panel, no color block, no gradient overlay, no split-screen, no seam, no vignette. Left and right are the same continuous photographic setting. Refined warm neutral colors, not yellow, premium natural wellness still life, realistic paper and stone textures. No people. No added headline, UI, border or typography outside the existing packaging. Keep all printed package words faithful to reference. This is the actual full-bleed background asset, not a mockup of a website.

### hero-full-v2-mobile

Use case: precise-object-edit / outpainting. Create a PORTRAIT responsive version of the supplied full-width SÉRIN hero photograph. Preserve the EXACT green SÉRIN Essential Collagen Jelly box, two ivory narrow stick sachets, rough limestone pedestal, package proportions and typography, warm ivory physical plaster wall and stone table, soft natural light and restrained corner leaf shadows. Output 2:3 vertical 1024x1536 image, ONE seamless photographed setting. CRITICAL COMPOSITION for mobile website with live HTML text overlay: TOP 58 PERCENT of the portrait must be light warm ivory plaster wall, uncluttered and softly textured, with NO products or props, no dark shadow in central text area; this is actual wall, not a blank panel. All packaging and low limestone pedestal must sit compactly in the LOWER 36 percent, from 60% to 94% down. Product group centered horizontally within middle 68% of the image, with wide side margins to tolerate mobile cover crop; box about 28% of full image height, all box and sachets visible. Lower 6% has only clean ivory table. Let wall grain and lighting continue naturally across the whole photograph. No people, no added titles or text outside packaging, no UI, no gradient overlay, no split-screen or hard seam. Do not introduce a different package shape or color. Keep sophisticated neutral ivory and deep botanical green, realistic matte paper and limestone textures, premium wellness editorial.


## 후속 변경 — 두 번째 슬라이드 추가

제품 화보에 더해 젤리 질감의 두 번째 슬라이드를 구성했습니다. 현재 구성·조작 방법과 추가 에셋은 [hero-sensory-slide.md](hero-sensory-slide.md)에 기록했습니다.
