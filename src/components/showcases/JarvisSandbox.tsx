import React, { useState } from 'react';
import {
  Cpu,
  ShieldAlert,
  Check,
  X,
  Zap,
  GitBranch,
  Sun,
  Lock,
  Terminal,
} from 'lucide-react';
import type { Lang } from '../../data/portfolioData';

interface JarvisScenario {
  id: string;
  prompt: Record<Lang, string>;
  route: 'INSTANT' | 'WEB_OFFICIAL' | 'AGENT_TOOL' | 'TAINTED_WRITE' | 'DEEP_OPUS';
  selectedModel: string;
  fallbackModel: string;
  latencyMs: number;
  costUsd: string;
  opusBaselineUsd: string;
  risk: 'READ · AUTO' | 'WRITE · TAINTED (APPROVAL + TOTP)';
  toolCall: string;
  requiresApproval?: boolean;
  response: Record<Lang, string>;
}

const SCENARIOS: JarvisScenario[] = [
  {
    id: 'morning',
    prompt: {
      pt: '☀ Olá, Jarvis — me atualiza (Agenda, Farol PMO, Prioridades e Dólar PTAX)',
      en: '☀ Hello, Jarvis — run morning executive briefing (Calendar, PMO Traffic Lights & PTAX)',
    },
    route: 'AGENT_TOOL',
    selectedModel: 'claude-sonnet-4-6 (cached prompt)',
    fallbackModel: 'gemini-2.5-pro',
    latencyMs: 690,
    costUsd: '$0.0019',
    opusBaselineUsd: '$0.0240',
    risk: 'READ · AUTO',
    toolCall: 'briefing_run({ outlook: true, pmo_cycle: "2026.2", vault_note: "Prioridades.md" })',
    response: {
      pt: 'Bom dia, Rodrigo. 1) Agenda: Comitê de Fomento às 14h00 (exige dossiê técnico consolidado) e revisão de governança às 16h30. 2) Painel PMO (ciclo 2026.2): 12 projetos em farol verde e 2 em atenção preventiva de cronograma físico-financeiro. 3) Outlook: 4 não lidos sinalizados. 4) PTAX: R$ 5,42. Por onde quer começar?',
      en: 'Good morning, Rodrigo. 1) Calendar: R&D Funding Committee at 14:00 (requires consolidated technical dossier) and Governance Review at 16:30. 2) PMO Command Center (2026.2): 12 green projects, 2 under preventive schedule watch. 3) Outlook: 4 flagged unread items. 4) USD/BRL PTAX: 5.42. Where would you like to start?',
    },
  },
  {
    id: 'instant',
    prompt: {
      pt: 'Jarvis, como está a saúde térmica, RAM e disco do nó agora?',
      en: 'Jarvis, check current node CPU, RAM, and free disk telemetry.',
    },
    route: 'INSTANT',
    selectedModel: 'gemini-2.5-flash-lite (via Jev Classifier)',
    fallbackModel: 'claude-haiku-4-5',
    latencyMs: 410,
    costUsd: '$0.0001',
    opusBaselineUsd: '$0.0145',
    risk: 'READ · AUTO',
    toolCall: 'system_status({ top_procs: 5 })',
    response: {
      pt: 'Tudo em ordem. CPU estável em 16%, memória em 5,2 / 16,0 GB (32%), SSD principal com 48,4 GB livres e 0 alertas nos monitores determinísticos. Economia de 99,3% nesta rota via classificador Jev.',
      en: 'All systems nominal. CPU steady at 16%, memory at 5.2 / 16.0 GB (32%), primary NVMe with 48.4 GB free, and 0 alerts on zero-AI deterministic monitors. 99.3% token cost reduction via Jev router.',
    },
  },
  {
    id: 'tainted',
    prompt: {
      pt: 'Leia o e-mail externo recém-recebido e dispare fluxo Power Automate gravando rascunho de resposta',
      en: 'Read incoming external email and trigger Power Automate flow + draft Outlook reply',
    },
    route: 'TAINTED_WRITE',
    selectedModel: 'claude-sonnet-4-6 + Security Policy Gate',
    fallbackModel: 'gemini-2.5-pro',
    latencyMs: 820,
    costUsd: '$0.0028',
    opusBaselineUsd: '$0.0280',
    risk: 'WRITE · TAINTED (APPROVAL + TOTP)',
    toolCall: 'power_automate_trigger({ flow: "status_sync" }) + mail_draft_create()',
    requiresApproval: true,
    response: {
      pt: '[PORTÃO DE SEGURANÇA] Sessão marcada como CONTAMINADA (conteúdo externo lido de caixa de entrada). Nenhuma escrita ou disparo externo executa sem sua confirmação explícita + TOTP.',
      en: '[SECURITY GATE] Session flagged as TAINTED (untrusted external email ingested). Outbound flow execution and draft creation paused pending explicit human approval + TOTP.',
    },
  },
  {
    id: 'deep',
    prompt: {
      pt: 'Audite a matriz de elegibilidade EMBRAPII vs. lançamentos de contrapartida econômica e gere parecer',
      en: 'Audit EMBRAPII eligibility rules against economic counterpart ledger entries and issue memo',
    },
    route: 'DEEP_OPUS',
    selectedModel: 'claude-opus-4-6 (effort: high) + Local Hybrid RAG',
    fallbackModel: 'gemini-2.5-pro (thoughtSignature converted)',
    latencyMs: 1840,
    costUsd: '$0.0190',
    opusBaselineUsd: '$0.0190',
    risk: 'READ · AUTO',
    toolCall: 'knowledge_search({ tag: "EMBRAPII", mode: "fts5+vector" })',
    response: {
      pt: 'Cruzamento concluído sobre 14 notas do Segundo Cérebro (Obsidian). Conformidade validada: despesas de suporte operacional respeitam o teto de 15% na Conta Empresa e não há provisionamento rescisório vedado na Conta EMBRAPII.',
      en: 'Cross-audit completed across 14 local Obsidian Second-Brain notes. Full compliance verified: operational support stays under the 15% Company Account cap with zero prohibited severance accruals.',
    },
  },
];

interface AuditEntry {
  seq: number;
  action: string;
  verdict: string;
  hash: string;
}

export const JarvisSandbox: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('morning');
  const [approvalState, setApprovalState] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [totpCode, setTotpCode] = useState('482910');
  const [providerDownSim, setProviderDownSim] = useState<boolean>(false);
  const [harnessStep, setHarnessStep] = useState<number>(4);
  const [auditChain, setAuditChain] = useState<AuditEntry[]>([
    { seq: 101, action: 'ws.auth(device:pwa-tailscale)', verdict: 'OK', hash: '9f84c2...a10e' },
    { seq: 102, action: 'briefing_run(READ)', verdict: 'AUTO_ALLOW', hash: '3b71d9...88c4' },
    { seq: 103, action: 'knowledge_search(fts5+vec)', verdict: 'AUTO_ALLOW', hash: 'e4120f...52b7' },
  ]);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setApprovalState('pending');
  };

  const handleDecision = (approve: boolean) => {
    setApprovalState(approve ? 'approved' : 'denied');
    const nextSeq = auditChain[auditChain.length - 1].seq + 1;
    const pseudoHash = approve ? '7c09e4...f319' : '0d44a8...11e2';
    setAuditChain((prev) => [
      ...prev,
      {
        seq: nextSeq,
        action: `tainted_gate(${scenario.id}, totp=${totpCode ? 'VALID' : 'NONE'})`,
        verdict: approve ? 'HUMAN_APPROVED' : 'HUMAN_DENIED',
        hash: pseudoHash,
      },
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* HUD Top Status Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          background: '#080b11',
          color: '#e4e4e4',
          borderRadius: 8,
          border: '1px solid rgba(56, 189, 248, 0.22)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: scenario.requiresApproval && approvalState === 'pending' ? '#f59e0b' : '#38bdf8',
              boxShadow: '0 0 12px #38bdf8',
            }}
          />
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.12em' }}>
            J.A.R.V.I.S. · NODE 127.0.0.1:8765
          </strong>
          <span className="micro-pill" style={{ color: '#38bdf8', borderColor: 'rgba(56,189,248,0.3)' }}>
            Tailscale WireGuard P2P
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={providerDownSim}
              onChange={(e) => setProviderDownSim(e.target.checked)}
              style={{ accentColor: '#FE1301' }}
            />
            {lang === 'pt' ? 'Simular Queda Provedor Primário (Failover)' : 'Simulate Primary LLM Outage (Failover)'}
          </label>
          <span className="micro-pill accent">-89% FinOps Token Cost</span>
        </div>
      </div>

      {/* Main 3-Column HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))', gap: 14 }}>
        {/* Col 1: Node Telemetry + Prompt Router Scenarios */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={13} /> {lang === 'pt' ? 'DISPARAR COMANDO NO ROTEADOR JEV' : 'DISPATCH COMMAND TO JEV ROUTER'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {SCENARIOS.map((sc) => {
              const active = sc.id === scenario.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 6,
                    background: active ? 'var(--surface-2)' : 'var(--bg-subtle)',
                    border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)', marginBottom: 3 }}>
                    <span>ROUTE: {sc.route}</span>
                    <span>{sc.costUsd}</span>
                  </div>
                  <div style={{ fontSize: '0.79rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {sc.prompt[lang]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 2: Reactor Core + Streaming Agent Execution + Security Approval Gate */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Orb + Active Model */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="68" height="68" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
              <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="2" strokeDasharray="8 4" />
              <circle
                cx="40"
                cy="40"
                r="25"
                fill="none"
                stroke={scenario.requiresApproval && approvalState === 'pending' ? '#FE1301' : '#38bdf8'}
                strokeWidth="3"
                strokeDasharray="22 8"
              />
              <circle
                cx="40"
                cy="40"
                r="11"
                fill={scenario.requiresApproval && approvalState === 'pending' ? '#FE1301' : '#38bdf8'}
              />
            </svg>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                {providerDownSim
                  ? lang === 'pt'
                    ? '⚡ CIRCUIT BREAKER ATIVO → FAILOVER AUTOMÁTICO:'
                    : '⚡ CIRCUIT BREAKER TRIPPED → LIVE FAILOVER:'
                  : lang === 'pt'
                  ? 'MODELO SELECIONADO PELO ROTEADOR:'
                  : 'ROUTER-SELECTED MODEL:'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.82rem', color: providerDownSim ? 'var(--accent)' : 'var(--text-primary)' }}>
                {providerDownSim ? scenario.fallbackModel : scenario.selectedModel}
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                Latency: {scenario.latencyMs}ms · Cost: {scenario.costUsd} (vs Opus {scenario.opusBaselineUsd})
              </div>
            </div>
          </div>

          {/* Tool Call Pill */}
          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 6,
              padding: '8px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.73rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: 'var(--status-info)' }}>
                <Terminal size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                tool_use
              </span>
              <span style={{ color: scenario.requiresApproval ? 'var(--accent)' : 'var(--status-ok)' }}>
                {scenario.risk}
              </span>
            </div>
            <div style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{scenario.toolCall}</div>
          </div>

          {/* Response or Taint Gate Prompt */}
          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 6,
              padding: 12,
              fontSize: '0.82rem',
              borderLeft: `3px solid ${scenario.requiresApproval && approvalState === 'pending' ? 'var(--accent)' : 'var(--status-ok)'}`,
            }}
          >
            {scenario.requiresApproval && approvalState === 'pending' ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
                  <ShieldAlert size={15} />
                  {lang === 'pt'
                    ? 'Aprovação Humana + TOTP Exigida (Sessão Contaminada)'
                    : 'Human Push Approval + TOTP Required (Tainted Session)'}
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '0.79rem' }}>{scenario.response[lang]}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    maxLength={6}
                    aria-label="TOTP 6-digit code"
                    style={{
                      width: 86,
                      padding: '5px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      borderRadius: 4,
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface-1)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <button onClick={() => handleDecision(true)} className="btn btn-primary btn-sm">
                    <Check size={13} /> {lang === 'pt' ? 'Aprovar c/ TOTP' : 'Approve w/ TOTP'}
                  </button>
                  <button onClick={() => handleDecision(false)} className="btn btn-outline btn-sm">
                    <X size={13} /> {lang === 'pt' ? 'Bloquear' : 'Deny'}
                  </button>
                </div>
              </div>
            ) : scenario.requiresApproval && approvalState !== 'pending' ? (
              <div>
                <strong style={{ color: approvalState === 'approved' ? 'var(--status-ok)' : 'var(--accent)' }}>
                  {approvalState === 'approved'
                    ? lang === 'pt'
                      ? '✓ Autorizado por dispositivo pareado (TOTP válido): Rascunho salvo em Rascunhos do Outlook (JARVIS nunca envia e-mail sozinho) e registrado na cadeia SHA-256.'
                      : '✓ Authorized by paired device (valid TOTP): Draft saved to Outlook Drafts (JARVIS never sends mail autonomously) and logged to SHA-256 chain.'
                    : lang === 'pt'
                    ? '✕ Execução bloqueada pelo usuário. Nenhum efeito colateral realizado; recusa gravada no audit_log.'
                    : '✕ Execution blocked by user. Zero side effects performed; refusal recorded in tamper-evident audit_log.'}
                </strong>
              </div>
            ) : (
              <div>{scenario.response[lang]}</div>
            )}
          </div>
        </div>

        {/* Col 3: Harness² Self-Improvement + SHA-256 Audit Ledger */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <GitBranch size={13} /> HARNESS² — RECURSIVE AGENT HARNESSING (4k RUNS)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { step: 1, pt: '1. Execução-Base + Proposta INV (procedimento/ferramentas)', en: '1. Baseline Run + INV Proposal (tool procedure)' },
                { step: 2, pt: '2. Proposta DOM (regras de domínio contábil/PMO)', en: '2. DOM Proposal (accounting/PMO domain invariants)' },
                { step: 3, pt: '3. Composição por Contraste + Validação AST Sem Afrouxar Portão', en: '3. Contrastive Compose + AST Guardrail Validation' },
                { step: 4, pt: '4. Seleção Cega Embaralhada → Lição Salva na Biblioteca', en: '4. Shuffled Blind Selection → Domain Lesson Stored' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setHarnessStep(s.step)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 9px',
                    borderRadius: 5,
                    fontSize: '0.74rem',
                    background: harnessStep === s.step ? 'var(--accent-soft)' : 'var(--surface-2)',
                    border: `1px solid ${harnessStep === s.step ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {s[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Hash-chained Audit Trail */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                <Lock size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                jarvis audit verify
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--status-ok)' }}>
                HASH CHAIN INTACT ✓
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {auditChain.slice(-3).map((a) => (
                <div
                  key={a.seq}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.69rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '4px 7px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 4,
                  }}
                >
                  <span>#{a.seq} {a.action.slice(0, 24)}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{a.hash}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Capabilities Bar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <span className="micro-pill"><Sun size={11} style={{ verticalAlign: 'middle' }} /> Wake Word Offline: Whisper + Piper</span>
        <span className="micro-pill"><Zap size={11} style={{ verticalAlign: 'middle' }} /> Hub Cloud Queue (Wake-on-LAN)</span>
        <span className="micro-pill">MCP Bridge (Windows-MCP · M365 · GitHub)</span>
      </div>
    </div>
  );
};
