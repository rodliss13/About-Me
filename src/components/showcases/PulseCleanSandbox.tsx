import React, { useState, useMemo } from 'react';
import { HardDrive, Shield, RotateCcw, PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import type { Lang } from '../../data/portfolioData';

type GuardLevel = 'ALLOW' | 'REVIEW' | 'READ_ONLY' | 'BLOCK';

interface CleanCandidate {
  id: string;
  name: string;
  pathMasked: string;
  sizeMb: number;
  kind: Record<Lang, string>;
  guard: GuardLevel;
  similarityScore: number; // 0..100
  band: 'REMOVE' | 'REVIEW' | 'PROTECT';
  reasons: Record<Lang, string[]>;
}

const INITIAL_ITEMS: CleanCandidate[] = [
  {
    id: 'pc-1',
    name: 'Temp \\ vs_installer_staging',
    pathMasked: '~\\AppData\\Local\\Temp\\xurhvdhp',
    sizeMb: 4210,
    kind: { pt: 'Temporários Regeneráveis', en: 'Regenerable Temp Staging' },
    guard: 'ALLOW',
    similarityScore: 12,
    band: 'REMOVE',
    reasons: {
      pt: [
        'R=0.05: Instalador temporário sem processo ativo há 48 dias',
        'C=0.04: 98% dos blocos sem leitura/escrita há 60+ dias',
        'Guard=ALLOW: Filho direto de %TEMP% sem documentos de usuário',
      ],
      en: [
        'R=0.05: Staging installer untouched by active processes for 48 days',
        'C=0.04: 98% of blocks unmodified for 60+ days',
        'Guard=ALLOW: Direct child of %TEMP% with zero user documents',
      ],
    },
  },
  {
    id: 'pc-2',
    name: 'NVIDIA DXCache / GLCache (Antigos)',
    pathMasked: '~\\AppData\\Local\\NVIDIA\\DXCache',
    sizeMb: 3820,
    kind: { pt: 'Cache de Shaders GPU', en: 'GPU Shader Cache' },
    guard: 'ALLOW',
    similarityScore: 22,
    band: 'REMOVE',
    reasons: {
      pt: [
        'N=0.45: Cache de shaders — o driver recria sob demanda',
        'C=0.08: 93% dos arquivos parados há 60+ dias (arquivos em uso são pulados)',
      ],
      en: [
        'N=0.45: Driver shader cache — automatically regenerated on demand',
        'C=0.08: 93% of files idle 60+ days (locked active shaders skipped safely)',
      ],
    },
  },
  {
    id: 'pc-3',
    name: 'LegacyUpdater_Orphan',
    pathMasked: '~\\AppData\\Roaming\\NetLauncherOld',
    sizeMb: 640,
    kind: { pt: 'Pasta Órfã Detectada (84%)', en: 'Orphan Folder Detected (84%)' },
    guard: 'REVIEW',
    similarityScore: 18,
    band: 'REMOVE',
    reasons: {
      pt: [
        'I=0.16: Nenhum programa em HKLM/HKCU Uninstall ou AppX corresponde (órfã 84%)',
        'R=0.00 / F=0.00: Zero execuções registradas no histórico UserAssist do Windows',
      ],
      en: [
        'I=0.16: Zero matching entries in HKLM/HKCU Uninstall or AppX (84% orphan confidence)',
        'R=0.00 / F=0.00: Zero launches found in Windows UserAssist history',
      ],
    },
  },
  {
    id: 'pc-4',
    name: 'npm-cache (_cacache)',
    pathMasked: '~\\AppData\\Local\\npm-cache',
    sizeMb: 2940,
    kind: { pt: 'Cache Ecossistema Ativo', en: 'Active Dev Ecosystem Cache' },
    guard: 'ALLOW',
    similarityScore: 54,
    band: 'REVIEW',
    reasons: {
      pt: [
        'A=0.92: Alta afinidade com seu perfil (40+ arquivos .ts/.json abertos em 30 dias)',
        'Regra sim-1: Cache de ecossistema ativo desce para "Revisar → limpar só >60 dias"',
      ],
      en: [
        'A=0.92: Strong ecosystem affinity (40+ .ts/.json files opened in last 30 days)',
        'sim-1 Rule: Active dev cache downgraded to "Review → purge >60d stale entries only"',
      ],
    },
  },
  {
    id: 'pc-5',
    name: '.docker \\ models & WSL vhdx',
    pathMasked: '~\\.docker\\models',
    sizeMb: 14200,
    kind: { pt: 'Contêineres / Modelos Locais', en: 'Containers & Local Models' },
    guard: 'READ_ONLY',
    similarityScore: 81,
    band: 'PROTECT',
    reasons: {
      pt: [
        'Herança de Dono: Subpasta de dot-folder herda vínculo com Docker Desktop instalado',
        'Guard=READ_ONLY: Discos virtuais .vhdx e modelos exigem CLI oficial (nunca movidos pelo limpador)',
      ],
      en: [
        'Owner Inheritance: Dot-folder child inherits installed Docker Desktop ownership',
        'Guard=READ_ONLY: Virtual disks (.vhdx) & models require native CLI (never touched)',
      ],
    },
  },
  {
    id: 'pc-6',
    name: 'OneDrive Placeholders & .git',
    pathMasked: '~\\OneDrive\\Projetos\\.git',
    sizeMb: 5100,
    kind: { pt: 'Trabalho & Nuvem Protegida', en: 'Protected Cloud & Git Worktree' },
    guard: 'BLOCK',
    similarityScore: 98,
    band: 'PROTECT',
    reasons: {
      pt: [
        'Guard=BLOCK Estrutural: Repositórios .git e arquivos OneDrive (RECALL_ON_DATA_ACCESS) são imutáveis',
        'Garantia verificada por suíte de 93 testes automatizados',
      ],
      en: [
        'Structural Guard=BLOCK: .git repositories and OneDrive cloud placeholders are strictly immutable',
        'Enforced by 93-test automated protection suite',
      ],
    },
  },
];

const GUARD_TEST_SAMPLES = [
  { path: 'C:\\Windows\\System32\\drivers\\etc', verdict: 'BLOCK' as GuardLevel, whyPt: 'Raiz crítica do sistema operacional (System32)', whyEn: 'Critical OS kernel/system directory (System32)' },
  { path: '~\\OneDrive\\Documentos\\Relatorio.xlsx', verdict: 'BLOCK' as GuardLevel, whyPt: 'Sincronização em nuvem OneDrive bloqueada contra exclusão em cascata', whyEn: 'OneDrive synced path blocked to prevent cloud deletion propagation' },
  { path: '~\\.ssh\\id_ed25519', verdict: 'BLOCK' as GuardLevel, whyPt: 'Regra transversal de segredos criptográficos (.ssh / DPAPI / .pfx)', whyEn: 'Cross-cutting cryptographic secret rule (.ssh / DPAPI / .pfx)' },
  { path: 'C:\\Windows\\Prefetch', verdict: 'READ_ONLY' as GuardLevel, whyPt: 'Somente diagnóstico: apagar Prefetch degrada abertura de apps', whyEn: 'Diagnostic only: wiping Prefetch degrades app launch latency' },
  { path: '~\\AppData\\Local\\Temp\\build_tmp_99', verdict: 'ALLOW' as GuardLevel, whyPt: 'Filho elegível de %TEMP% sem escrita nas últimas 24h', whyEn: 'Actionable child inside %TEMP% older than 24h' },
];

export const PulseCleanSandbox: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['pc-1', 'pc-2', 'pc-3']);
  const [focusedId, setFocusedId] = useState<string>('pc-1');
  const [quarantinedIds, setQuarantinedIds] = useState<string[]>([]);
  const [simulatedPlanHash, setSimulatedPlanHash] = useState<string | null>(null);
  const [guardProbeIdx, setGuardProbeIdx] = useState<number>(0);

  const activeItems = useMemo(
    () => INITIAL_ITEMS.filter((it) => !quarantinedIds.includes(it.id)),
    [quarantinedIds]
  );

  const quarantinedItems = useMemo(
    () => INITIAL_ITEMS.filter((it) => quarantinedIds.includes(it.id)),
    [quarantinedIds]
  );

  const focused = INITIAL_ITEMS.find((i) => i.id === focusedId) || INITIAL_ITEMS[0];

  const reclaimableMb = useMemo(() => {
    return activeItems
      .filter((i) => selectedIds.includes(i.id) && (i.guard === 'ALLOW' || i.guard === 'REVIEW'))
      .reduce((acc, cur) => acc + cur.sizeMb, 0);
  }, [activeItems, selectedIds]);

  const reclaimedAlreadyMb = useMemo(
    () => quarantinedItems.reduce((a, b) => a + b.sizeMb, 0),
    [quarantinedItems]
  );

  const toggleSelect = (item: CleanCandidate) => {
    setFocusedId(item.id);
    if (item.guard === 'BLOCK' || item.guard === 'READ_ONLY') return;
    setSimulatedPlanHash(null);
    setSelectedIds((prev) =>
      prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]
    );
  };

  const handleDryRun = () => {
    if (reclaimableMb === 0) return;
    setSimulatedPlanHash(`sha256:8f41c0e9...${reclaimableMb}b2`);
  };

  const handleExecuteQuarantine = () => {
    if (!simulatedPlanHash) return;
    const allowedIds = activeItems
      .filter((i) => selectedIds.includes(i.id) && (i.guard === 'ALLOW' || i.guard === 'REVIEW'))
      .map((i) => i.id);
    setQuarantinedIds((prev) => [...prev, ...allowedIds]);
    setSelectedIds([]);
    setSimulatedPlanHash(null);
  };

  const handleRestoreAll = () => {
    setQuarantinedIds([]);
    setSelectedIds(['pc-1', 'pc-2', 'pc-3']);
  };

  const freeDiskGb = (13.6 + reclaimedAlreadyMb / 1024).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top Health Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
        <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {lang === 'pt' ? 'ESPAÇO LIVRE EM C:' : 'FREE SPACE ON C:'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: Number(freeDiskGb) > 18 ? 'var(--status-ok)' : 'var(--accent)' }}>
            {freeDiskGb} GB
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            {reclaimedAlreadyMb > 0
              ? `+${(reclaimedAlreadyMb / 1024).toFixed(1)} GB em quarentena reversível`
              : lang === 'pt'
              ? 'Disco em alerta (<15 GB)'
              : 'Low disk threshold (<15 GB)'}
          </div>
        </div>

        <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {lang === 'pt' ? 'SELECIONADO P/ DRY-RUN' : 'SELECTED FOR DRY-RUN'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {(reclaimableMb / 1024).toFixed(2)} GB
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--status-ok)' }}>
            Guard: 0 itens BLOCK incluídos
          </div>
        </div>

        <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {lang === 'pt' ? 'GARANTIA DE PRIVACIDADE' : 'PRIVACY GUARANTEE'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--status-info)' }}>
            100% OFFLINE
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            SQLite WAL · Zero-Socket Verified
          </div>
        </div>
      </div>

      {/* Main Split: Interactive Treemap/Table + Explainable Similarity & Dry-Run Planner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 16 }}>
        {/* Left: Raio-X + Similarity Selection */}
        <div
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <HardDrive size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {lang === 'pt' ? 'RAIO-X DE PASTAS OCULTAS & SIMILARIDADE (sim-1)' : 'HIDDEN X-RAY & SIMILARITY ENGINE (sim-1)'}
            </span>
            <span>Click = Inspect/Select</span>
          </div>

          {activeItems.map((it) => {
            const checked = selectedIds.includes(it.id);
            const locked = it.guard === 'BLOCK' || it.guard === 'READ_ONLY';
            const guardColor =
              it.guard === 'ALLOW'
                ? 'var(--status-ok)'
                : it.guard === 'REVIEW'
                ? 'var(--status-warn)'
                : it.guard === 'READ_ONLY'
                ? 'var(--status-info)'
                : 'var(--accent)';

            return (
              <div
                key={it.id}
                onClick={() => toggleSelect(it)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '9px 11px',
                  borderRadius: 6,
                  background: focused.id === it.id ? 'var(--surface-2)' : 'var(--bg-subtle)',
                  border: `1px solid ${focused.id === it.id ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  opacity: locked ? 0.86 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={locked}
                    readOnly
                    style={{ accentColor: '#FE1301' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{it.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                      {it.pathMasked} · {(it.sizeMb / 1024).toFixed(2)} GB
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: guardColor }}>
                    {it.guard}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.67rem', color: 'var(--text-secondary)' }}>
                    Sim: {it.similarityScore}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Natural-Language Explanation + Structural Dry-Run Executor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 6 }}>
              {lang === 'pt' ? 'POR QUE ESTE SCORE? (EXPLICABILIDADE POR CONSTRUÇÃO)' : 'WHY THIS SCORE? (EXPLAINABILITY BY CONSTRUCTION)'}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              {focused.name} — Score {focused.similarityScore}% ({focused.band})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {focused.reasons[lang].map((r) => (
                <div
                  key={r}
                  style={{
                    padding: '7px 10px',
                    background: 'var(--surface-2)',
                    borderRadius: 5,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Structural Dry-Run -> Signed Plan -> Quarantine */}
          <div
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: 8,
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              <Lock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {lang === 'pt'
                ? 'FLUXO OBRIGATÓRIO: SIMULAR (DRY-RUN) → VALIDAR PLAN_HASH → QUARENTENA 14 DIAS'
                : 'MANDATORY PIPELINE: SIMULATE (DRY-RUN) → VERIFY PLAN_HASH → 14-DAY QUARANTINE'}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleDryRun}
                disabled={reclaimableMb === 0}
                className="btn btn-outline btn-sm"
              >
                <PlayCircle size={14} />
                {lang === 'pt' ? '1. Simular Plano (Dry-Run)' : '1. Simulate Plan (Dry-Run)'}
              </button>

              <button
                type="button"
                onClick={handleExecuteQuarantine}
                disabled={!simulatedPlanHash}
                className="btn btn-primary btn-sm"
                style={{ opacity: simulatedPlanHash ? 1 : 0.45 }}
              >
                <CheckCircle2 size={14} />
                {lang === 'pt' ? '2. Mover p/ Quarentena Assinada' : '2. Move to Signed Quarantine'}
              </button>

              {quarantinedItems.length > 0 && (
                <button type="button" onClick={handleRestoreAll} className="btn btn-ghost btn-sm">
                  <RotateCcw size={13} />
                  {lang === 'pt' ? `Restaurar (${quarantinedItems.length})` : `Restore (${quarantinedItems.length})`}
                </button>
              )}
            </div>

            {simulatedPlanHash && (
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--status-ok)', background: 'var(--status-ok-bg)', padding: '7px 10px', borderRadius: 5 }}>
                ✓ Dry-run aprovado pelo Safety Guard · plan_hash = {simulatedPlanHash}
              </div>
            )}
          </div>

          {/* Interactive Guard Policy Tester */}
          <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
              <Shield size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {lang === 'pt' ? 'TESTAR VEREDITO DO SAFETY GUARD (safety/guard.py):' : 'TEST SAFETY GUARD VERDICT (safety/guard.py):'}
            </div>
            <select
              value={guardProbeIdx}
              onChange={(e) => setGuardProbeIdx(Number(e.target.value))}
              style={{
                width: '100%',
                background: 'var(--surface-2)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 5,
                padding: '6px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                marginBottom: 6,
              }}
            >
              {GUARD_TEST_SAMPLES.map((g, idx) => (
                <option key={g.path} value={idx}>
                  {g.path}
                </option>
              ))}
            </select>
            <div style={{ fontSize: '0.77rem' }}>
              <strong style={{ fontFamily: 'var(--font-mono)', color: GUARD_TEST_SAMPLES[guardProbeIdx].verdict === 'ALLOW' ? 'var(--status-ok)' : 'var(--accent)' }}>
                [{GUARD_TEST_SAMPLES[guardProbeIdx].verdict}]
              </strong>{' '}
              — {lang === 'pt' ? GUARD_TEST_SAMPLES[guardProbeIdx].whyPt : GUARD_TEST_SAMPLES[guardProbeIdx].whyEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
