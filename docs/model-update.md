# 캠페인 모델·의상 교체

사용자 제공 인물 사진을 얼굴·헤어·의상의 기준으로 삼아 사이트에서 모델이 등장하는 캠페인 메인과 상세 화보 2종을 내장 image_gen 도구로 편집했습니다. 기준 의상은 짙은 올리브색 민소매 드레이프 넥 드레스입니다. 기존 아이보리 상의와 그린 오버셔츠를 교체하고 브랜드의 화보 구도·자연광·제품 스틱 패키지를 유지했습니다.

이전 화보 파일은 보존합니다. 현재 웹페이지는 다음 교체본을 사용합니다.

- `assets/images/campaign-main-model-v2.png` / `assets/images/campaign-main-model-v2.webp`
- `assets/images/campaign-detail-model-v2.png` / `assets/images/campaign-detail-model-v2.webp`

메인 화보는 1536×1024, 상세 화보는 1024×1024 WebP로 최적화했습니다. 두 결과의 올리브색 의상, 얼굴·헤어 연결성, 남아 있는 아이보리 상의·셔츠가 없는지, 제품 스틱 표시를 직접 이미지로 검토했습니다. 실제 브라우저 렌더링 검수를 했다는 의미는 아닙니다. 생성 편집이므로 원본 사진과 완전한 픽셀 동일성을 보장하지 않습니다.

## 제작 프롬프트

### campaign-main

Use case: identity-preserve. Edit the existing LANDSCAPE SÉRIN campaign photograph (the landscape photo with a woman on the right and dark sage wall on the left). The user-attached PORTRAIT of a woman in a dark olive sleeveless draped/cowl-neck dress is the authoritative person AND wardrobe reference. Replace the woman in the landscape campaign with EXACTLY the woman in the user portrait: same face shape, eyes, brows, nose, lips, natural skin texture, hairline and loose softly tied dark hair. Dress her in EXACTLY the same dark olive sleeveless dress with softly draped high cowl neckline and matte fluid fabric as the user portrait, including the olive skirt visible at the lower edge. Remove all of the previous ivory linen top and green overshirt. Keep a natural seated upper-body pose, gently facing camera like the reference, one hand relaxed near chin if appropriate. Preserve the existing landscape campaign's composition: model entirely on the RIGHT half, generous unobstructed dark botanical/sage wall negative space on the LEFT for website copy, restrained warm limestone detail at far right, warm refined natural side light and soft shadows. High-end photorealistic editorial, authentic visible skin and no excessive retouching. Output a single landscape 3:2 image, approximately 1536x1024, no collage, no added text, no logos, no products. The other supplied square and product photographs are context only; DO NOT use their previous woman's identity or clothing.

### campaign-detail

Use case: identity-preserve and compositing. Edit the existing SQUARE SÉRIN detail photograph showing a woman holding an ivory branded stick sachet. The user-attached PORTRAIT of the woman in a dark olive sleeveless draped/cowl-neck dress is the authoritative person AND wardrobe reference. Replace the old woman with exactly that reference woman: same visible face, chin, lips, hair strands, natural complexion and hands consistent with her. Replace ALL ivory linen clothing and the green overshirt with EXACTLY her dark olive sleeveless high draped cowl-neck dress, matte softly flowing fabric, olive skirt, bare arms, no jacket, no ivory fabric. Preserve the square detail photograph's framing from lower face/neck to lap and natural two-hand pose gently holding ONE sealed narrow ivory SÉRIN Essential Collagen Jelly sachet. Keep the same warm limestone background and natural sunlight, quiet editorial mood and realistic anatomy. The product still-life image is the authoritative packaging reference: retain the ivory stick's exact long narrow form, fine crimped ends and green printed words 'SÉRIN' and 'Essential Collagen Jelly', legible and unobscured. The previous model's identity and outfit must not carry over. Output ONE square 1:1 1024x1024 photograph, no collage, no extra text or UI, no health claims. Show the olive draped neckline clearly so wardrobe consistency with the user portrait is immediately visible.


모바일(700px 이하) 캠페인 이미지의 가로 크롭 위치를 90%로 조정해 오른쪽에 배치한 모델 얼굴이 화면 안에 들어오도록 설정했습니다.
