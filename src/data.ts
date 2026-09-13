export type ProjectId = 'signal' | 'stay' | 'wildline'

export interface Project {
  id: ProjectId
  number: string
  eyebrow: string
  title: string
  subtitle: string
  description: string
  sourceUrl: string
  sourceLabel: string
  accent: string
  surface: string
  capabilities: string[]
  evolution: string
}

export const projects: Project[] = [
  {
    id: 'signal',
    number: '01',
    eyebrow: 'SCROLL NARRATIVE / FINTECH',
    title: 'Signal Bank',
    subtitle: '숫자가 이야기가 되는 스크롤 인터페이스',
    description:
      '기존 Kakao Page의 스크롤 하이라이트와 이미지 모션을 금융 데이터 스토리텔링으로 재구성했습니다. 범위 입력에 즉시 반응하는 예상 수익 계산을 통해 상태와 피드백을 명확히 보여줍니다.',
    sourceUrl: 'https://github.com/taeyoungk-dev/kakao-page',
    sourceLabel: 'kakao-page',
    accent: '#c9ff3d',
    surface: '#17251f',
    capabilities: ['Reactive state', 'Data storytelling', 'Range input', 'A11y labels'],
    evolution: 'Vanilla scroll events → declarative React state',
  },
  {
    id: 'stay',
    number: '02',
    eyebrow: 'PRODUCT GRID / TRAVEL',
    title: 'Stay Atlas',
    subtitle: '탐색의 마찰을 줄인 숙소 탐색 보드',
    description:
      '기존 Airbnb Clone의 그리드와 카테고리 패턴을 반응형 탐색 경험으로 확장했습니다. 필터, 즐겨찾기, 결과 상태를 하나의 정보 구조로 관리해 재사용 가능한 컴포넌트 설계를 보여줍니다.',
    sourceUrl: 'https://github.com/taeyoungk-dev/airbnb-clone-page',
    sourceLabel: 'airbnb-clone-page',
    accent: '#ff6b47',
    surface: '#f1e9dd',
    capabilities: ['Responsive grid', 'Filter state', 'Favorites', 'Component model'],
    evolution: 'Static card repetition → typed, data-driven UI',
  },
  {
    id: 'wildline',
    number: '03',
    eyebrow: 'PARALLAX / EDITORIAL',
    title: 'Wildline',
    subtitle: '움직임으로 깊이를 만드는 디지털 풍경',
    description:
      '기존 Firewatch Clone의 레이어 패럴랙스를 포인터와 스크롤 모두에 반응하는 편집형 히어로로 재해석했습니다. prefers-reduced-motion을 준수해 모션과 접근성을 함께 설계했습니다.',
    sourceUrl: 'https://github.com/taeyoungk-dev/Firewatch-clone-page',
    sourceLabel: 'Firewatch-clone-page',
    accent: '#ffc05c',
    surface: '#0c302f',
    capabilities: ['CSS parallax', 'Pointer input', 'Motion safety', 'Layer system'],
    evolution: 'Imperative transforms → bounded motion system',
  },
]

export const stack = [
  { group: 'INTERFACE', items: ['React 19', 'TypeScript 7', 'CSS Architecture', 'Vite 8'] },
  { group: 'QUALITY', items: ['Vitest', 'Testing Library', 'Semantic HTML', 'Reduced Motion'] },
  { group: 'DELIVERY', items: ['Docker', 'Nginx', 'GitHub Actions', 'GitHub Pages'] },
  { group: 'PLATFORM', items: ['Kubernetes', 'Health Checks', 'Resource Limits', 'Immutable Image'] },
]
