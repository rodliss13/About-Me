import React, { useState, useEffect, useMemo } from 'react';
import {
  Truck,
  Play,
  Pause,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileText,
  Layers,
  MapPin,
  Search,
} from 'lucide-react';
import type { Lang } from '../../data/portfolioData';

interface RouteStop {
  name: string;
  kind: 'origin' | 'cte' | 'hub' | 'cdd' | 'dest';
  x: number;
  y: number;
  at: string;
}

interface EtaEngineRow {
  engine: string;
  durationMin: number;
  trafficDelayMin: number;
  mode: 'LIVE_REGIONAL' | 'OSRM_BASE';
}

interface SyntheticShipment {
  id: string;
  code: string;
  sender: string;
  carrier: string;
  sources: string[];
  status: 'OUT_FOR_DELIVERY' | 'IN_TRANSIT' | 'AT_HUB' | 'DELIVERED' | 'DELAYED';
  progress: number; // 0..100
  etaLabel: Record<Lang, string>;
  confidenceBand: string;
  distanceKm: number;
  driverRestHours: number;
  hubDwellHours: number;
  matchScore: number;
  matchReasons: Record<Lang, string[]>;
  items: { sku: string; ncm: string; desc: Record<Lang, string>; qty: number; valBrl: number; source: string }[];
  nfeSummary: { series: string; issuerCnpjMasked: string; status: string; protocol: string };
  stops: RouteStop[];
  etaRows: EtaEngineRow[];
  divergenceNote: Record<Lang, string>;
}

const INITIAL_SHIPMENTS: SyntheticShipment[] = [
  {
    id: 'shp-1',
    code: 'NX849201745BR',
    sender: ' Dell Technologies Lab Supply (Mock)',
    carrier: 'Correios SEDEX CWS',
    sources: ['Correios CWS', '17TRACK v2.2', 'Ship24', 'NF-e XML'],
    status: 'OUT_FOR_DELIVERY',
    progress: 86,
    etaLabel: { pt: 'Hoje · 14:20 – 15:05 BRT', en: 'Today · 14:20 – 15:05 BRT' },
    confidenceBand: '94%',
    distanceKm: 438,
    driverRestHours: 0,
    hubDwellHours: 4.5,
    matchScore: 95,
    matchReasons: {
      pt: [
        '+50 CEP sintético idêntico (20040-002)',
        '+20 Município/UF conferem (Rio de Janeiro/RJ)',
        '+15 Nome do destinatário validado na NF-e',
        '+10 Unidade CDD Baía de Guanabara na mesma zona postal',
      ],
      en: [
        '+50 Exact synthetic postal code match (20040-002)',
        '+20 Destination City/State match (Rio de Janeiro/RJ)',
        '+15 Recipient name verified against NF-e XML',
        '+10 Last-mile CDD hub in target postal zone',
      ],
    },
    items: [
      {
        sku: 'WS-PREC-5680',
        ncm: '8471.30.19',
        desc: { pt: 'Workstation Portátil IA 64GB ECC', en: 'Mobile AI Workstation 64GB ECC' },
        qty: 1,
        valBrl: 14890,
        source: 'NF-e XML',
      },
      {
        sku: 'DK-TB4-240W',
        ncm: '8471.80.00',
        desc: { pt: 'Dock Thunderbolt 4 Corporativo', en: 'Enterprise Thunderbolt 4 Dock' },
        qty: 1,
        valBrl: 1850,
        source: 'NF-e XML',
      },
    ],
    nfeSummary: {
      series: 'NF-e SÉRIE 004 · Nº 000.918.402 (MOCK)',
      issuerCnpjMasked: '**.***.410/0001-**',
      status: '100 - Autorizado o uso da NF-e (mTLS DistDFe)',
      protocol: 'SYNTH-335260091842',
    },
    stops: [
      { name: 'Hortolândia/SP (Origem)', kind: 'origin', x: 70, y: 205, at: 'D-1 · 18:10' },
      { name: 'CTE Cajamar/SP', kind: 'cte', x: 185, y: 175, at: 'D-1 · 22:40' },
      { name: 'CTE Benfica/RJ', kind: 'hub', x: 375, y: 132, at: 'Hoje · 05:55' },
      { name: 'CDD Centro Tecnológico/RJ', kind: 'cdd', x: 470, y: 108, at: 'Hoje · 08:35' },
      { name: 'Hub Destino Corporativo/RJ', kind: 'dest', x: 555, y: 84, at: 'ETA 14:40' },
    ],
    etaRows: [
      { engine: 'OSRM (OpenStreetMap)', durationMin: 38, trafficDelayMin: 0, mode: 'OSRM_BASE' },
      { engine: 'Google Routes (Traffic Optimal)', durationMin: 46, trafficDelayMin: 8, mode: 'LIVE_REGIONAL' },
      { engine: 'HERE Routing v8', durationMin: 44, trafficDelayMin: 6, mode: 'LIVE_REGIONAL' },
      { engine: 'TomTom Traffic Flow', durationMin: 49, trafficDelayMin: 11, mode: 'LIVE_REGIONAL' },
      { engine: 'Mapbox driving-traffic', durationMin: 45, trafficDelayMin: 7, mode: 'LIVE_REGIONAL' },
    ],
    divergenceNote: {
      pt: '0 divergências críticas: 8/8 checkpoints deduplicados entre Correios CWS, 17TRACK e Ship24 (janela Δt ≤ 180s).',
      en: '0 critical divergences: 8/8 checkpoints deduplicated across Correios CWS, 17TRACK, and Ship24 (Δt ≤ 180s window).',
    },
  },
  {
    id: 'shp-2',
    code: 'SSW-NF-449102-RJ',
    sender: 'WEG Automação Industrial (Mock)',
    carrier: 'Transportadora Rodoviária SSW',
    sources: ['SSW DANFE Lookup', 'SEFAZ Resumo NF-e'],
    status: 'IN_TRANSIT',
    progress: 58,
    etaLabel: { pt: 'Amanhã · 09:30 – 11:15 BRT', en: 'Tomorrow · 09:30 – 11:15 BRT' },
    confidenceBand: '88%',
    distanceKm: 1120,
    driverRestHours: 8,
    hubDwellHours: 6,
    matchScore: 85,
    matchReasons: {
      pt: [
        '+35 Hash SHA-256 do documento confere via SSW /rastreamento_danfe',
        '+30 Prefixo de CEP confere (20040-xxx)',
        '+20 Município/UF conferem (Rio de Janeiro/RJ)',
      ],
      en: [
        '+35 Document SHA-256 hash verified via SSW /rastreamento_danfe',
        '+30 Postal sector prefix matches (20040-xxx)',
        '+20 Destination City/State match (Rio de Janeiro/RJ)',
      ],
    },
    items: [
      {
        sku: 'IOT-GW-400',
        ncm: '8517.62.59',
        desc: { pt: 'Gateway Edge Telemetria Modbus/OPC-UA', en: 'Edge Telemetry Gateway Modbus/OPC-UA' },
        qty: 4,
        valBrl: 9600,
        source: 'DANFE SSW',
      },
    ],
    nfeSummary: {
      series: 'NF-e SÉRIE 001 · Nº 000.449.102 (MOCK)',
      issuerCnpjMasked: '**.***.721/0004-**',
      status: 'Rastreio sem código S10 — localizado via Chave NF-e + Hash Destinatário',
      protocol: 'SYNTH-422604491028',
    },
    stops: [
      { name: 'Jaraguá do Sul/SC', kind: 'origin', x: 55, y: 245, at: 'D-2 · 14:00' },
      { name: 'Hub Curitiba/PR', kind: 'hub', x: 165, y: 215, at: 'D-1 · 04:20' },
      { name: 'Terminal Guarulhos/SP (+8h Lei 13.103)', kind: 'cte', x: 310, y: 170, at: 'Hoje · 07:15' },
      { name: 'Filial Duque de Caxias/RJ', kind: 'cdd', x: 465, y: 118, at: 'ETA 21:40' },
      { name: 'Hub Destino Corporativo/RJ', kind: 'dest', x: 555, y: 84, at: 'Amanhã 10:15' },
    ],
    etaRows: [
      { engine: 'OSRM (Long-Haul Corridor)', durationMin: 395, trafficDelayMin: 0, mode: 'OSRM_BASE' },
      { engine: 'Quota Governor (>150 km)', durationMin: 395, trafficDelayMin: 18, mode: 'OSRM_BASE' },
    ],
    divergenceNote: {
      pt: 'Encomenda sem código postal S10: descoberta automaticamente cruzando NF-e com endpoint SSW DANFE. Inclui +8h obrigatórias de descanso (Lei 13.103).',
      en: 'Shipment without postal S10 ID: auto-discovered by matching NF-e summary against SSW DANFE. Includes +8h mandatory rest stop (Law 13.103).',
    },
  },
  {
    id: 'shp-3',
    code: 'MLB992048112BR',
    sender: ' Mouser / Componentes Lab (Mock)',
    carrier: 'Mercado Envios Full + Ship24',
    sources: ['Mercado Livre OAuth', 'Ship24', 'Gmail Readonly'],
    status: 'AT_HUB',
    progress: 74,
    etaLabel: { pt: 'Amanhã · Saída CDD 08:30 BRT', en: 'Tomorrow · CDD Dispatch 08:30 BRT' },
    confidenceBand: '91%',
    distanceKm: 412,
    driverRestHours: 0,
    hubDwellHours: 5,
    matchScore: 58,
    matchReasons: {
      pt: [
        '+38 CEP na mesma sub-região (20040-xxx)',
        '+20 Município/UF conferem (Rio de Janeiro/RJ)',
      ],
      en: [
        '+38 Same postal sub-region (20040-xxx)',
        '+20 Destination City/State match (Rio de Janeiro/RJ)',
      ],
    },
    items: [
      {
        sku: 'RPI5-NVME-KIT',
        ncm: '8471.50.10',
        desc: { pt: 'Nó Servidor Wake-on-LAN & Sensores', en: 'Wake-on-LAN & Sensor Node Kit' },
        qty: 2,
        valBrl: 1640,
        source: 'API Pedido ML',
      },
    ],
    nfeSummary: {
      series: 'NF-e SÉRIE 012 · Nº 001.102.884 (MOCK)',
      issuerCnpjMasked: '**.***.099/0002-**',
      status: 'Aguardando janela de expedição matinal (nextDispatch 08:30)',
      protocol: 'SYNTH-352611028840',
    },
    stops: [
      { name: 'Louveira/SP (Full)', kind: 'origin', x: 115, y: 195, at: 'Ontem · 19:20' },
      { name: 'Hub Resende/RJ', kind: 'hub', x: 315, y: 148, at: 'Hoje · 03:10' },
      { name: 'Last-Mile Hub São Cristóvão/RJ', kind: 'cdd', x: 475, y: 102, at: 'Hoje · 11:05' },
      { name: 'Hub Destino Corporativo/RJ', kind: 'dest', x: 555, y: 84, at: 'Amanhã 09:50' },
    ],
    etaRows: [
      { engine: 'OSRM (OpenStreetMap)', durationMin: 24, trafficDelayMin: 0, mode: 'OSRM_BASE' },
      { engine: 'Google Routes', durationMin: 31, trafficDelayMin: 7, mode: 'LIVE_REGIONAL' },
      { engine: 'HERE Routing v8', durationMin: 29, trafficDelayMin: 5, mode: 'LIVE_REGIONAL' },
    ],
    divergenceNote: {
      pt: 'Ship24 reportou chegada ao hub 14 min antes do webhook do marketplace; eventos fundidos em registro único.',
      en: 'Ship24 reported hub arrival 14 min ahead of marketplace webhook; merged into a single canonical checkpoint.',
    },
  },
  {
    id: 'shp-4',
    code: 'LP006812940CN',
    sender: 'Seeed Studio Shenzhen (Mock)',
    carrier: 'Cainiao → Correios Packet',
    sources: ['17TRACK v2.2', 'Correios CWS'],
    status: 'DELIVERED',
    progress: 100,
    etaLabel: { pt: 'Entregue · Ciclo total 6,4 dias', en: 'Delivered · Total lead time 6.4 days' },
    confidenceBand: '100%',
    distanceKm: 980,
    driverRestHours: 8,
    hubDwellHours: 12,
    matchScore: 92,
    matchReasons: {
      pt: [
        '+50 CEP sintético confirmado',
        '+20 Cidade/UF Rio de Janeiro/RJ',
        '+22 Comprovante eletrônico sincronizado',
      ],
      en: [
        '+50 Synthetic postal code confirmed',
        '+20 City/State Rio de Janeiro/RJ',
        '+22 Electronic delivery receipt synced',
      ],
    },
    items: [
      {
        sku: 'RE-MIC-ARRAY',
        ncm: '8518.10.90',
        desc: { pt: 'Matriz de Microfones Far-Field Voice DSP', en: 'Far-Field DSP Microphone Array' },
        qty: 1,
        valBrl: 790,
        source: 'Declaração Aduaneira Mock',
      },
    ],
    nfeSummary: {
      series: 'DIR REMESSA EXPRESSA · MOCK-8821',
      issuerCnpjMasked: 'INTL-PARTNER-PRC',
      status: 'Desembaraço concluído sem tributação pendente · Entregue',
      protocol: 'SYNTH-PRC-99812',
    },
    stops: [
      { name: 'Curitiba/PR (CEINT)', kind: 'origin', x: 140, y: 235, at: 'D-4 · 09:00' },
      { name: 'CTE Indaiatuba/SP', kind: 'cte', x: 265, y: 185, at: 'D-2 · 16:40' },
      { name: 'CTE Benfica/RJ', kind: 'hub', x: 405, y: 128, at: 'Ontem · 07:30' },
      { name: 'Hub Destino Corporativo/RJ', kind: 'dest', x: 555, y: 84, at: 'Ontem · 15:12' },
    ],
    etaRows: [{ engine: 'Histórico Real Consolidado', durationMin: 0, trafficDelayMin: 0, mode: 'OSRM_BASE' }],
    divergenceNote: {
      pt: 'Tradução automática de códigos internacionais Cainiao + Correios S10 sem duplicidade.',
      en: 'Seamless cross-mapping between Cainiao international legs and domestic S10 checkpoints.',
    },
  },
];

type DetailTab = 'overview' | 'route' | 'items' | 'eta' | 'match' | 'sources';

export const DeliveryTrackerSandbox: React.FC<{ lang: Lang }> = ({ lang }) => {
  const [shipments, setShipments] = useState<SyntheticShipment[]>(INITIAL_SHIPMENTS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SHIPMENTS[0].id);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [timeMachine, setTimeMachine] = useState<number>(100); // % of current state
  const [playing, setPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(30);
  const [activeTab, setActiveTab] = useState<DetailTab>('eta');
  const [newCodeInput, setNewCodeInput] = useState('');

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTimeMachine((prev) => (prev >= 100 ? 10 : Math.min(100, prev + Math.max(2, Math.round(speed / 12)))));
    }, 350);
    return () => window.clearInterval(id);
  }, [playing, speed]);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.code.toLowerCase().includes(q) ||
        s.sender.toLowerCase().includes(q) ||
        s.carrier.toLowerCase().includes(q) ||
        s.items.some((it) => it.desc[lang].toLowerCase().includes(q));
      return matchStatus && matchQuery;
    });
  }, [shipments, statusFilter, query, lang]);

  const selected = useMemo(
    () => shipments.find((s) => s.id === selectedId) || shipments[0],
    [shipments, selectedId]
  );

  const effectiveProgress = Math.round((selected.progress * timeMachine) / 100);

  const handleInjectSynthetic = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = newCodeInput.trim().toUpperCase() || `AP${Math.floor(100000000 + Math.random() * 899999999)}BR`;
    const added: SyntheticShipment = {
      id: `shp-${Date.now()}`,
      code: raw,
      sender: lang === 'pt' ? 'Fornecedor Homologado PD&I (Simulado)' : 'Approved R&D Vendor (Simulated)',
      carrier: raw.startsWith('NF') ? 'SSW DANFE Resolver' : '17TRACK + Ship24 Multi-Aggregator',
      sources: ['17TRACK v2.2', 'Ship24', 'OSRM Live'],
      status: 'IN_TRANSIT',
      progress: 64,
      etaLabel: { pt: 'Hoje · +2h 15min (Fusão 4 APIs)', en: 'Today · +2h 15m (4-API Fusion)' },
      confidenceBand: '90%',
      distanceKm: 92,
      driverRestHours: 0,
      hubDwellHours: 3,
      matchScore: 78,
      matchReasons: {
        pt: ['+50 CEP sintético validado', '+28 Tokenização de endereço + Hash destinatário'],
        en: ['+50 Synthetic postal code validated', '+28 Street tokenization + Recipient hash'],
      },
      items: [
        {
          sku: 'SIM-901',
          ncm: '9031.80.99',
          desc: { pt: 'Módulo de Instrumentação Laboratorial (Mock)', en: 'Lab Instrumentation Module (Mock)' },
          qty: 1,
          valBrl: 4200,
          source: 'Ingestão Manual / NF-e',
        },
      ],
      nfeSummary: {
        series: 'NF-e SÉRIE 002 · SIMULAÇÃO',
        issuerCnpjMasked: '**.***.550/0001-**',
        status: 'Validado em sandbox local (0 chamadas externas)',
        protocol: 'SYNTH-LOCAL-TEST',
      },
      stops: [
        { name: ' Polo Industrial Resende/RJ', kind: 'origin', x: 180, y: 185, at: 'Hoje · 07:30' },
        { name: 'CTE Baixada/RJ', kind: 'cte', x: 385, y: 128, at: 'Hoje · 11:10' },
        { name: 'Hub Destino Corporativo/RJ', kind: 'dest', x: 555, y: 84, at: 'ETA +2h15' },
      ],
      etaRows: [
        { engine: 'OSRM (OpenStreetMap)', durationMin: 118, trafficDelayMin: 0, mode: 'OSRM_BASE' },
        { engine: 'Google Routes', durationMin: 135, trafficDelayMin: 17, mode: 'LIVE_REGIONAL' },
        { engine: 'TomTom Routing', durationMin: 139, trafficDelayMin: 21, mode: 'LIVE_REGIONAL' },
      ],
      divergenceNote: {
        pt: 'Registro recém-adicionado no sandbox interativo com deduplicação instantânea.',
        en: 'Newly injected sandbox shipment with instant multi-provider deduplication.',
      },
    };
    setShipments((prev) => [added, ...prev]);
    setSelectedId(added.id);
    setNewCodeInput('');
    setTimeMachine(100);
  };

  // Interpolate vehicle coordinates along stops
  const vehiclePos = useMemo(() => {
    const pts = selected.stops;
    if (pts.length < 2) return { x: pts[0].x, y: pts[0].y };
    const ratio = Math.max(0, Math.min(1, effectiveProgress / 100));
    const totalSegs = pts.length - 1;
    const exact = ratio * totalSegs;
    const idx = Math.min(totalSegs - 1, Math.floor(exact));
    const localT = exact - idx;
    return {
      x: pts[idx].x + (pts[idx + 1].x - pts[idx].x) * localT,
      y: pts[idx].y + (pts[idx + 1].y - pts[idx].y) * localT,
    };
  }, [selected, effectiveProgress]);

  const matchBadge =
    selected.matchScore >= 70
      ? { label: lang === 'pt' ? 'Confirmada' : 'Confirmed', color: 'var(--status-ok)' }
      : selected.matchScore >= 40
      ? { label: lang === 'pt' ? 'Provável' : 'Probable', color: 'var(--status-warn)' }
      : { label: lang === 'pt' ? 'Fraca' : 'Weak', color: 'var(--status-crit)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface-1)',
          padding: '12px 14px',
          borderRadius: 8,
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 240px' }}>
          <Search size={15} color="var(--text-secondary)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'pt'
                ? 'Filtrar código S10, NF-e, fornecedor ou item...'
                : 'Filter S10 code, NF-e, supplier, or item...'
            }
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              width: '100%',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', pt: 'Todas', en: 'All' },
            { id: 'OUT_FOR_DELIVERY', pt: 'Saiu p/ Entrega', en: 'Out for Delivery' },
            { id: 'IN_TRANSIT', pt: 'Em Trânsito', en: 'In Transit' },
            { id: 'AT_HUB', pt: 'Em Unidade', en: 'At Hub' },
            { id: 'DELIVERED', pt: 'Entregues', en: 'Delivered' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className="seg-btn"
              style={{
                border: '1px solid var(--border-subtle)',
                background: statusFilter === f.id ? 'var(--accent)' : 'var(--surface-2)',
                color: statusFilter === f.id ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {f[lang]}
            </button>
          ))}
        </div>

        <form onSubmit={handleInjectSynthetic} style={{ display: 'flex', gap: 6 }}>
          <input
            value={newCodeInput}
            onChange={(e) => setNewCodeInput(e.target.value)}
            placeholder={lang === 'pt' ? 'Simular código ou NF-e...' : 'Simulate tracking or NF-e...'}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              padding: '5px 10px',
              color: 'var(--text-primary)',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-mono)',
              width: 175,
            }}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={14} /> {lang === 'pt' ? 'Testar Ingestão' : 'Inject'}
          </button>
        </form>
      </div>

      {/* Main Split: Shipment List + Live Route Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* Left List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((s) => {
            const isSel = s.id === selected.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedId(s.id);
                  setTimeMachine(100);
                }}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: isSel ? 'var(--surface-2)' : 'var(--surface-1)',
                  border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                    {s.code}
                  </span>
                  <span className="micro-pill accent">{s.progress}%</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.sender}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {s.carrier} · <strong style={{ color: 'var(--text-body)' }}>{s.etaLabel[lang]}</strong>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                  {s.sources.map((src) => (
                    <span key={src} className="micro-pill" style={{ fontSize: '0.64rem', padding: '1px 6px' }}>
                      {src}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Stage: SVG Live Corridor + Time Machine */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.69rem', color: 'var(--accent)' }}>
                SSE STREAM · CORREDOR RODOVIÁRIO OSRM + TRÁFEGO REGIONAL
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {selected.code} — {selected.etaLabel[lang]}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: 4,
                  border: `1px solid ${matchBadge.color}`,
                  color: matchBadge.color,
                }}
              >
                Match: {selected.matchScore}/100 ({matchBadge.label})
              </span>
            </div>
          </div>

          {/* Interactive SVG Map */}
          <div
            style={{
              background: '#080a0f',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <svg viewBox="0 0 620 275" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <defs>
                <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="620" height="275" fill="url(#mapGrid)" />
              {/* Coastline silhouette */}
              <path
                d="M 0 265 Q 190 245 340 190 T 620 115 L 620 275 L 0 275 Z"
                fill="rgba(56, 189, 248, 0.04)"
                stroke="rgba(56, 189, 248, 0.12)"
              />

              {/* Full Planned Route Dashed */}
              <polyline
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                points={selected.stops.map((st) => `${st.x},${st.y}`).join(' ')}
              />

              {/* Completed Route Solid Accent */}
              <polyline
                fill="none"
                stroke="#FE1301"
                strokeWidth="3.2"
                points={[
                  ...selected.stops
                    .filter((_, idx) => (idx / (selected.stops.length - 1)) * 100 <= effectiveProgress)
                    .map((st) => `${st.x},${st.y}`),
                  `${vehiclePos.x},${vehiclePos.y}`,
                ].join(' ')}
              />

              {/* Stops */}
              {selected.stops.map((st, idx) => {
                const reached = (idx / (selected.stops.length - 1)) * 100 <= effectiveProgress;
                return (
                  <g key={st.name}>
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={st.kind === 'dest' ? 7 : 5}
                      fill={reached ? '#FE1301' : '#181a22'}
                      stroke="#f8f8f8"
                      strokeWidth="1.6"
                    />
                    <text
                      x={st.x}
                      y={st.y - 11}
                      fill="#e4e4e4"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor={idx === 0 ? 'start' : idx === selected.stops.length - 1 ? 'end' : 'middle'}
                    >
                      {st.name}
                    </text>
                    <text
                      x={st.x}
                      y={st.y + 16}
                      fill="#9fa0ab"
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor={idx === 0 ? 'start' : idx === selected.stops.length - 1 ? 'end' : 'middle'}
                    >
                      {st.at}
                    </text>
                  </g>
                );
              })}

              {/* Animated Vehicle Marker */}
              <g transform={`translate(${vehiclePos.x}, ${vehiclePos.y})`}>
                <circle r="13" fill="rgba(254, 19, 1, 0.22)" />
                <circle r="6.5" fill="#FE1301" stroke="#ffffff" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Time Machine Replay Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--surface-2)',
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="icon-toggle"
              aria-label="Play trajectory replay"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              <span>{lang === 'pt' ? 'Máquina do Tempo' : 'Time Machine'}</span>
            </button>
            <input
              type="range"
              min={5}
              max={100}
              value={timeMachine}
              onChange={(e) => setTimeMachine(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#FE1301' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', minWidth: 46, textAlign: 'right' }}>
              {effectiveProgress}%
            </span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{
                background: 'var(--surface-1)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 4,
                padding: '3px 6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
              }}
            >
              <option value={10}>10×</option>
              <option value={30}>30×</option>
              <option value={60}>60×</option>
            </select>
          </div>
        </div>
      </div>

      {/* Real 6-Tab Technical Inspection Drawer */}
      <div
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, marginBottom: 14 }}>
          {(
            [
              { id: 'eta', icon: Clock, pt: '1. Fusão de ETA (5 APIs)', en: '1. Multi-API ETA Fusion' },
              { id: 'match', icon: ShieldCheck, pt: '2. Score Destinatário (match.js)', en: '2. Recipient Match (match.js)' },
              { id: 'items', icon: Layers, pt: '3. Conteúdo Declarado (NF-e)', en: '3. Declared Items (NF-e)' },
              { id: 'route', icon: MapPin, pt: '4. Checkpoints Deduplicados', en: '4. Deduplicated Checkpoints' },
              { id: 'overview', icon: FileText, pt: '5. Documento Fiscal (mTLS)', en: '5. Tax Document (mTLS)' },
              { id: 'sources', icon: Truck, pt: '6. Auditoria Multi-Fonte', en: '6. Multi-Source Audit' },
            ] as const
          ).map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.id}
                onClick={() => setActiveTab(tb.id)}
                className="seg-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: activeTab === tb.id ? 'var(--accent)' : 'var(--surface-2)',
                  color: activeTab === tb.id ? '#fff' : 'var(--text-secondary)',
                }}
              >
                <Icon size={13} /> {tb[lang]}
              </button>
            );
          })}
        </div>

        {activeTab === 'eta' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div>
              <div style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: 8 }}>
                {lang === 'pt'
                  ? 'QUADRO COMPARATIVO POR MOTOR RODOVIÁRIO'
                  : 'ROAD ROUTING ENGINE COMPARISON MATRIX'}
              </div>
              {selected.etaRows.map((r) => (
                <div
                  key={r.engine}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '7px 10px',
                    background: 'var(--surface-2)',
                    borderRadius: 4,
                    marginBottom: 6,
                    fontSize: '0.8rem',
                  }}
                >
                  <span>{r.engine}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>
                    {r.durationMin} min {r.trafficDelayMin > 0 ? `(+${r.trafficDelayMin}m tráfego)` : ''}
                  </strong>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface-2)', padding: 14, borderRadius: 6, borderLeft: '3px solid var(--accent)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', marginBottom: 6 }}>
                REGRAS LOGÍSTICAS APLICADAS (server/routing/fusion.js)
              </div>
              <p style={{ margin: '0 0 8px', fontSize: '0.82rem' }}>
                {lang === 'pt'
                  ? `Distância total: ${selected.distanceKm} km · Permanência observada em hubs (dwellSec): ${selected.hubDwellHours}h · Descanso legal Lei 13.103: +${selected.driverRestHours}h · Confiança estatística: ${selected.confidenceBand}.`
                  : `Total distance: ${selected.distanceKm} km · Observed hub dwell (dwellSec): ${selected.hubDwellHours}h · Driver Rest Law 13.103: +${selected.driverRestHours}h · Confidence band: ${selected.confidenceBand}.`}
              </p>
              <span className="micro-pill">Weighted Median + Quota Governor ≤ 150km</span>
            </div>
          </div>
        )}

        {activeTab === 'match' && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              {lang === 'pt'
                ? `Pontuação Aditiva de Destinatário: ${selected.matchScore} / 100 (${matchBadge.label})`
                : `Additive Recipient Confidence Score: ${selected.matchScore} / 100 (${matchBadge.label})`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {selected.matchReasons[lang].map((reason) => (
                <div
                  key={reason}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 10px',
                    background: 'var(--surface-2)',
                    borderRadius: 4,
                    fontSize: '0.81rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <CheckCircle2 size={14} color="var(--status-ok)" /> {reason}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selected.items.map((it) => (
              <div
                key={it.sku}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '9px 12px',
                  background: 'var(--surface-2)',
                  borderRadius: 6,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{it.desc[lang]}</strong>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    SKU: {it.sku} · NCM: {it.ncm} · Origem: {it.source}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.84rem' }}>
                  {it.qty} un · R$ {it.valBrl.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'route' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
            {selected.stops.map((st, idx) => (
              <div key={st.name} style={{ padding: 10, background: 'var(--surface-2)', borderRadius: 6 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)' }}>
                  ETAPA 0{idx + 1} · {st.kind.toUpperCase()}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{st.name}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{st.at}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'overview' && (
          <div style={{ background: 'var(--surface-2)', padding: 14, borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            <div>DOC: {selected.nfeSummary.series}</div>
            <div>CNPJ EMITENTE (MASCARADO): {selected.nfeSummary.issuerCnpjMasked}</div>
            <div>PROTOCOLO: {selected.nfeSummary.protocol}</div>
            <div style={{ color: 'var(--status-ok)', marginTop: 6 }}>STATUS: {selected.nfeSummary.status}</div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--surface-2)', padding: 14, borderRadius: 6 }}>
            <AlertTriangle size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.83rem' }}>
              <strong>{lang === 'pt' ? 'Relatório de Reconciliação Multi-Provedor:' : 'Multi-Provider Reconciliation Report:'}</strong>{' '}
              {selected.divergenceNote[lang]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
