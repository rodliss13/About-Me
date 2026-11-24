import React, { useState, useMemo } from 'react';
import { Scale, Network, Sparkles, Sliders, AlertOctagon, CheckCircle2 } from 'lucide-react';
import type { Lang } from '../../data/portfolioData';

interface SaseCompany {
  id: string;
  ticker: string;
  name: string;
  sector: 'banco' | 'mineracao' | 'energia' | 'petroleo' | 'varejo' | 'saude';
  sectorLabel: Record<Lang, string>;
  marketCapBrlB: number;
  roePct: number;
  laborCases: number;
  envEmbargoes: number;
  offshoreCount: number;
  ceisActive: boolean;
  nyse20F: boolean;
  dims: {
    d1Gov: number; // max 25
    d2Lab: number; // max 20
    d3Env: number; // max 20
    d4Int: number; // max 15
    d5Fin: number; // max 12
    d6Soc: number; // max 8
  };
  sharedControllers: string[];
  aiBrief: Record<Lang, { summary: string; evidence: string[]; recommendation: string }>;
}

// Synthetic showcase dataset modeling SASE's real 6-dimension methodology (Zero-Leak compliant)
const SASE_COMPANIES: SaseCompany[] = [
  {
    id: 'ENER',
    ticker: 'ENER6',
    name: 'Atlântica Geração & Redes S.A. ( Demo B3 )',
    sector: 'energia',
    sectorLabel: { pt: 'Energia Elétrica', en: 'Electric Utilities' },
    marketCapBrlB: 94.2,
    roePct: 18.4,
    laborCases: 1420,
    envEmbargoes: 0,
    offshoreCount: 1,
    ceisActive: false,
    nyse20F: true,
    dims: { d1Gov: 23, d2Lab: 17, d3Env: 18, d4Int: 15, d5Fin: 11, d6Soc: 7 },
    sharedControllers: ['Fundo Soberano Atlântico', 'Holding Infra Brasil'],
    aiBrief: {
      pt: {
        summary: 'Companhia em faixa de BAIXO RISCO (Sem Ressalva Material), apresentando conformidade integral em D4 (CEIS/CNEP zerados) e indicadores DEC/FEC dentro da meta ANEEL.',
        evidence: [
          'CVM FRE/DFP: Entrega tempestiva e conselho com 45% de membros independentes (+D1)',
          'SEC EDGAR 20-F: Subsidiária em Luxemburgo integralmente declarada em notas explicativas',
          'ANEEL Dados Abertos: DEC 6,8h (< limite penalizável de 10h)',
        ],
        recommendation: 'Manter monitoramento trimestral ordinário de passivos trabalhistas terceirizados (CNJ DataJud).',
      },
      en: {
        summary: 'Classified as LOW RISK (Unqualified Social Audit Opinion), showing full integrity compliance in D4 (zero CEIS/CNEP sanctions) and ANEEL grid reliability within statutory thresholds.',
        evidence: [
          'CVM Filings: Timely DFP/FRE disclosure with 45% independent board seats (+D1)',
          'SEC EDGAR 20-F: Single Luxembourg vehicle fully reconciled in explanatory notes',
          'ANEEL Open Data: Outage duration DEC at 6.8h (below 10h penalty threshold)',
        ],
        recommendation: 'Maintain standard quarterly monitoring over outsourced labor litigation via CNJ DataJud.',
      },
    },
  },
  {
    id: 'BNCO',
    ticker: 'BNCO4',
    name: 'Banco Meridional S.A. ( Demo B3 )',
    sector: 'banco',
    sectorLabel: { pt: 'Bancos & Finanças', en: 'Banking & Finance' },
    marketCapBrlB: 286.5,
    roePct: 21.8,
    laborCases: 9840,
    envEmbargoes: 0,
    offshoreCount: 4,
    ceisActive: false,
    nyse20F: true,
    dims: { d1Gov: 20, d2Lab: 12, d3Env: 19, d4Int: 14, d5Fin: 12, d6Soc: 4 },
    sharedControllers: ['Holding Infra Brasil', 'Capital Global Trust'],
    aiBrief: {
      pt: {
        summary: 'Score MODERADO: elevada solidez financeira (ROE > 20%, Índice de Basileia robusto), porém penalizada em D2 (volume de ações em TRTs) e D6 (ranking BACEN de reclamações).',
        evidence: [
          'BACEN Olinda: Presença no Top 5 trimestral de reclamações procedentes (-3 pts em D6)',
          'CVM FRE / BACEN: 4 estruturas offshore (Cayman/Bahamas) exigindo cruzamento cambial',
          'DFP CVM: ROE de 21,8% aciona bônus de continuidade operacional (+2 pts em D5)',
        ],
        recommendation: 'Auditar correlação entre metas comerciais de varejo, reclamações Consumidor.gov.br e passivo de horas extras em TRT-1/TRT-2.',
      },
      en: {
        summary: 'MODERATE Score: strong financial resilience (ROE > 20%, solid Basel ratio), offset by penalties in D2 (high labor court volume) and D6 (Central Bank consumer complaint ranking).',
        evidence: [
          'Central Bank Olinda API: Ranked in quarterly Top 5 upheld consumer complaints (-3 pts D6)',
          'CVM FRE: 4 offshore vehicles (Cayman/Bahamas) flagged for cross-border tax scrutiny',
          'CVM DFP: 21.8% ROE triggers financial continuity bonus (+2 pts D5)',
        ],
        recommendation: 'Audit correlation between retail sales quotas, Consumidor.gov complaints, and overtime litigation in Regional Labor Courts.',
      },
    },
  },
  {
    id: 'MINR',
    ticker: 'MINR3',
    name: 'Serra Sul Mineração & Metais S.A. ( Demo B3 )',
    sector: 'mineracao',
    sectorLabel: { pt: 'Mineração & Siderurgia', en: 'Mining & Metals' },
    marketCapBrlB: 241.0,
    roePct: 15.2,
    laborCases: 12650,
    envEmbargoes: 3,
    offshoreCount: 5,
    ceisActive: false,
    nyse20F: true,
    dims: { d1Gov: 17, d2Lab: 11, d3Env: 8, d4Int: 11, d5Fin: 10, d6Soc: 5 },
    sharedControllers: ['Fundo Soberano Atlântico', 'Pacific Metals Corp'],
    aiBrief: {
      pt: {
        summary: 'Classificação ATENÇÃO / RESSALVA RELEVANTE: forte compressão na dimensão D3 por autuações ambientais e estruturas de contenção monitoradas na ANM SIGBM.',
        evidence: [
          'ANM SIGMINE / SIGBM: Estruturas geotécnicas em nível de atenção (-8 pts em D3)',
          'IBAMA SISNAMA & INPE PRODES: 3 autos de infração ativos em corredor logístico (-5 pts em D3)',
          'CNJ DataJud: >10.000 processos trabalhistas ativos incluindo cadeia terceirizada (-5 pts em D2)',
        ],
        recommendation: 'Exigir reconciliação entre provisões ambientais do formulário 20-F (SEC) e autos ativos no SISNAMA/ANM.',
      },
      en: {
        summary: 'WATCH / QUALIFIED OPINION: steep compression in dimension D3 driven by environmental infractions and tailings structures monitored under ANM SIGBM.',
        evidence: [
          'ANM SIGMINE / SIGBM: Geotechnical structures under heightened alert (-8 pts D3)',
          'IBAMA SISNAMA & INPE PRODES: 3 active environmental notices along rail corridor (-5 pts D3)',
          'CNJ DataJud: >10,000 active labor proceedings across direct and contractor workforce (-5 pts D2)',
        ],
        recommendation: 'Reconcile environmental provisions reported in SEC Form 20-F against active IBAMA/ANM administrative proceedings.',
      },
    },
  },
  {
    id: 'VARE',
    ticker: 'VARE3',
    name: 'Varejo Nacional Integrado S.A. ( Demo B3 )',
    sector: 'varejo',
    sectorLabel: { pt: 'Varejo & Consumo', en: 'Retail & Consumer' },
    marketCapBrlB: 4.8,
    roePct: -14.6,
    laborCases: 16900,
    envEmbargoes: 0,
    offshoreCount: 2,
    ceisActive: true,
    nyse20F: false,
    dims: { d1Gov: 11, d2Lab: 9, d3Env: 18, d4Int: 3, d5Fin: 3, d6Soc: 4 },
    sharedControllers: ['Capital Global Trust'],
    aiBrief: {
      pt: {
        summary: 'Classificação ALTO RISCO / CRÍTICO (Com Ressalva Severa): deterioração simultânea em D1 (atraso informacional CVM), D4 (apontamento sancionatório) e D5 (ROE negativo + zona de distress Altman Z < 1.81).',
        evidence: [
          'CVM PAS / DFP: Ressalvas de auditoria sobre inconsistências históricas em operações de risco sacado (-D1)',
          'Portal da Transparência / PGFN: Apontamento sancionatório em subsidiária logística (-D4)',
          'Indicadores D5: ROE -14,6% e Altman Z-Score em faixa de alerta estrutural (-9 pts em D5)',
        ],
        recommendation: 'Acionar protocolo de auditoria forense sobre passivos fornecedores, covenants de dívida e contingências trabalhistas.',
      },
      en: {
        summary: 'HIGH / CRITICAL RISK (Adverse Material Qualification): simultaneous deterioration across D1 (CVM disclosure lag), D4 (sanction flag), and D5 (negative ROE + Altman Z < 1.81 distress zone).',
        evidence: [
          'CVM Enforcement / DFP: Historical supply-chain finance restatement flags (-D1)',
          'Federal Transparency / PGFN: Active administrative sanction on logistics subsidiary (-D4)',
          'D5 Metrics: ROE at -14.6% and Altman Z-Score inside structural distress zone (-9 pts D5)',
        ],
        recommendation: 'Trigger forensic audit protocol over reverse-factoring liabilities, debt covenants, and labor contingencies.',
      },
    },
  },
];

const DIMS_SPEC = [
  { key: 'd1Gov', max: 25, code: 'D1', pt: 'Governança & CVM', en: 'Governance & CVM' },
  { key: 'd2Lab', max: 20, code: 'D2', pt: 'Passivo Trabalhista', en: 'Labor Liability' },
  { key: 'd3Env', max: 20, code: 'D3', pt: 'Ambiental & Setorial', en: 'Env. & Sectoral' },
  { key: 'd4Int', max: 15, code: 'D4', pt: 'Integridade (CEIS)', en: 'Integrity (CEIS)' },
  { key: 'd5Fin', max: 12, code: 'D5', pt: 'Saúde Financeira', en: 'Financial Health' },
  { key: 'd6Soc', max: 8, code: 'D6', pt: 'Impacto Social', en: 'Social Impact' },
] as const;

export const SaseSandbox: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [sectorFilter, setSectorFilter] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'score' | 'cap' | 'labor'>('score');
  const [selectedId, setSelectedId] = useState<string>('MINR');
  const [simPenalties, setSimPenalties] = useState({
    ceisSanction: false,
    ibamaEmbargo: false,
    undeclaredOffshore: false,
  });
  const [viewMode, setViewMode] = useState<'radar' | 'graph'>('radar');

  const getRawScore = (c: SaseCompany) =>
    c.dims.d1Gov + c.dims.d2Lab + c.dims.d3Env + c.dims.d4Int + c.dims.d5Fin + c.dims.d6Soc;

  const list = useMemo(() => {
    return SASE_COMPANIES.filter((c) => sectorFilter === 'todos' || c.sector === sectorFilter).sort((a, b) => {
      if (sortBy === 'score') return getRawScore(a) - getRawScore(b);
      if (sortBy === 'cap') return b.marketCapBrlB - a.marketCapBrlB;
      return b.laborCases - a.laborCases;
    });
  }, [sectorFilter, sortBy]);

  const selected = useMemo(
    () => SASE_COMPANIES.find((c) => c.id === selectedId) || SASE_COMPANIES[0],
    [selectedId]
  );

  // Apply real-time what-if penalties from SASE_SISTEMA.md §3
  const effectiveDims = useMemo(() => {
    return {
      d1Gov: Math.max(0, selected.dims.d1Gov - (simPenalties.undeclaredOffshore ? 6 : 0)),
      d2Lab: selected.dims.d2Lab,
      d3Env: Math.max(0, selected.dims.d3Env - (simPenalties.ibamaEmbargo ? 5 : 0)),
      d4Int: Math.max(0, selected.dims.d4Int - (simPenalties.ceisSanction ? 12 : 0)),
      d5Fin: selected.dims.d5Fin,
      d6Soc: selected.dims.d6Soc,
    };
  }, [selected, simPenalties]);

  const totalScore =
    effectiveDims.d1Gov +
    effectiveDims.d2Lab +
    effectiveDims.d3Env +
    effectiveDims.d4Int +
    effectiveDims.d5Fin +
    effectiveDims.d6Soc;

  const verdict = useMemo(() => {
    if (totalScore >= 80)
      return {
        label: lang === 'pt' ? 'BAIXO RISCO · Sem Ressalva Material' : 'LOW RISK · Unqualified Opinion',
        color: 'var(--status-ok)',
      };
    if (totalScore >= 65)
      return {
        label: lang === 'pt' ? 'MODERADO · Sem Ressalva Material' : 'MODERATE · Unqualified Opinion',
        color: 'var(--status-info)',
      };
    if (totalScore >= 50)
      return {
        label: lang === 'pt' ? 'ATENÇÃO · Com Ressalva (Monitorar)' : 'WATCH · Qualified (Monitor)',
        color: 'var(--status-warn)',
      };
    return {
      label: lang === 'pt' ? 'ALTO RISCO / CRÍTICO · Ressalva Severa' : 'CRITICAL RISK · Adverse Qualification',
      color: 'var(--status-crit)',
    };
  }, [totalScore, lang]);

  // Hexagonal Radar Polygon points
  const radarPoints = useMemo(() => {
    const cx = 135;
    const cy = 125;
    const maxR = 86;
    return DIMS_SPEC.map((d, idx) => {
      const angle = (Math.PI / 3) * idx - Math.PI / 2;
      const val = effectiveDims[d.key];
      const ratio = val / d.max;
      return {
        code: d.code,
        label: d[lang],
        val,
        max: d.max,
        ox: cx + Math.cos(angle) * maxR,
        oy: cy + Math.sin(angle) * maxR,
        lx: cx + Math.cos(angle) * (maxR + 22),
        ly: cy + Math.sin(angle) * (maxR + 18),
        px: cx + Math.cos(angle) * (maxR * ratio),
        py: cy + Math.sin(angle) * (maxR * ratio),
      };
    });
  }, [effectiveDims, lang]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Filter & Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 10,
          alignItems: 'center',
          background: 'var(--surface-1)',
          padding: '12px 14px',
          borderRadius: 8,
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'todos', pt: 'Todos Setores (Demo)', en: 'All Sectors (Demo)' },
            { id: 'energia', pt: 'Energia', en: 'Energy' },
            { id: 'banco', pt: 'Bancos', en: 'Banking' },
            { id: 'mineracao', pt: 'Mineração', en: 'Mining' },
            { id: 'varejo', pt: 'Varejo', en: 'Retail' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSectorFilter(f.id)}
              className="seg-btn"
              style={{
                background: sectorFilter === f.id ? 'var(--accent)' : 'var(--surface-2)',
                color: sectorFilter === f.id ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {f[lang]}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'cap' | 'labor')}
            style={{
              background: 'var(--surface-2)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              padding: '6px 10px',
              fontSize: '0.78rem',
            }}
          >
            <option value="score">
              {lang === 'pt' ? 'Ordenar: Score (Mais Crítico)' : 'Sort: Audit Score (Most Critical)'}
            </option>
            <option value="cap">
              {lang === 'pt' ? 'Ordenar: Valor de Mercado' : 'Sort: Market Cap'}
            </option>
            <option value="labor">
              {lang === 'pt' ? 'Ordenar: Passivo Trabalhista' : 'Sort: Labor Cases'}
            </option>
          </select>
        </div>
      </div>

      {/* Top Grid: Company Cards + Hexagonal Radar / Network Graph */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 16 }}>
        {/* Left: Company Audit Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((c) => {
            const sc = getRawScore(c);
            const active = c.id === selected.id;
            const badgeColor =
              sc >= 80 ? 'var(--status-ok)' : sc >= 65 ? 'var(--status-info)' : sc >= 50 ? 'var(--status-warn)' : 'var(--status-crit)';
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedId(c.id);
                  setSimPenalties({ ceisSanction: false, ibamaEmbargo: false, undeclaredOffshore: false });
                }}
                style={{
                  textAlign: 'left',
                  padding: 14,
                  background: active ? 'var(--surface-2)' : 'var(--surface-1)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {c.ticker}
                      </strong>
                      <span className="micro-pill">{c.sectorLabel[lang]}</span>
                      {c.nyse20F && <span className="micro-pill accent">SEC 20-F</span>}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 3 }}>{c.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: badgeColor, lineHeight: 1 }}>
                      {sc}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>/100</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 10 }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: 4 }}>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-secondary)' }}>Mkt Cap</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>R$ {c.marketCapBrlB}B</div>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: 4 }}>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-secondary)' }}>ROE</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: c.roePct < 0 ? 'var(--status-crit)' : 'var(--text-primary)' }}>
                      {c.roePct}%
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: 4 }}>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-secondary)' }}>DataJud</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {c.laborCases.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '5px 7px', borderRadius: 4 }}>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-secondary)' }}>Offshore</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>{c.offshoreCount}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: D1-D6 Hexagonal Radar + What-If Regulatory Stress Simulator */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: verdict.color, fontWeight: 700 }}>
                SCORE SASE: {totalScore}/100 — {verdict.label}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
                {selected.ticker} · {selected.name}
              </div>
            </div>
            <div className="seg-switch">
              <button
                onClick={() => setViewMode('radar')}
                className={`seg-btn ${viewMode === 'radar' ? 'active' : ''}`}
              >
                <Scale size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Radar D1–D6
              </button>
              <button
                onClick={() => setViewMode('graph')}
                className={`seg-btn ${viewMode === 'graph' ? 'active' : ''}`}
              >
                <Network size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Rede Offshore
              </button>
            </div>
          </div>

          {viewMode === 'radar' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'center' }}>
              <svg viewBox="0 0 270 250" style={{ width: '100%', maxWidth: 260, margin: '0 auto', display: 'block' }}>
                {[0.33, 0.66, 1].map((lv) => (
                  <polygon
                    key={lv}
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="1"
                    points={DIMS_SPEC.map((_, idx) => {
                      const a = (Math.PI / 3) * idx - Math.PI / 2;
                      return `${135 + Math.cos(a) * 86 * lv},${125 + Math.sin(a) * 86 * lv}`;
                    }).join(' ')}
                  />
                ))}
                {radarPoints.map((p) => (
                  <g key={p.code}>
                    <line x1={135} y1={125} x2={p.ox} y2={p.oy} stroke="var(--border-subtle)" />
                    <text
                      x={p.lx}
                      y={p.ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="var(--text-secondary)"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {p.code} ({p.val}/{p.max})
                    </text>
                  </g>
                ))}
                <polygon
                  points={radarPoints.map((p) => `${p.px},${p.py}`).join(' ')}
                  fill="rgba(254, 19, 1, 0.22)"
                  stroke="#FE1301"
                  strokeWidth="2.2"
                />
                {radarPoints.map((p) => (
                  <circle key={p.code} cx={p.px} cy={p.py} r="3.5" fill="#FE1301" />
                ))}
              </svg>

              {/* Interactive Stress Simulator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sliders size={13} /> {lang === 'pt' ? 'SIMULADOR DE EVENTO REGULATÓRIO (score.ts)' : 'REGULATORY STRESS SIMULATOR (score.ts)'}
                </div>
                {[
                  {
                    key: 'ceisSanction' as const,
                    pt: 'Simular apontamento CEIS/CNEP (-12 pts D4)',
                    en: 'Simulate Federal CEIS Sanction (-12 pts D4)',
                  },
                  {
                    key: 'ibamaEmbargo' as const,
                    pt: 'Simular embargo IBAMA SISNAMA (-5 pts D3)',
                    en: 'Simulate IBAMA Env. Embargo (-5 pts D3)',
                  },
                  {
                    key: 'undeclaredOffshore' as const,
                    pt: 'Simular 2 offshores omitidas no FRE (-6 pts D1)',
                    en: 'Simulate 2 undeclared offshores (-6 pts D1)',
                  },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 10px',
                      background: 'var(--surface-2)',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={simPenalties[opt.key]}
                      onChange={(e) => setSimPenalties((s) => ({ ...s, [opt.key]: e.target.checked }))}
                      style={{ accentColor: '#FE1301' }}
                    />
                    <span>{opt[lang]}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            /* Corporate & Offshore Network SVG */
            <div style={{ background: '#090b10', borderRadius: 8, padding: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg viewBox="0 0 460 210" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <line x1={230} y1={105} x2={95} y2={48} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                <line x1={230} y1={105} x2={95} y2={162} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                <line x1={230} y1={105} x2={365} y2={52} stroke="#FE1301" strokeDasharray="4 3" strokeWidth="1.6" />
                <line x1={230} y1={105} x2={365} y2={158} stroke="#FE1301" strokeDasharray="4 3" strokeWidth="1.6" />

                {/* Controllers */}
                {selected.sharedControllers.map((ctrl, idx) => (
                  <g key={ctrl} transform={`translate(95, ${idx === 0 ? 48 : 162})`}>
                    <circle r="16" fill="#151824" stroke="#38bdf8" strokeWidth="1.8" />
                    <text y="28" textAnchor="middle" fill="#e4e4e4" fontSize="9" fontFamily="JetBrains Mono, monospace">
                      {ctrl}
                    </text>
                  </g>
                ))}

                {/* Central Audited Company */}
                <g transform="translate(230, 105)">
                  <circle r="24" fill="#FE1301" />
                  <text textAnchor="middle" dominantBaseline="middle" fill="#fff" fontWeight="700" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
                    {selected.ticker}
                  </text>
                </g>

                {/* Offshore / Cross-Shareholding Nodes */}
                <g transform="translate(365, 52)">
                  <circle r="15" fill="#1b1416" stroke="#FE1301" strokeWidth="1.8" />
                  <text y="27" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="JetBrains Mono, monospace">
                    Offshore ({selected.offshoreCount} veículos)
                  </text>
                </g>
                <g transform="translate(365, 158)">
                  <circle r="15" fill="#151824" stroke="#f59e0b" strokeWidth="1.8" />
                  <text y="27" textAnchor="middle" fill="#fde68a" fontSize="9" fontFamily="JetBrains Mono, monospace">
                    Conselho Cruzado B3
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Grounded AI Auditor Opinion */}
      <div
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} />
            {lang === 'pt'
              ? 'PARECER FUNDAMENTADO DE AUDITORIA SOCIAL (AGENTE SASE · CITAÇÃO PRIMÁRIA OBRIGATÓRIA)'
              : 'GROUNDED SOCIAL AUDIT OPINION (SASE AI AUDITOR · MANDATORY PRIMARY CITATIONS)'}
          </span>
          <span className="micro-pill">LGPD Art. 7º III/VI · LAI 12.527/11</span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          {selected.aiBrief[lang].summary}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8, marginBottom: 10 }}>
          {selected.aiBrief[lang].evidence.map((ev) => (
            <div
              key={ev}
              style={{
                padding: '8px 10px',
                background: 'var(--surface-2)',
                borderRadius: 6,
                fontSize: '0.78rem',
                display: 'flex',
                gap: 7,
                alignItems: 'flex-start',
              }}
            >
              {totalScore >= 65 ? (
                <CheckCircle2 size={14} color="var(--status-ok)" style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <AlertOctagon size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
              )}
              <span>{ev}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>
            {lang === 'pt' ? 'Recomendação Técnica:' : 'Audit Recommendation:'}
          </strong>{' '}
          {selected.aiBrief[lang].recommendation}
        </div>
      </div>
    </div>
  );
};
