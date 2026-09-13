import { useEffect, useRef, useState } from 'react'
import { projects, stack, type Project, type ProjectId } from './data'

type IconProps = { size?: number; className?: string }

const Arrow = ({ size = 18, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="1.7" />
  </svg>
)

const Spark = ({ size = 18, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 1.5c.4 5.6 2.9 8.1 8.5 8.5-5.6.4-8.1 2.9-8.5 8.5C9.6 12.9 7.1 10.4 1.5 10 7.1 9.6 9.6 7.1 10 1.5Z" fill="currentColor" />
  </svg>
)

const Close = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const Heart = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
)

function Header({ progress }: { progress: number }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (target: string) => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <button className="wordmark" onClick={() => navigate('#top')} aria-label="페이지 처음으로">
        TYK<span>/LAB</span>
      </button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="주요 메뉴">
        <button onClick={() => navigate('#work')}>WORK <sup>03</sup></button>
        <button onClick={() => navigate('#system')}>SYSTEM</button>
        <button onClick={() => navigate('#about')}>ABOUT</button>
      </nav>
      <div className="header-meta">
        <span className="availability"><i /> OPEN TO WORK</span>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="메뉴 열기">
          {menuOpen ? '닫기' : '메뉴'}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-kicker reveal-up">
        <Spark size={16} />
        <span>SEOUL → GLOBAL</span>
        <span className="hero-kicker-line" />
        <span>SOFTWARE ENGINEERING PORTFOLIO</span>
      </div>
      <div className="hero-title-wrap">
        <h1 className="hero-title">
          <span className="hero-line hero-line-one">BUILDING</span>
          <span className="hero-line hero-line-two"><em>INTERFACES.</em></span>
          <span className="hero-line hero-line-three">ENGINEERING</span>
          <span className="hero-line hero-line-four">SYSTEMS<span className="acid-dot">.</span></span>
        </h1>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-one"><i /></div>
          <div className="orbit-ring orbit-ring-two"><i /></div>
          <div className="orbit-core">03</div>
          <span>IDEAS</span>
          <span>ONE SYSTEM</span>
        </div>
      </div>
      <div className="hero-bottom">
        <p className="hero-intro">
          수학으로 사고하고, 코드로 만들고,
          <br />
          <strong>시스템으로 확장하는 엔지니어.</strong>
        </p>
        <button className="round-link" onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} aria-label="프로젝트 보기">
          <span>EXPLORE<br />THE WORK</span>
          <Arrow />
        </button>
        <div className="hero-index">
          <span>SELECTED WORK</span>
          <strong>2023—26</strong>
        </div>
      </div>
    </section>
  )
}

function SignalVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'signal-visual is-compact' : 'signal-visual'}>
      <div className="signal-topline"><span>SIGNAL</span><span>SECURE / 256</span></div>
      <div className="signal-balance">
        <span>THIS MONTH</span>
        <strong>₩4,280,500</strong>
        <small>+ 12.8% <i>↗</i></small>
      </div>
      <div className="signal-chart" aria-hidden="true">
        <svg viewBox="0 0 500 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="signal-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c9ff3d" stopOpacity=".35" />
              <stop offset="1" stopColor="#c9ff3d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="chart-area" d="M0 150 C50 145 75 120 115 126 S170 100 205 106 260 36 300 72 355 98 390 54 455 30 500 10 V180 H0Z" />
          <path className="chart-line" d="M0 150 C50 145 75 120 115 126 S170 100 205 106 260 36 300 72 355 98 390 54 455 30 500 10" />
        </svg>
        <i className="chart-point" />
      </div>
      <div className="signal-stats">
        <span><small>SAVED</small><strong>68%</strong></span>
        <span><small>GOAL</small><strong>73%</strong></span>
        <span><small>STREAK</small><strong>18D</strong></span>
      </div>
    </div>
  )
}

const stayCards = [
  { id: 1, city: 'Yangyang', type: 'COAST', color: 'sand', price: '184,000', rating: '4.92' },
  { id: 2, city: 'Jeju', type: 'ISLAND', color: 'coral', price: '221,000', rating: '4.87' },
  { id: 3, city: 'Goseong', type: 'FOREST', color: 'forest', price: '168,000', rating: '4.96' },
]

function StayVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'stay-visual is-compact' : 'stay-visual'}>
      <div className="stay-nav"><strong>STAY/ATLAS</strong><span>38° N, KOREA</span></div>
      <div className="stay-filter-row"><span className="active">ALL STAYS</span><span>COAST</span><span>FOREST</span></div>
      <div className="stay-grid">
        {stayCards.map((card) => (
          <article className="stay-card" key={card.id}>
            <div className={`stay-image ${card.color}`}><span>0{card.id}</span><i /></div>
            <div className="stay-card-meta"><strong>{card.city}</strong><small>{card.type} · ★ {card.rating}</small><span>₩{card.price}</span></div>
          </article>
        ))}
      </div>
    </div>
  )
}

function WildlineVisual({ compact = false, offset = { x: 0, y: 0 } }: { compact?: boolean; offset?: { x: number; y: number } }) {
  return (
    <div className={compact ? 'wild-visual is-compact' : 'wild-visual'}>
      <div className="wild-sun" style={{ transform: `translate(${offset.x * -0.1}px, ${offset.y * -0.1}px)` }} />
      <div className="wild-copy"><small>FIELD NOTE · 03</small><strong>GO<br />BEYOND</strong></div>
      <div className="mountain layer-1" style={{ transform: `translateX(${offset.x * 0.08}px)` }} />
      <div className="mountain layer-2" style={{ transform: `translateX(${offset.x * -0.12}px)` }} />
      <div className="mountain layer-3" style={{ transform: `translateX(${offset.x * 0.18}px)` }} />
      <div className="wild-footer"><span>EXPEDITION 07</span><span>SCROLL TO DESCEND ↓</span></div>
    </div>
  )
}

function ProjectVisual({ id, compact = false }: { id: ProjectId; compact?: boolean }) {
  if (id === 'signal') return <SignalVisual compact={compact} />
  if (id === 'stay') return <StayVisual compact={compact} />
  return <WildlineVisual compact={compact} />
}

function ProjectSection({ project, onOpen }: { project: Project; onOpen: (id: ProjectId) => void }) {
  return (
    <article className={`project project-${project.id}`} style={{ '--accent': project.accent, '--surface': project.surface } as React.CSSProperties}>
      <div className="project-copy">
        <div className="project-heading-row">
          <span className="project-number">({project.number})</span>
          <span className="project-eyebrow">{project.eyebrow}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="capability-list">
          {project.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
        </div>
        <p className="project-evolution"><Spark size={14} /> {project.evolution}</p>
        <div className="project-actions">
          <button className="primary-action" onClick={() => onOpen(project.id)}>LIVE INTERACTION <Arrow /></button>
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">ORIGINAL SOURCE <Arrow size={14} /></a>
        </div>
      </div>
      <button className="project-preview" onClick={() => onOpen(project.id)} aria-label={`${project.title} 인터랙션 미리보기`}>
        <ProjectVisual id={project.id} compact />
        <span className="preview-label">OPEN EXPERIENCE <Arrow size={14} /></span>
      </button>
    </article>
  )
}

function SignalExperience() {
  const [monthly, setMonthly] = useState(650000)
  const projected = monthly * 12 * 1.042

  return (
    <div className="experience signal-experience">
      <div className="experience-copy dark-copy">
        <span className="experience-kicker">INTERACTIVE MODULE / 01</span>
        <h4>내일의 숫자를<br />오늘 조정하세요.</h4>
        <p>월 저축액을 조정하면 1년 후 예상 자산이 즉시 반영됩니다.</p>
        <label htmlFor="monthly-saving">월 저축액 <strong>₩{monthly.toLocaleString('ko-KR')}</strong></label>
        <input id="monthly-saving" type="range" min="100000" max="1500000" step="50000" value={monthly} onChange={(event) => setMonthly(Number(event.target.value))} />
        <div className="projection"><small>12 MONTH PROJECTION</small><strong>₩{Math.round(projected).toLocaleString('ko-KR')}</strong><span>4.2% model rate</span></div>
      </div>
      <SignalVisual />
    </div>
  )
}

function StayExperience() {
  const [category, setCategory] = useState('ALL')
  const [favorites, setFavorites] = useState<number[]>([2])
  const categories = ['ALL', 'COAST', 'FOREST']
  const visible = category === 'ALL' ? stayCards : stayCards.filter((card) => card.type === category)

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <div className="experience stay-experience">
      <div className="stay-experience-head">
        <div><span className="experience-kicker">DISCOVERY MODULE / 02</span><h4>Find your<br /><em>quiet place.</em></h4></div>
        <p>카테고리를 가볍게 바꾸고, 마음에 드는 숙소를 저장해보세요.</p>
      </div>
      <div className="experience-filters" role="group" aria-label="숙소 카테고리">
        {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        <span>{visible.length} STAYS</span>
      </div>
      <div className="experience-stay-grid">
        {visible.map((card) => (
          <article key={card.id} className="experience-stay-card">
            <div className={`stay-image ${card.color}`}>
              <span>0{card.id}</span><i />
              <button className={favorites.includes(card.id) ? 'favorite is-favorite' : 'favorite'} onClick={() => toggleFavorite(card.id)} aria-label={`${card.city} ${favorites.includes(card.id) ? '즐겨찾기 해제' : '즐겨찾기'}`}><Heart filled={favorites.includes(card.id)} /></button>
            </div>
            <div className="stay-card-meta"><strong>{card.city}</strong><small>{card.type} · ★ {card.rating}</small><span>₩{card.price} / night</span></div>
          </article>
        ))}
      </div>
    </div>
  )
}

function WildlineExperience() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <div
      className="experience wild-experience"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setOffset({ x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 })
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <WildlineVisual offset={offset} />
      <div className="wild-experience-note"><span>MOVE YOUR POINTER</span><p>레이어마다 제한된 비율로 움직여 공간의 깊이를 만듭니다.</p></div>
    </div>
  )
}

function ExperienceModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="experience-title">
      <div className={`modal-shell modal-${project.id}`}>
        <div className="modal-bar">
          <div><span>TYK/LAB</span><span id="experience-title">{project.number} — {project.title}</span></div>
          <button ref={closeRef} onClick={onClose}><span>CLOSE</span><Close /></button>
        </div>
        {project.id === 'signal' && <SignalExperience />}
        {project.id === 'stay' && <StayExperience />}
        {project.id === 'wildline' && <WildlineExperience />}
      </div>
    </div>
  )
}

function SystemSection() {
  return (
    <section className="system-section" id="system">
      <div className="section-label"><span>02 / SYSTEM</span><p>THE SYSTEM BENEATH<br />THE INTERFACE</p></div>
      <div className="system-heading">
        <span className="outline-text">DESIGN.</span>
        <span>BUILD.</span>
        <span className="acid-text">SHIP.</span>
      </div>
      <div className="pipeline" aria-label="배포 파이프라인">
        <div className="pipeline-node"><span>01</span><strong>COMMIT</strong><small>Type-safe source</small></div>
        <div className="pipeline-connector"><i /><i /><i /></div>
        <div className="pipeline-node"><span>02</span><strong>VERIFY</strong><small>Test + build gate</small></div>
        <div className="pipeline-connector"><i /><i /><i /></div>
        <div className="pipeline-node"><span>03</span><strong>PACKAGE</strong><small>Immutable container</small></div>
        <div className="pipeline-connector"><i /><i /><i /></div>
        <div className="pipeline-node is-live"><span>04</span><strong>DELIVER</strong><small>Pages / Kubernetes</small></div>
      </div>
      <div className="stack-grid">
        {stack.map((item, index) => (
          <article key={item.group}>
            <span>0{index + 1}</span>
            <h3>{item.group}</h3>
            <ul>{item.items.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </article>
        ))}
      </div>
      <div className="system-proof">
        <span>WHAT THIS REPOSITORY PROVES</span>
        <p>단순히 화면을 따라 만드는 단계에서 나아가, 상태·타입·테스트·배포 경계를 함께 설계하는 소프트웨어 엔지니어링.</p>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section-label light-label"><span>03 / ABOUT</span><p>A LONG-RANGE<br />ENGINEERING PATH</p></div>
      <div className="about-main">
        <p className="about-kicker">CURRENT VECTOR / SEOUL, KR</p>
        <h2>From <em>software</em><br />to systems at <em>scale.</em></h2>
        <p className="about-lead">김태영은 Java Backend를 출발점으로 Cloud·AI·Data, 그리고 Cybersecurity로 전문성을 확장하고 있습니다. 글로벌 환경에서 소통하고 신뢰할 수 있는 시스템을 만드는 것이 목표입니다.</p>
        <div className="about-links">
          <a href="mailto:taeyoungkdev@gmail.com">EMAIL <Arrow /></a>
          <a href="tel:+821052303787">PHONE <Arrow /></a>
          <a href="https://www.linkedin.com/in/taeyoung-kim-9b743140b/" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a>
          <a href="https://github.com/taeyoungk-dev" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          <a href="https://www.taeyoungkim.dev/ko" target="_blank" rel="noreferrer">TECH BLOG <Arrow /></a>
        </div>
      </div>
      <div className="roadmap">
        <article><span>NOW</span><strong>SOFTWARE ENGINEERING</strong><p>Java · Spring Boot · SQL<br />React · TypeScript · Testing</p></article>
        <article><span>NEXT</span><strong>CLOUD / AI / DATA</strong><p>Distributed systems · Platform<br />Python · Data engineering</p></article>
        <article><span>HORIZON</span><strong>SECURITY / RESEARCH</strong><p>Cybersecurity · Systems research<br />Georgia Tech OMSCS</p></article>
      </div>
      <div className="about-quote">
        <span>“</span>
        <p>Think in mathematics.<br />Communicate in English.<br />Build in code.<br /><em>Scale through systems.</em></p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div>
        <strong>LET'S BUILD<br />WHAT SCALES.</strong>
        <div className="footer-contact" aria-label="연락처">
          <a href="mailto:taeyoungkdev@gmail.com">EMAIL <Arrow /></a>
          <a href="tel:+821052303787">PHONE <Arrow /></a>
          <a href="https://www.linkedin.com/in/taeyoung-kim-9b743140b/" target="_blank" rel="noreferrer">LINKEDIN <Arrow /></a>
          <a href="https://github.com/taeyoungk-dev" target="_blank" rel="noreferrer">GITHUB <Arrow /></a>
          <a href="https://www.taeyoungkim.dev/ko" target="_blank" rel="noreferrer">TECH BLOG <Arrow /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TAEYOUNG KIM</span><span>DESIGNED & ENGINEERED IN SEOUL</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div>
    </footer>
  )
}

export default function App() {
  const [progress, setProgress] = useState(0)
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        setProgress(available > 0 ? window.scrollY / available : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const selectedProject = projects.find((project) => project.id === activeProject)

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 바로가기</a>
      <Header progress={progress} />
      <main id="main-content">
        <Hero />
        <section className="work-section" id="work">
          <div className="section-label"><span>01 / SELECTED WORK</span><p>THREE STUDIES,<br />REBUILT AS ONE SYSTEM</p></div>
          <div className="work-intro"><h2>RE/BUILT</h2><p>세 개의 클론 코딩을<br /><strong>하나의 엔지니어링 서사로.</strong></p></div>
          <div className="projects-list">{projects.map((project) => <ProjectSection key={project.id} project={project} onOpen={setActiveProject} />)}</div>
        </section>
        <SystemSection />
        <AboutSection />
      </main>
      <Footer />
      {selectedProject && <ExperienceModal project={selectedProject} onClose={() => setActiveProject(null)} />}
    </>
  )
}
