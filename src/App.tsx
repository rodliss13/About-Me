import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Maximize2,
  Minimize2,
  Moon,
  ShieldCheck,
  Sun,
  Terminal,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXECUTIVE_PILLARS,
  EXPERIENCES,
  HEADHUNTER_BRIEF,
  HERO_METRICS,
  PROJECTS_META,
  STACK_MATRIX,
  UI_TEXT,
  type Lang,
} from './data/portfolioData';
import { DeliveryTrackerSandbox } from './components/showcases/DeliveryTrackerSandbox';
import { SaseSandbox } from './components/showcases/SaseSandbox';
import { JarvisSandbox } from './components/showcases/JarvisSandbox';
import { PulseCleanSandbox } from './components/showcases/PulseCleanSandbox';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('pt');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeProject, setActiveProject] = useState<'tracker' | 'sase' | 'jarvis' | 'pulseclean'>('tracker');
  const [sandboxFullscreen, setSandboxFullscreen] = useState<boolean>(false);
  const [expFilter, setExpFilter] = useState<'all' | 'leadership' | 'finance_data'>('all');
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  }, [lang]);

  const currentMeta = PROJECTS_META.find((p) => p.id === activeProject) || PROJECTS_META[0];

  const filteredExperiences = EXPERIENCES.filter((e) => {
    if (expFilter === 'all') return true;
    return e.category === expFilter;
  });

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('rodrigo.liss13@gmail.com');
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2200);
  };

  const portraitUrl = `${import.meta.env.BASE_URL}rodrigo-portrait.png`;

  return (
    <>
      {/* ====================================================================
          MINIMALIST STICKY HEADER
         ==================================================================== */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand-mark">
            <span className="brand-dot" />
            <span>RODRIGO LISS</span>
            <span className="brand-badge">CSSYB™</span>
          </a>

          <nav className="nav-links" aria-label="Primary Navigation">
            <a href="#sobre" className="nav-link">
              <span className="nav-num">01</span> {UI_TEXT.nav.about[lang]}
            </a>
            <a href="#vitrines" className="nav-link">
              <span className="nav-num">02</span> {UI_TEXT.nav.showcases[lang]}
            </a>
            <a href="#trajetoria" className="nav-link">
              <span className="nav-num">03</span> {UI_TEXT.nav.experience[lang]}
            </a>
            <a href="#credenciais" className="nav-link">
              <span className="nav-num">04</span> {UI_TEXT.nav.credentials[lang]}
            </a>
            <a href="#contato" className="nav-link">
              <span className="nav-num">05</span> {UI_TEXT.nav.contact[lang]}
            </a>
          </nav>

          <div className="header-controls">
            {/* Instant PT / EN Switcher */}
            <div className="seg-switch" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`seg-btn ${lang === 'pt' ? 'active' : ''}`}
                onClick={() => setLang('pt')}
              >
                PT
              </button>
              <button
                type="button"
                className={`seg-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>

            {/* Dark / Light Editorial Toggle */}
            <button
              type="button"
              className="icon-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              title={theme === 'dark' ? 'Switch to Editorial Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
            </button>

            {/* Print / View Executive CV */}
            <button
              type="button"
              onClick={() => setShowResumeModal(true)}
              className="btn btn-outline btn-sm"
            >
              <FileText size={14} />
              <span>{UI_TEXT.nav.printCv[lang]}</span>
            </button>

            <a
              href="https://www.linkedin.com/in/rodrigo-liss"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* ====================================================================
          HERO SPLIT (2 COLUMNS — ARCHITECTURAL EDITORIAL + DARK VERMILION)
         ==================================================================== */}
      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            {/* Left Column: Positioning, Headline, CTAs & Verified Metrics */}
            <div>
              <div className="eyebrow-bar">
                <span className="pulse-dot" />
                <span>{UI_TEXT.hero.eyebrow[lang]}</span>
              </div>

              <h1 className="hero-title">
                {UI_TEXT.hero.titleLead[lang]}{' '}
                <span className="editorial-italic">{UI_TEXT.hero.titleItalic[lang]}</span>{' '}
                {UI_TEXT.hero.titleTail[lang]}
              </h1>

              <div className="hero-headline-tag">{UI_TEXT.hero.headlineBar[lang]}</div>

              <p className="hero-lead">{UI_TEXT.hero.lead[lang]}</p>

              <div className="hero-actions">
                <a href="#vitrines" className="btn btn-primary">
                  <Terminal size={16} />
                  <span>{UI_TEXT.hero.ctaPrimary[lang]}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowResumeModal(true)}
                  className="btn btn-outline"
                >
                  <FileText size={16} />
                  <span>{UI_TEXT.hero.ctaResume[lang]}</span>
                </button>
                <a
                  href="https://github.com/rodliss13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <span>GitHub @rodliss13</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="metrics-strip">
                {HERO_METRICS.map((m) => (
                  <div key={m.value} className="metric-cell">
                    <div className="metric-val">
                      {m.value}
                      {m.accentSuffix ? <span>{m.accentSuffix}</span> : null}
                    </div>
                    <div className="metric-lbl">{m.label[lang]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Editorial Portrait Frame + Executive Governance Card */}
            <div className="portrait-stage">
              <div className="portrait-frame">
                <div className="frame-top-meta">
                  <span>{UI_TEXT.hero.figLabel[lang]}</span>
                  <span>RJ · BR // GLOBAL</span>
                </div>

                <div className="portrait-visual-wrap">
                  <img
                    src={portraitUrl}
                    alt="Rodrigo Liss — Executive Portrait"
                    className="portrait-img"
                    loading="eager"
                  />
                  <span className="portrait-corner-tag">VERIFIED · ZERO-LEAK</span>
                </div>

                <div className="floating-exec-card">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {UI_TEXT.hero.execCardTitle[lang]}
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    {UI_TEXT.hero.execCardBody[lang]}
                  </p>
                  <div className="exec-card-row">
                    <span className="micro-pill accent">Firjan SENAI PMO-GPD</span>
                    <span className="micro-pill">Ex-Fiocruz / FIOTEC</span>
                    <span className="micro-pill">Harvard Aspire Leader</span>
                    <span className="micro-pill">Google Student Ambassador</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            01 / SOBRE & POSICIONAMENTO EXECUTIVO + MODO HEADHUNTER
           ==================================================================== */}
        <section id="sobre" className="editorial-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-index">{UI_TEXT.sections.s01Index[lang]}</div>
                <h2 className="section-title">{UI_TEXT.sections.s01Title[lang]}</h2>
              </div>
              <p className="section-subtitle">{UI_TEXT.sections.s01Sub[lang]}</p>
            </div>

            <div className="about-layout">
              <div className="editorial-card">
                <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.72 }}>
                  {lang === 'pt'
                    ? 'A maioria das organizações enfrenta um abismo entre a liderança financeira/regulatória e a engenharia de software/IA: equipes técnicas constroem ferramentas desconectadas das regras de compliance, enquanto áreas de controladoria e PMO operam processos manuais lentos. Minha trajetória resolve exatamente essa interseção — combinando formação em Administração (UERJ), Ciências Contábeis (UFF) e 2 MBAs executivos à capacidade prática de projetar arquiteturas de dados, motores determinísticos de auditoria e sistemas multi-agentes em produção.'
                    : 'Most enterprises face a structural divide between financial/regulatory leadership and AI software engineering: technical teams ship tools detached from audit rules, while controlling and PMO teams remain trapped in manual workflows. My career bridges that exact gap — combining dual foundations in Business Administration (UERJ), Accounting (UFF), and 2 Executive MBAs with hands-on engineering of data lakehouses, deterministic audit engines, and production multi-agent systems.'}
                </p>

                <div className="pillars-grid">
                  {EXECUTIVE_PILLARS.map((p) => (
                    <div key={p.id} className="pillar-box">
                      <div className="pillar-num">// {p.id}</div>
                      <h3 className="pillar-title">{p.title[lang]}</h3>
                      <p className="pillar-desc">{p.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Headhunter Quick-Brief Panel */}
              <aside className="headhunter-panel" aria-label="Headhunter Brief">
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.73rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      marginBottom: 14,
                    }}
                  >
                    {lang === 'pt' ? 'BRIEF EXECUTIVO PARA HEADHUNTERS' : 'HEADHUNTER EXECUTIVE BRIEF'}
                  </div>

                  <ul className="hh-list">
                    <li>
                      <span>{lang === 'pt' ? 'Escopo Alvo' : 'Target Scope'}</span>
                      <strong>{HEADHUNTER_BRIEF.targetRoles[lang]}</strong>
                    </li>
                    <li>
                      <span>{lang === 'pt' ? 'Ecossistemas' : 'Sectors'}</span>
                      <strong>{HEADHUNTER_BRIEF.sectors[lang]}</strong>
                    </li>
                    <li>
                      <span>{lang === 'pt' ? 'Idiomas' : 'Languages'}</span>
                      <strong>{HEADHUNTER_BRIEF.languages[lang]}</strong>
                    </li>
                    <li>
                      <span>{lang === 'pt' ? 'Normas & P&D' : 'Standards & R&D'}</span>
                      <strong>{HEADHUNTER_BRIEF.standards[lang]}</strong>
                    </li>
                    <li>
                      <span>{lang === 'pt' ? 'Modelo' : 'Mobility'}</span>
                      <strong>{HEADHUNTER_BRIEF.availability[lang]}</strong>
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setShowResumeModal(true)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <FileText size={14} />
                    {lang === 'pt' ? 'Abrir CV p/ Impressão (PDF)' : 'Open Printable CV (PDF)'}
                  </button>
                  <a
                    href="https://www.linkedin.com/in/rodrigo-liss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ====================================================================
            02 / VITRINES INTERATIVAS DE ENGENHARIA (4 LIVE SHOWCASES)
           ==================================================================== */}
        <section id="vitrines" className="editorial-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-index">{UI_TEXT.sections.s02Index[lang]}</div>
                <h2 className="section-title">{UI_TEXT.sections.s02Title[lang]}</h2>
              </div>
              <p className="section-subtitle">{UI_TEXT.sections.s02Sub[lang]}</p>
            </div>

            {/* 4-System Selector Tabs */}
            <div className="showcase-selector" role="tablist" aria-label="Engineering Showcases">
              {PROJECTS_META.map((proj) => (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={activeProject === proj.id}
                  onClick={() => setActiveProject(proj.id)}
                  className={`showcase-tab ${activeProject === proj.id ? 'active' : ''}`}
                >
                  <div className="st-index">
                    <span>{proj.index}</span>
                    <span>LIVE SANDBOX</span>
                  </div>
                  <div className="st-name">{proj.name[lang]}</div>
                  <div className="st-sub">{proj.shortSub[lang]}</div>
                </button>
              ))}
            </div>

            {/* Selected Project Executive Brief + Architecture */}
            <div className="showcase-Overview">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700 }}>
                    {currentMeta.index} // {currentMeta.category[lang]}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, margin: '4px 0 0', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                    {currentMeta.name[lang]}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  {currentMeta.impactMetrics.map((im) => (
                    <div
                      key={im.value}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        padding: '8px 14px',
                        textAlign: 'right',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--accent)' }}>
                        {im.value}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{im.label[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="showcase-meta-grid">
                {/* Left: Problem, Solution, Stack & DevSecOps Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 4 }}>
                      {lang === 'pt' ? 'Desafio Real' : 'Business & Engineering Challenge'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>{currentMeta.problem[lang]}</p>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 4 }}>
                      {lang === 'pt' ? 'Arquitetura & Proposta de Valor' : 'Solution & Engineering Value'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                      {currentMeta.solution[lang]}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
                      STACK REAL VERIFICADA NO CÓDIGO-FONTE
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {currentMeta.stack.map((st) => (
                        <span key={st} className="micro-pill">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                    {currentMeta.securityHighlights.map((sh, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          fontSize: '0.79rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <ShieldCheck size={15} color="var(--status-ok)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{sh[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Clean Visual Architecture Diagram */}
                <div className="arch-diagram-box">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      marginBottom: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{lang === 'pt' ? 'DIAGRAMA DE CAMADAS DA ARQUITETURA' : 'SYSTEM ARCHITECTURE LAYERS'}</span>
                    <span>VERIFIED SOURCE</span>
                  </div>
                  <div className="arch-flow">
                    {currentMeta.architecture.map((al) => (
                      <div key={al.layer} className="arch-layer">
                        <div className="arch-layer-title">{al.layer}</div>
                        <div className="arch-layer-desc">{al.detail[lang]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Sandbox Container */}
            <div className={`sandbox-shell ${sandboxFullscreen ? 'fullscreen' : ''}`}>
              <div className="sandbox-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="sandbox-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                    LIVE SANDBOX // {currentMeta.name[lang].toUpperCase()}
                  </strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span className="sandbox-badge-zero">
                    <ShieldCheck size={13} />
                    {lang === 'pt'
                      ? 'Zero-Leak Active · 100% Dados Sintéticos Seguros'
                      : 'Zero-Leak Active · 100% Safe Synthetic Telemetry'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSandboxFullscreen((f) => !f)}
                    className="icon-toggle"
                  >
                    {sandboxFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    <span>{sandboxFullscreen ? (lang === 'pt' ? 'Reduzir' : 'Exit Fullscreen') : lang === 'pt' ? 'Tela Cheia' : 'Fullscreen'}</span>
                  </button>
                </div>
              </div>

              <div className="sandbox-body">
                {activeProject === 'tracker' && <DeliveryTrackerSandbox lang={lang} />}
                {activeProject === 'sase' && <SaseSandbox lang={lang} />}
                {activeProject === 'jarvis' && <JarvisSandbox lang={lang} />}
                {activeProject === 'pulseclean' && <PulseCleanSandbox lang={lang} />}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            03 / EXPERIÊNCIA & TRAJETÓRIA EXECUTIVA
           ==================================================================== */}
        <section id="trajetoria" className="editorial-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-index">{UI_TEXT.sections.s03Index[lang]}</div>
                <h2 className="section-title">{UI_TEXT.sections.s03Title[lang]}</h2>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { id: 'all' as const, pt: 'Trajetória Completa (10+ anos)', en: 'Full Trajectory (10+ yrs)' },
                  { id: 'leadership' as const, pt: 'Liderança, PMO & Portfólio', en: 'Leadership & R&D PMO' },
                  { id: 'finance_data' as const, pt: 'Governança de Dados, FP&A & ERP', en: 'Data Governance, FP&A & ERP' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setExpFilter(f.id)}
                    className="seg-btn"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      background: expFilter === f.id ? 'var(--accent)' : 'var(--surface-1)',
                      color: expFilter === f.id ? '#fff' : 'var(--text-secondary)',
                    }}
                  >
                    {f[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="timeline-list">
              {filteredExperiences.map((exp) => (
                <article key={exp.id} className={`timeline-item ${exp.featured ? 'featured' : ''}`}>
                  <div>
                    <div className="tl-period">{exp.period[lang]}</div>
                    <div className="tl-company">{exp.company}</div>
                    <div className="tl-loc">{exp.location}</div>
                  </div>

                  <div>
                    <h3 className="tl-role">{exp.role[lang]}</h3>
                    <ul className="tl-bullets">
                      {exp.highlights[lang].map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                      {exp.tags.map((tg) => (
                        <span key={tg} className="micro-pill">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            04 / FORMAÇÃO, CERTIFICAÇÕES & MATRIZ DE STACK
           ==================================================================== */}
        <section id="credenciais" className="editorial-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-index">{UI_TEXT.sections.s04Index[lang]}</div>
                <h2 className="section-title">{UI_TEXT.sections.s04Title[lang]}</h2>
              </div>
              <p className="section-subtitle">{UI_TEXT.sections.s04Sub[lang]}</p>
            </div>

            {/* Academic Degrees */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <GraduationCap size={16} />
              {lang === 'pt' ? 'FORMAÇÃO ACADÊMICA' : 'ACADEMIC DEGREES'}
            </div>

            <div className="edu-grid">
              {EDUCATION.map((ed) => (
                <div key={`${ed.institution}-${ed.degree.pt}`} className="edu-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span className="micro-pill accent">{ed.status[lang]}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      {ed.period[lang]}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 6 }}>
                    {ed.degree[lang]}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ed.institution}</div>
                </div>
              ))}
            </div>

            {/* Certifications by Executive Domain */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={16} />
              {lang === 'pt'
                ? 'LICENÇAS, CERTIFICAÇÕES INTERNACIONAIS & RECONHECIMENTOS'
                : 'LICENSES, GLOBAL CERTIFICATIONS & HONORS'}
            </div>

            {CERTIFICATIONS.map((group) => (
              <div key={group.category.en} style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px' }}>
                  {group.category[lang]}
                </h3>
                <div className="certs-grid">
                  {group.items.map((c) => (
                    <div key={c.title} className="cert-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                        <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                          {c.title}
                        </strong>
                        {c.badge && <span className="micro-pill accent">{c.badge}</span>}
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {c.issuer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Competency & Tech Matrix */}
            <div className="stack-matrix">
              {STACK_MATRIX.map((col) => (
                <div key={col.domain.en} className="editorial-card" style={{ padding: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>
                    {col.domain[lang]}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {col.skills.map((sk) => (
                      <li
                        key={sk}
                        style={{
                          fontSize: '0.81rem',
                          color: 'var(--text-body)',
                          paddingBottom: 6,
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        {sk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            05 / CONTATO DIRETO PARA HEADHUNTERS & LIDERANÇAS
           ==================================================================== */}
        <section id="contato" className="editorial-section" style={{ borderBottom: 'none' }}>
          <div className="container">
            <div className="contact-banner">
              <div>
                <div className="section-index">{UI_TEXT.sections.s05Index[lang]}</div>
                <h2 className="section-title" style={{ marginBottom: 12 }}>
                  {UI_TEXT.sections.s05Title[lang]}
                </h2>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 580 }}>
                  {UI_TEXT.sections.s05Sub[lang]}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="https://www.linkedin.com/in/rodrigo-liss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>{lang === 'pt' ? 'Conectar no LinkedIn (/in/rodrigo-liss)' : 'Connect on LinkedIn (/in/rodrigo-liss)'}</span>
                  <ArrowUpRight size={16} />
                </a>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    {copiedEmail ? <Check size={15} color="var(--status-ok)" /> : <Copy size={15} />}
                    <span>{copiedEmail ? (lang === 'pt' ? 'E-mail Copiado!' : 'Email Copied!') : 'rodrigo.liss13@gmail.com'}</span>
                  </button>

                  <a
                    href="https://github.com/rodliss13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setShowResumeModal(true)}
                  className="btn btn-ghost"
                >
                  <FileText size={15} />
                  <span>{lang === 'pt' ? 'Abrir Versão Executiva p/ Impressão / PDF' : 'Open Printable Executive CV / PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 24 }}>
          <div>
            <strong>Rodrigo Liss, CSSYB™</strong> · Rio de Janeiro, Brasil ·{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
              Zero-Leak DevSecOps Verified
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
            PT-BR / EN · React 19 + TypeScript + Vite · GitHub Pages
          </div>
        </div>
      </footer>

      {showResumeModal && <ResumeModal lang={lang} onClose={() => setShowResumeModal(false)} />}
    </>
  );
};

export default App;
