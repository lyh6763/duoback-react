// Official price/specification snapshot checked on 2026-10-14.
// null means unverified, never zero or an inferred safety limit.
// Existing local gallery assets remain labelled as prototype reference images.
const ANGLES = ['front', 'left', 'right', 'rear']
function withImages(product) {
  const colorViews = {}
  const colorImages = {}
  for (const color of product.colors) {
    const views = ANGLES.map(angle => 'images/products/' + product.id + '-' + color.slug + '-' + angle + '.jpg')
    colorViews[color.name] = views
    colorImages[color.name] = views[0]
  }
  return { ...product, images: colorViews[product.colors[0].name], colorViews, colorImages }
}

const PRODUCTS = [
  {
    "id": "q1w",
    "name": "Q1W 메쉬",
    "category": "사무용 의자",
    "price": 198000,
    "priceBasis": "스펀지 헤드레스트 기준",
    "colors": [
      {
        "name": "블랙",
        "color": "#000000",
        "slug": "black"
      },
      {
        "name": "그레이",
        "color": "#9E9E9E",
        "slug": "gray"
      }
    ],
    "specs": {
      "name": "Q1W 메쉬",
      "category": "사무용 의자",
      "size": "665 × 542 × 1150–1210mm",
      "seatHeight": "420–480mm",
      "weight": "13.7kg",
      "armrest": "고정형",
      "material": "더블라셀 메쉬",
      "colors": "블랙, 블루",
      "maxWeight": null,
      "origin": null
    },
    "source": {
      "url": "https://duoback.co.kr/product/detail.html?product_no=13177",
      "checkedAt": "2026-10-14",
      "sizeUrl": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/08_01_0.jpg",
      "featureUrl": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/04_01_0.jpg",
      "priceBasis": "스펀지 헤드레스트 기준",
      "fieldUrls": {
        "size": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/08_01_0.jpg",
        "seatHeight": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/08_01_0.jpg",
        "weight": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/08_01_0.jpg",
        "armrest": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/04_01_0.jpg",
        "colors": "https://duoback.co.kr/product/detail.html?product_no=13177",
        "material": "https://duoback2025.openhost.cafe24.com/web/product/renewal/PDP/Q1/q1w/04_01_0.jpg"
      }
    },
    "keywords": [
      "Q1W",
      "메쉬",
      "사무용",
      "오피스"
    ],
    "summary": "팔걸이 고정형 · 좌판 높이 420–480mm",
    "highlights": [
      "팔걸이 고정형",
      "좌판 420–480mm"
    ],
    "galleryNotice": "갤러리 사진은 포트폴리오용 참고 이미지입니다. 공식 판매 색상과 형태는 원문에서 확인하세요."
  },
  {
    "id": "dk073w",
    "name": "DK-073W",
    "category": "학생용 의자",
    "price": 158000,
    "priceBasis": "기본 상품 기준",
    "colors": [
      {
        "name": "블랙",
        "color": "#000000",
        "slug": "black"
      },
      {
        "name": "블루",
        "color": "#2196F3",
        "slug": "blue"
      }
    ],
    "specs": {
      "name": "DK-073W",
      "category": "학생용 의자",
      "size": "560 × 610 × 902mm",
      "seatHeight": "412mm (고정)",
      "weight": "9.5kg",
      "armrest": "고정형",
      "material": null,
      "colors": "그레이, 그린, 블루, 레드",
      "maxWeight": null,
      "origin": null
    },
    "source": {
      "url": "https://duoback.co.kr/product/detail.html?product_no=13234",
      "checkedAt": "2026-10-14",
      "sizeUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/07_01.jpg",
      "featureUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/04_01.jpg",
      "priceBasis": "기본 상품 기준",
      "fieldUrls": {
        "size": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/07_01.jpg",
        "seatHeight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/07_01.jpg",
        "weight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/07_01.jpg",
        "armrest": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/STUDY/dk073/dk073w/04_01.jpg",
        "colors": "https://duoback.co.kr/product/detail.html?product_no=13234",
        "material": null
      }
    },
    "keywords": [
      "DK-073W",
      "DK073W",
      "학생용",
      "학생",
      "공부",
      "책상"
    ],
    "summary": "팔걸이 고정형 · 좌판 높이 412mm (고정)",
    "highlights": [
      "팔걸이 고정형",
      "좌판 412mm (고정)"
    ],
    "galleryNotice": "갤러리 사진은 포트폴리오용 참고 이미지입니다. 공식 판매 색상과 형태는 원문에서 확인하세요."
  },
  {
    "id": "d3hs",
    "name": "D3-HS 메쉬",
    "category": "사무용 의자",
    "price": 472000,
    "priceBasis": "일반 베이스·택배 기준",
    "colors": [
      {
        "name": "블랙",
        "color": "#000000",
        "slug": "black"
      },
      {
        "name": "화이트",
        "color": "#FFFFFF",
        "slug": "white"
      }
    ],
    "specs": {
      "name": "D3-HS 메쉬",
      "category": "사무용 의자",
      "size": "712 × 618 × 1172–1262mm",
      "seatHeight": "440–530mm",
      "weight": "16.6kg",
      "armrest": "조절형",
      "material": "메쉬 (공식 상품명 기준)",
      "colors": "블랙, 그레이, 레드, 피콕 블루",
      "maxWeight": null,
      "origin": null
    },
    "source": {
      "url": "https://duoback.co.kr/product/detail.html?product_no=12832",
      "checkedAt": "2026-10-14",
      "sizeUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/08_01.jpg",
      "featureUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/04_01.jpg",
      "priceBasis": "일반 베이스·택배 기준",
      "fieldUrls": {
        "size": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/08_01.jpg",
        "seatHeight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/08_01.jpg",
        "weight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/08_01.jpg",
        "armrest": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PD3/d3_hs/04_01.jpg",
        "colors": "https://duoback.co.kr/product/detail.html?product_no=12832",
        "material": "https://duoback.co.kr/product/detail.html?product_no=12832"
      }
    },
    "keywords": [
      "D3-HS",
      "D3HS",
      "메쉬",
      "사무용",
      "오피스"
    ],
    "summary": "팔걸이 조절형 · 좌판 높이 440–530mm",
    "highlights": [
      "팔걸이 조절형",
      "좌판 440–530mm"
    ],
    "galleryNotice": "갤러리 사진은 포트폴리오용 참고 이미지입니다. 공식 판매 색상과 형태는 원문에서 확인하세요."
  },
  {
    "id": "d043w",
    "name": "D-043W PLUS",
    "category": "학생용 의자",
    "price": 145000,
    "priceBasis": "기본 상품 기준",
    "colors": [
      {
        "name": "블랙",
        "color": "#000000",
        "slug": "black"
      },
      {
        "name": "블루",
        "color": "#2196F3",
        "slug": "blue"
      }
    ],
    "specs": {
      "name": "D-043W PLUS",
      "category": "학생용 의자",
      "size": "540 × 538 × 812mm",
      "seatHeight": "460mm (고정)",
      "weight": "8.4kg",
      "armrest": "없음 (공식 도면 기준)",
      "material": null,
      "colors": "마린블루, 카라멜브라운, 버블그레이",
      "maxWeight": null,
      "origin": null
    },
    "source": {
      "url": "https://duoback.co.kr/product/detail.html?product_no=13239",
      "checkedAt": "2026-10-14",
      "sizeUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
      "featureUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
      "priceBasis": "기본 상품 기준",
      "fieldUrls": {
        "size": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
        "seatHeight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
        "weight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
        "armrest": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/platform/dkplatform/dk043w_plus/dk043w_plus_02.jpg",
        "colors": "https://duoback.co.kr/product/detail.html?product_no=13239",
        "material": null
      }
    },
    "keywords": [
      "D-043W",
      "D043W",
      "PLUS",
      "플러스",
      "학생용",
      "학생"
    ],
    "summary": "팔걸이 없음 (공식 도면 기준) · 좌판 높이 460mm (고정)",
    "highlights": [
      "팔걸이 없음",
      "좌판 460mm (고정)"
    ],
    "galleryNotice": "갤러리 사진은 포트폴리오용 참고 이미지입니다. 공식 판매 색상과 형태는 원문에서 확인하세요."
  },
  {
    "id": "d2500g",
    "name": "D2500G-DASW",
    "category": "사무용 의자",
    "price": 319000,
    "priceBasis": "일반 베이스·택배 기준",
    "colors": [
      {
        "name": "블랙",
        "color": "#000000",
        "slug": "black"
      },
      {
        "name": "그레이",
        "color": "#9E9E9E",
        "slug": "gray"
      }
    ],
    "specs": {
      "name": "D2500G-DASW",
      "category": "사무용 의자",
      "size": "682 × 600 × 1145–1251mm",
      "seatHeight": "414–520mm",
      "weight": "18.2kg",
      "armrest": "조절형",
      "material": null,
      "colors": "그레이, 블루그린",
      "maxWeight": null,
      "origin": null
    },
    "source": {
      "url": "https://duoback.co.kr/product/detail.html?product_no=12767",
      "checkedAt": "2026-10-14",
      "sizeUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/08_01.jpg",
      "featureUrl": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/04_01.jpg",
      "priceBasis": "일반 베이스·택배 기준",
      "fieldUrls": {
        "size": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/08_01.jpg",
        "seatHeight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/08_01.jpg",
        "weight": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/08_01.jpg",
        "armrest": "https://ecimg.cafe24img.com/pg2137b07932786048/duoback2025/web/product/renewal/PDS/D2500G/d2500g_dasw/04_01.jpg",
        "colors": "https://duoback.co.kr/product/detail.html?product_no=12767",
        "material": null
      }
    },
    "keywords": [
      "D2500G",
      "DASW",
      "사무용",
      "오피스"
    ],
    "summary": "팔걸이 조절형 · 좌판 높이 414–520mm",
    "highlights": [
      "팔걸이 조절형",
      "좌판 414–520mm"
    ],
    "galleryNotice": "갤러리 사진은 포트폴리오용 참고 이미지입니다. 공식 판매 색상과 형태는 원문에서 확인하세요."
  }
].map(withImages)

export default PRODUCTS
