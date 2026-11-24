export type Lang = 'pt' | 'en';

export interface MetricItem {
  value: string;
  accentSuffix?: string;
  label: Record<Lang, string>;
}

export interface PillarItem {
  id: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export interface ArchLayer {
  layer: string;
  detail: Record<Lang, string>;
}

export interface ProjectShowcaseMeta {
  id: 'tracker' | 'sase' | 'jarvis' | 'pulseclean';
  index: string;
  name: Record<Lang, string>;
  shortSub: Record<Lang, string>;
  category: Record<Lang, string>;
  problem: Record<Lang, string>;
  solution: Record<Lang, string>;
  impactMetrics: { value: string; label: Record<Lang, string> }[];
  stack: string[];
  securityHighlights: Record<Lang, string>[];
  architecture: ArchLayer[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: Record<Lang, string>;
  period: Record<Lang, string>;
  location: string;
  category: 'leadership' | 'finance_data' | 'foundation';
  featured?: boolean;
  highlights: Record<Lang, string[]>;
  tags: string[];
}

export interface EducationItem {
  institution: string;
  degree: Record<Lang, string>;
  period: Record<Lang, string>;
  status: Record<Lang, string>;
}

export interface CertificationGroup {
  category: Record<Lang, string>;
  items: {
    title: string;
    issuer: string;
    badge?: string;
  }[];
}

export const UI_TEXT = {
  nav: {
    about: { pt: 'Sobre', en: 'Profile' },
    showcases: { pt: 'Vitrines ao Vivo', en: 'Live Showcases' },
    experience: { pt: 'Trajetória', en: 'Experience' },
    credentials: { pt: 'Credenciais & Stack', en: 'Credentials & Stack' },
    contact: { pt: 'Contato', en: 'Contact' },
    printCv: { pt: 'Currículo / PDF', en: 'Executive CV / PDF' },
  },
  hero: {
    eyebrow: {
      pt: 'RIO DE JANEIRO, BR · ATUAÇÃO NACIONAL & GLOBAL · PORTFÓLIO EXECUTIVO',
      en: 'RIO DE JANEIRO, BR · BRAZIL & GLOBAL · EXECUTIVE ENGINEERING PORTFOLIO',
    },
    titleLead: {
      pt: 'Governança de Dados,',
      en: 'Data Governance,',
    },
    titleItalic: {
      pt: 'IA Agêntica',
      en: 'Agentic AI',
    },
    titleTail: {
      pt: '& Finanças Estratégicas em Escala.',
      en: '& Strategic Finance at Scale.',
    },
    headlineBar: {
      pt: 'Head of Data Governance & Agentic AI PMO | Strategic FP&A | FinOps, Data Engineering & Automation | CSSYB™ | Google Certified PM | Harvard Aspire Leader',
      en: 'Head of Data Governance & Agentic AI PMO | Strategic FP&A | FinOps, Data Engineering & Automation | CSSYB™ | Google Certified PM | Harvard Aspire Leader',
    },
    lead: {
      pt: 'Executivo com 10+ anos unificando Engenharia de Dados, Sistemas Multi-Agentes e Controladoria/FP&A em ecossistemas altamente regulados (Firjan SENAI, Fiocruz/FIOTEC, Vibra/Petrobras e Eletrobras Furnas). Responsável pela conformidade, inteligência analítica e automação em carteiras de PD&I superiores a R$ 55M diretos sob budget controlado de R$ 500M+.',
      en: 'Executive with 10+ years uniting Data Engineering, Multi-Agent AI Systems, and Corporate FP&A across highly regulated ecosystems (Firjan SENAI, Fiocruz/FIOTEC, Vibra/Petrobras, and Eletrobras Furnas). Leading data intelligence, regulatory compliance, and automation across R$ 55M+ direct R&D portfolios within R$ 500M+ controlled budgets.',
    },
    ctaPrimary: {
      pt: 'Testar 4 Sistemas ao Vivo',
      en: 'Launch 4 Live Systems',
    },
    ctaResume: {
      pt: 'Visualizar / Imprimir CV Executivo',
      en: 'View / Print Executive CV',
    },
    figLabel: {
      pt: 'FIG. 00 — PERFIL EXECUTIVO VERIFICADO',
      en: 'FIG. 00 — VERIFIED EXECUTIVE PROFILE',
    },
    execCardTitle: {
      pt: 'ATUAÇÃO ATUAL & GOVERNANÇA INSTITUCIONAL',
      en: 'CURRENT MANDATE & INSTITUTIONAL GOVERNANCE',
    },
    execCardBody: {
      pt: 'Head de Governança de Dados & IA no PMO-GPD (Firjan SENAI SESI) · Membro Especialista Comitês ABNT (ISO/IEC 42001 IA) · Pesquisador Cátedra Auditoria Social UFF.',
      en: 'Head of Data Governance & AI at PMO-GPD (Firjan SENAI SESI) · Specialist Member at ABNT AI Standards Committees (ISO/IEC 42001) · Social Audit Researcher at UFF.',
    },
  },
  sections: {
    s01Index: { pt: '01 / SOBRE & POSICIONAMENTO EXECUTIVO', en: '01 / EXECUTIVE PROFILE & THESIS' },
    s01Title: { pt: 'Rigor Contábil-Financeiro encontra Engenharia Agêntica', en: 'Financial Rigor Meets Agentic Software Engineering' },
    s01Sub: {
      pt: ' Arquitetura orientada a evidências para ambientes críticos, auditoria contínua e tomada de decisão C-Level.',
      en: 'Evidence-driven architecture built for mission-critical compliance, continuous auditing, and C-Level decision-making.',
    },
    s02Index: { pt: '02 / VITRINES INTERATIVAS DE ENGENHARIA', en: '02 / INTERACTIVE ENGINEERING SHOWCASES' },
    s02Title: { pt: 'Sistemas Reais em Execução no Navegador', en: 'Live Interactive Systems Running In-Browser' },
    s02Sub: {
      pt: 'Inspecione a arquitetura e opere sandboxes fiéis aos 4 projetos autorais — 100% sanitizados sob protocolo Zero-Leak.',
      en: 'Inspect the architecture and operate live sandboxes faithful to 4 original builds — 100% sanitized under Zero-Leak DevSecOps.',
    },
    s03Index: { pt: '03 / EXPERIÊNCIA & TRAJETÓRIA EXECUTIVA', en: '03 / CAREER TIMELINE & TRACK RECORD' },
    s03Title: { pt: '10+ Anos em Ambientes Regulados de Alta Complexidade', en: '10+ Years Across High-Stakes Regulated Ecosystems' },
    s03Sub: {
      pt: 'Progressão consistente conectando Controladoria, SAP ERP, Governança de Portfólio de PD&I e Engenharia de IA.',
      en: 'Consistent progression bridging Corporate Controlling, SAP ERP, R&D Portfolio Governance, and AI Engineering.',
    },
    s04Index: { pt: '04 / FORMAÇÃO, CERTIFICAÇÕES & STACK', en: '04 / EDUCATION, CERTIFICATIONS & TECH MATRIX' },
    s04Title: { pt: 'Fundação Multidisciplinar & Credenciais Globais', en: 'Multidisciplinary Foundation & Global Credentials' },
    s04Sub: {
      pt: 'Dupla graduação (Administração UERJ & Contábeis UFF), 2 MBAs executivos, normas ISO/ABNT e stack full-lifecycle.',
      en: 'Dual bachelor background (Business UERJ & Accounting UFF), 2 Executive MBAs, ISO/ABNT standards, and full-lifecycle stack.',
    },
    s05Index: { pt: '05 / CONTATO DIRETO PARA HEADHUNTERS', en: '05 / EXECUTIVE & HEADHUNTER CONTACT' },
    s05Title: { pt: 'Pronto para Desafios Executivos no Brasil e Exterior', en: 'Open to Executive & Staff Mandates Globally' },
    s05Sub: {
      pt: 'Disponível para posições de Head / Gerência Sênior / Especialista Principal em Governança de Dados, IA Agêntica, PMO Estratégico e FP&A.',
      en: 'Available for Head, Senior Manager, and Principal roles in Data Governance, Agentic AI, Strategic PMO, and FP&A.',
    },
  },
};

export const HERO_METRICS: MetricItem[] = [
  {
    value: '10',
    accentSuffix: '+ yrs',
    label: {
      pt: 'Experiência em PMO, FP&A, Governança & Dados',
      en: 'Track Record in PMO, FP&A, Governance & Data',
    },
  },
  {
    value: 'R$ 500M',
    accentSuffix: '+',
    label: {
      pt: 'Budget em governança (R$ 55M+ carteira direta PD&I)',
      en: 'Controlled budget (R$ 55M+ direct R&D portfolio)',
    },
  },
  {
    value: '-85',
    accentSuffix: '%',
    label: {
      pt: 'Redução de ciclo com 16 motores de automação & IA',
      en: 'Cycle-time reduction via 16 automation & AI engines',
    },
  },
  {
    value: '140',
    accentSuffix: '+',
    label: {
      pt: 'Projetos complexos multifomento sob conformidade',
      en: 'Complex multifunded R&D projects under compliance',
    },
  },
];

export const EXECUTIVE_PILLARS: PillarItem[] = [
  {
    id: '01',
    title: {
      pt: 'IA Agêntica & Engenharia de Software',
      en: 'Agentic AI & Systems Engineering',
    },
    desc: {
      pt: 'Concepção de ecossistemas multi-agentes autônomos (Robô Nexo com 8 agentes, Agente JARVIS com roteador Jev e Harness²), RAG híbrido local-first e plataformas full-stack TypeScript/Python.',
      en: 'Design of autonomous multi-agent ecosystems (8-agent Nexo Robot, JARVIS Agent with Jev router & Harness²), local-first hybrid RAG, and full-stack TypeScript/Python platforms.',
    },
  },
  {
    id: '02',
    title: {
      pt: 'Governança de Dados & Compliance Regulatório',
      en: 'Data Governance & Regulatory Compliance',
    },
    desc: {
      pt: 'Autor da Política (POL-GPD-001) e do Plano Estratégico de Dados (PEI-GPD-001) para 5 Institutos SENAI de Inovação, alinhados à LGPD, TCU, CGU e ISO/IEC 42001, 27000, 27701 e 56001.',
      en: 'Author of the Corporate Data Governance Policy (POL-GPD-001) and Strategic Data Plan (PEI-GPD-001) across 5 SENAI Innovation Institutes, aligned with LGPD, audit courts, and ISO/IEC 42001.',
    },
  },
  {
    id: '03',
    title: {
      pt: 'PMO de PD&I Multifomento & Simulação',
      en: 'Multifunded R&D PMO & Risk Simulation',
    },
    desc: {
      pt: 'Gestão executiva end-to-end (EMBRAPII, FINEP, BNDES, ANP, Rota 2030), estruturação da plataforma DATA4PMO e SGP v3.0 com simulações de Monte Carlo, avaliação TRL e gestão de intangíveis.',
      en: 'End-to-end executive governance (EMBRAPII, FINEP, BNDES, ANP, Rota 2030), architecting DATA4PMO and SGP v3.0 with Monte Carlo forecasting, TRL maturity, and intangible asset tracking.',
    },
  },
  {
    id: '04',
    title: {
      pt: 'Strategic FP&A, FinOps & SAP ERP',
      en: 'Strategic FP&A, FinOps & SAP ERP',
    },
    desc: {
      pt: 'Domínio profundo de P&L, Budget vs. Actual, Rolling Forecast, Valuation (TAM/SAM/SOM), conciliação contábil-financeira determinística e operação avançada em SAP ERP (PS, FI, CO, MM).',
      en: 'Deep command of P&L, Budget vs. Actual, Rolling Forecast, Valuation (TAM/SAM/SOM), deterministic accounting reconciliation, and SAP ERP (PS, FI, CO, MM) operations.',
    },
  },
];

export const HEADHUNTER_BRIEF = {
  targetRoles: {
    pt: 'Head de Dados & IA · Head/Gerente de PMO · Principal Business/Data Architect · FP&A & FinOps Lead',
    en: 'Head of Data & AI · Head of PMO · Principal Business/Data Architect · Strategic FP&A & FinOps Lead',
  },
  sectors: {
    pt: 'Tecnologia, Energia, Indústria 4.0, Serviços Financeiros, Saúde/Bio & Consultoria Executiva',
    en: 'Tech, Energy, Industry 4.0, Financial Services, Biotech/Health & Executive Advisory',
  },
  languages: {
    pt: 'Português (Nativo) · Inglês (C1 Advanced — EF SET 67/100) · Espanhol (Profissional)',
    en: 'Portuguese (Native) · English (C1 Advanced — EF SET 67/100) · Spanish (Professional Working)',
  },
  standards: {
    pt: 'Membro Comitês ABNT (IA ISO/IEC 42001, 23894, 38507) · Artigo Homologado Enap/IBICT (BBSIA)',
    en: 'ABNT Standards Committee Member (ISO/IEC 42001, 23894, 38507) · Published Author (Enap/IBICT BBSIA)',
  },
  availability: {
    pt: 'Rio de Janeiro / São Paulo / Híbrido / Remoto Internacional',
    en: 'Rio de Janeiro / São Paulo / Hybrid / Global Remote',
  },
};

export const PROJECTS_META: ProjectShowcaseMeta[] = [
  {
    id: 'tracker',
    index: '02.1',
    name: {
      pt: 'Rastreador de Entregas Integrado',
      en: 'Integrated Multi-Carrier Delivery Tracker',
    },
    shortSub: {
      pt: 'Central SSE em tempo real · Fusão de ETA viário · Score de destinatário',
      en: 'Real-time SSE hub · Multi-API road ETA fusion · Recipient match engine',
    },
    category: {
      pt: 'LOGISTICS DATA FUSION & REAL-TIME TELEMETRY',
      en: 'LOGISTICS DATA FUSION & REAL-TIME TELEMETRY',
    },
    problem: {
      pt: 'O rastreamento logístico no Brasil sofre com severa fragmentação: transportadoras privadas (SSW), Correios (API CWS autenticada), marketplaces e agregadores globais operam em silos, frequentemente sem expor código de rastreio antes da emissão de NF-e/DANFE.',
      en: 'Logistics visibility in Brazil is heavily fragmented: private carriers (SSW), Correios (authenticated CWS), marketplaces, and global aggregators operate in silos, often lacking tracking IDs until electronic invoices (NF-e/DANFE) are parsed.',
    },
    solution: {
      pt: 'Central local-first em Node.js 24 (zero dependências de servidor, streaming via Server-Sent Events) que deduplica eventos multi-provedor sobre mapa viário ao vivo, funde 5 motores de tráfego rodoviário com regras da Lei do Motorista (13.103) e calcula aderência determinística ao destinatário.',
      en: 'Zero-dependency Node.js 24 local-first hub streaming live updates via Server-Sent Events (SSE), deduplicating multi-carrier checkpoints onto a live road map, fusing 5 traffic routing engines with driver rest-law rules, and scoring recipient identity confidence.',
    },
    impactMetrics: [
      { value: '15', label: { pt: 'APIs & parsers mapeados', en: 'Mapped APIs & parsers' } },
      { value: '5x', label: { pt: 'Motores de ETA fundidos', en: 'Fused road ETA engines' } },
      { value: '40/40', label: { pt: 'Testes offline passando', en: 'Offline unit tests passing' } },
    ],
    stack: [
      'Node.js 24 (Native HTTP + SSE)',
      'ES Modules',
      'Leaflet + OSRM Geometry',
      '17TRACK + Ship24 + Correios CWS',
      'NF-e XML / SEFAZ DistDFe Parser',
      'Gmail OAuth Readonly Scanner',
    ],
    securityHighlights: [
      {
        pt: 'Bind estrito em 127.0.0.1 com hash SHA-256 local de documento para conferência sem expor CPF em trânsito aberto',
        en: 'Strict 127.0.0.1 loopback bind with local SHA-256 document hashing for recipient matching without exposing raw IDs',
      },
      {
        pt: 'Governador de cotas para APIs pagas de rota (aciona tráfego ao vivo apenas em trechos regionais ≤ 150 km)',
        en: 'Quota governor for commercial traffic APIs (triggers live traffic queries exclusively on regional legs ≤ 150 km)',
      },
    ],
    architecture: [
      {
        layer: 'INGESTION & DEDUPLICATION',
        detail: {
          pt: '17TRACK v2.2 · Ship24 · Correios SRO/CWS · Mercado Livre · SSW DANFE · NF-e XML + Gmail OAuth',
          en: '17TRACK v2.2 · Ship24 · Correios SRO/CWS · Mercado Livre · SSW DANFE · NF-e XML + Gmail OAuth',
        },
      },
      {
        layer: 'ETA FUSION ENGINE (fusion.js)',
        detail: {
          pt: 'Mediana ponderada (OSRM + Google + HERE + TomTom + Mapbox) + Dwell em Hubs + Lei 13.103 (8h descanso / 9h direção)',
          en: 'Weighted median (OSRM + Google + HERE + TomTom + Mapbox) + Observed Hub Dwell + Driver Rest Law (8h/9h)',
        },
      },
      {
        layer: 'RECIPIENT ADHERENCE (match.js)',
        detail: {
          pt: 'Score aditivo (-100 a +100): CEP/Setor + Município/UF + Tokenização de Logradouro + Hash SHA-256',
          en: 'Additive confidence (-100 to +100): Postal Sector + City/State + Street Tokenization + SHA-256 Hash',
        },
      },
      {
        layer: 'LIVE UI & TIME MACHINE',
        detail: {
          pt: 'Streaming SSE + Replay temporal contínuo + Inspeção profunda em 6 abas técnicas',
          en: 'SSE real-time push + Continuous Time-Machine replay + 6-tab deep inspection drawer',
        },
      },
    ],
  },
  {
    id: 'sase',
    index: '02.2',
    name: {
      pt: 'SASE — Auditoria Social Empresarial',
      en: 'SASE — Corporate Social Audit Platform',
    },
    shortSub: {
      pt: 'Data-Intelligence ESG soberano · 50 S.A. em 20 setores · Score D1–D6 + IA',
      en: 'Sovereign ESG Data-Intelligence · 50 Public Corps · D1–D6 Score + AI',
    },
    category: {
      pt: 'PUBLIC-INTEREST DATA INTELLIGENCE & REGULATORY AI (UFF)',
      en: 'PUBLIC-INTEREST DATA INTELLIGENCE & REGULATORY AI (UFF)',
    },
    problem: {
      pt: 'Ratings ESG internacionais custam dezenas de milhares de dólares, são anuais e opacos, enquanto dados primários brasileiros sobre sanções, embargos ambientais, passivos trabalhistas e offshores ficam fragmentados em mais de 20 órgãos governamentais.',
      en: 'International ESG ratings are costly, annual, and opaque, while primary Brazilian records on federal sanctions, environmental embargoes, labor liabilities, and offshore structures remain scattered across 20+ government portals.',
    },
    solution: {
      pt: 'Plataforma desenvolvida na Cátedra de Auditoria Social da UFF cobrindo 50 companhias abertas da B3 em 20 setores. Cruza 30 rotas de API e calcula um Score Único de Auditoria Social (0–100) em 6 dimensões legais (D1–D6), com grafo societário WebGL e pareceres fundamentados por IA.',
      en: 'Platform built at UFF’s Social Audit Chair covering 50 B3-listed corporations across 20 sectors. Integrates 30 API routes to compute a Single-Source-of-Truth Social Audit Score (0–100) across 6 legal dimensions (D1–D6), with WebGL corporate graphs and AI-grounded audit opinions.',
    },
    impactMetrics: [
      { value: '50', label: { pt: 'Companhias B3 em 20 setores', en: 'Public corps across 20 sectors' } },
      { value: '30', label: { pt: 'Rotas de API governamentais/mercado', en: 'Gov & market API routes' } },
      { value: 'D1–D6', label: { pt: ' Metodologia legal auditável', en: 'Auditable legal score dimensions' } },
    ],
    stack: [
      'Next.js 16.2 (Turbopack)',
      'React 19 + TypeScript',
      'Force-Graph WebGL',
      'Supabase (PostgreSQL + RLS)',
      'Python 3 ETL Collectors',
      'Gemini 2.0 + Claude Sonnet',
    ],
    securityHighlights: [
      {
        pt: 'Conformidade nativa com LGPD (Art. 7º III/VI) e LAI (Lei 12.527/2011): zero exposição de CPFs de administradores e citação obrigatória de fonte primária',
        en: 'Native compliance with Brazilian LGPD & Freedom of Information Law: zero personal CPF exposure and mandatory primary-source citation in every brief',
      },
      {
        pt: 'Fonte Única de Verdade (score.ts + sase_graph.json): decomposição dinâmica normalizada garantindo consistência matemática em 100% das telas',
        en: 'Single Source of Truth (score.ts + sase_graph.json): normalized dynamic decomposition ensuring mathematical consistency across every view',
      },
    ],
    architecture: [
      {
        layer: 'LAYER 1 — PRIMARY PUBLIC APIS (20+ SOURCES)',
        detail: {
          pt: 'CVM FRE/DFP · SEC EDGAR 20-F · Portal Transparência CEIS/CNEP · CNJ DataJud · IBAMA · INPE PRODES · MTE · BACEN · TCU',
          en: 'CVM Filings · SEC EDGAR 20-F · Federal Sanctions CEIS/CNEP · CNJ DataJud · IBAMA · INPE PRODES · MTE · Central Bank · TCU',
        },
      },
      {
        layer: 'LAYER 2 — PYTHON ETL & SUPABASE RUNTIME',
        detail: {
          pt: 'Coletores modulares Python + PostgreSQL (sinalizacoes, score_historico, processos_judiciais, v_ranking_risco)',
          en: 'Modular Python collectors + Managed PostgreSQL (flags, score history, judicial cases, consolidated risk views)',
        },
      },
      {
        layer: 'LAYER 3 — 6-DIMENSION SCORING ENGINE (D1–D6)',
        detail: {
          pt: 'D1 Governança (25) · D2 Trabalhista (20) · D3 Ambiental (20) · D4 Integridade (15) · D5 Financeiro (12) · D6 Social (8)',
          en: 'D1 Governance (25) · D2 Labor (20) · D3 Environmental (20) · D4 Integrity (15) · D5 Financial (12) · D6 Social (8)',
        },
      },
      {
        layer: 'LAYER 4 — EXECUTIVE VISUALIZATION & AI AUDITOR',
        detail: {
          pt: 'Heatmap Setorial · Radar Hexagonal · Grafo Societário/Offshore · Parecer Técnico Fundamentado via LLM',
          en: 'Sector Heatmap · Hexagonal Radar · Corporate/Offshore Force-Graph · Grounded Audit Opinion via LLM',
        },
      },
    ],
  },
  {
    id: 'jarvis',
    index: '02.3',
    name: {
      pt: 'Agente J.A.R.V.I.S.',
      en: 'J.A.R.V.I.S. Autonomous Personal Agent',
    },
    shortSub: {
      pt: 'OS agêntico local-first · Roteador Jev (-89% custo) · Harness² · Taint Gate',
      en: 'Local-first agentic OS · Jev Router (-89% cost) · Harness² · Taint Gate',
    },
    category: {
      pt: 'AGENTIC AI INFRASTRUCTURE, MULTI-MODEL ROUTING & SECURITY',
      en: 'AGENTIC AI INFRASTRUCTURE, MULTI-MODEL ROUTING & SECURITY',
    },
    problem: {
      pt: 'Assistentes de IA tradicionais não enxergam o contexto real de trabalho no computador, desperdiçam orçamento acionando modelos caros para tarefas triviais e criam graves vetores de exfiltração por prompt injection quando conectados a ferramentas locais.',
      en: 'Conventional AI assistants lack local workspace context, burn frontier-model budgets on trivial requests, and introduce severe prompt-injection exfiltration risks when granted access to local tools and files.',
    },
    solution: {
      pt: 'Agente pessoal local-first (Nó no PC em 127.0.0.1 + Hub opcional em nuvem via Docker/Tailscale) operável por HUD PWA, voz offline ("Hey Jarvis" com Whisper/Piper), Telegram e Microsoft 365, equipado com roteador multi-modelo, auto-otimização Harness² e portão determinístico de permissões.',
      en: 'Local-first personal agent (PC Node on 127.0.0.1 + optional Cloud Hub via Docker/Tailscale) operated via Web/PWA HUD, offline voice ("Hey Jarvis" via Whisper/Piper), Telegram, and Microsoft 365, featuring multi-model routing, Harness² self-improvement, and deterministic permission gating.',
    },
    impactMetrics: [
      { value: '-89%', label: { pt: 'Economia medida vs. Opus puro', en: 'Measured cost savings vs. Opus-only' } },
      { value: '120', label: { pt: 'Testes automatizados (pytest)', en: 'Automated security & agent tests' } },
      { value: '5', label: { pt: 'Rotas dinâmicas Claude ⇄ Gemini', en: 'Dynamic Claude ⇄ Gemini routes' } },
    ],
    stack: [
      'Python 3.12 + FastAPI (REST/WS)',
      'Claude (Opus/Sonnet/Haiku) + Gemini',
      'Jev Classifier + Harness² Engine',
      'SQLite FTS5 + Hybrid Vector RAG',
      'Whisper + Piper Offline Voice',
      'PWA HUD + Three.js + Tailscale',
    ],
    securityHighlights: [
      {
        pt: 'Defesa determinística contra Prompt Injection (Session Tainting): ler web/e-mail/arquivo externo marca a sessão como contaminada e exige aprovação humana + TOTP para qualquer escrita/envio',
        en: 'Deterministic Prompt-Injection Defense (Session Tainting): ingesting web/email/external files taints the session, requiring human push approval + TOTP before any write or outbound call',
      },
      {
        pt: 'Trilha de auditoria encadeada por hash SHA-256 (jarvis audit verify) + Sandbox de arquivos bloqueando .env, .ssh, cofres e symlinks',
        en: 'SHA-256 hash-chained tamper-evident audit log (jarvis audit verify) + strict filesystem sandbox blocking .env, .ssh, vaults, and symlinks',
      },
    ],
    architecture: [
      {
        layer: 'OMNICHANNEL INTERFACES',
        detail: {
          pt: 'HUD Desktop/Mobile PWA · Voz Offline ("Hey Jarvis" / Whisper / Piper) · Telegram · Ponte Outlook & Power Automate',
          en: 'Desktop/Mobile PWA HUD · Offline Voice ("Hey Jarvis" / Whisper / Piper) · Telegram · Outlook & Power Automate Bridge',
        },
      },
      {
        layer: 'MULTI-MODEL ROUTER & FAILOVER',
        detail: {
          pt: '5 Rotas (Instant · Rápida · Web · Agente · Profundo) com classificador Jev, disjuntor e conversão de histórico Claude ⇄ Gemini',
          en: '5 Routes (Instant · Fast · Web · Agent · Deep) with Jev classifier, circuit breaker, and mid-chat Claude ⇄ Gemini state conversion',
        },
      },
      {
        layer: 'SECURITY GATE & TAINT TRACKER',
        detail: {
          pt: 'Política READ/WRITE/DANGEROUS · Taint de conteúdo externo · Push Approve/Deny + TOTP · Auditoria SHA-256',
          en: 'READ/WRITE/DANGEROUS policy · External content taint tracking · Push Approve/Deny + TOTP · SHA-256 Audit Ledger',
        },
      },
      {
        layer: 'KNOWLEDGE VAULT & HARNESS²',
        detail: {
          pt: 'RAG local unificando Claude/Gemini/Docs → Segundo Cérebro Obsidian + Ciclo Propor (INV/DOM) → Testar → Compor',
          en: 'Local RAG unifying Claude/Gemini/Docs → Obsidian Second Brain + Recursive Propose (INV/DOM) → Test → Blind Compose',
        },
      },
    ],
  },
  {
    id: 'pulseclean',
    index: '02.4',
    name: {
      pt: 'PulseClean AI',
      en: 'PulseClean AI',
    },
    shortSub: {
      pt: 'Telemetria Win32 local-first · Score explicável sim-1 · Safety Guard',
      en: 'Local-first Win32 telemetry · Explainable sim-1 score · Safety Guard',
    },
    category: {
      pt: 'SYSTEMS PROGRAMMING, EXPLAINABLE SCORING & DESKTOP UX',
      en: 'SYSTEMS PROGRAMMING, EXPLAINABLE SCORING & DESKTOP UX',
    },
    problem: {
      pt: 'Utilitários clássicos de limpeza usam listas estáticas cegas que destroem caches úteis de compilação, desconectam sessões, penalizam o boot apagando Prefetch ou corrompem arquivos sincronizados no OneDrive — sem jamais explicar o risco ao usuário.',
      en: 'Legacy PC cleaners rely on blind static rules that wipe valuable build caches, break active sessions, slow boot by deleting Prefetch, or corrupt cloud-synced OneDrive placeholders — without explaining risk.',
    },
    solution: {
      pt: 'Aplicação desktop nativa 100% local-first (Python 3.12 + PySide6 Qt6 + Win32 ctypes/winreg + SQLite WAL) que constrói o perfil real de uso da máquina desde o dia 1 (UserAssist, Recent, foco por evento) e pontua pastas ocultas, caches e processos com justificativa em linguagem natural.',
      en: '100% local-first native desktop app (Python 3.12 + PySide6 Qt6 + Win32 ctypes/winreg + SQLite WAL) building a real machine usage profile from Day 1 (UserAssist, Recent, event-hook focus) to score hidden folders, caches, and background processes with plain-language explanations.',
    },
    impactMetrics: [
      { value: '93+', label: { pt: 'Testes (Guard + Offscreen Qt)', en: 'Tests (Guard + Offscreen Qt)' } },
      { value: '0 KB', label: { pt: 'Tráfego de rede (100% offline)', en: 'Network traffic (zero-socket test)' } },
      { value: '+8,1 GB', label: { pt: 'Recuperados em validação real', en: 'Reclaimed in real validation run' } },
    ],
    stack: [
      'Python 3.12 (psutil + ctypes + winreg)',
      'PySide6-Essentials (Qt 6 + QPainter)',
      'SQLite3 WAL Mode (Schema v2)',
      'Squarified Treemap Engine',
      'Explainable Similarity Model (sim-1)',
      'Append-Only SHA-256 Audit Triggers',
    ],
    securityHighlights: [
      {
        pt: 'Safety Guard Deny-by-Default (ALLOW / REVIEW / READ_ONLY / BLOCK): protege System32, DPAPI/.ssh, .git, OneDrive sob demanda, módulos bancários e junções NTFS',
        en: 'Deny-by-Default Safety Guard (ALLOW / REVIEW / READ_ONLY / BLOCK): protects System32, DPAPI/.ssh, .git, OneDrive placeholders, banking security modules, and NTFS junctions',
      },
      {
        pt: 'Dry-Run estrutural obrigatório com plan_hash SHA-256 + Quarentena reversível de 14 dias + Teste automatizado que proíbe qualquer import de socket/http',
        en: 'Mandatory structural Dry-Run with SHA-256 plan_hash + 14-day reversible Quarantine + Automated AST/import test forbidding any network module',
      },
    ],
    architecture: [
      {
        layer: 'WIN32 SCANNER & TELEMETRY (ZERO WMI)',
        detail: {
          pt: 'os.scandir atributos Win32 (sem seguir junções) + CallNtPowerInformation bateria + contadores PDH GPU Engine',
          en: 'Single-pass os.scandir Win32 attributes (never following junctions) + CallNtPowerInformation battery + PDH GPU counters',
        },
      },
      {
        layer: 'CONTEXT & SIMILARITY ENGINE (sim-1)',
        detail: {
          pt: 'UserAssist + SetWinEventHook + Recent → 7 features ponderadas (R, F, A, I, C, N, P) convertidas em frases',
          en: 'UserAssist + SetWinEventHook + Recent → 7 weighted features (R, F, A, I, C, N, P) rendered as human explanations',
        },
      },
      {
        layer: 'DENY-BY-DEFAULT SAFETY GUARD',
        detail: {
          pt: 'Normalização anti-path-traversal/ADS/8.3 + Reavaliação em cada arquivo descendente no instante da execução',
          en: 'Anti-path-traversal/ADS/8.3 normalization + Per-descendant-file Guard re-evaluation at execution time',
        },
      },
      {
        layer: 'PYSIDE6 AURORA UI & WAL STORAGE',
        detail: {
          pt: '5 telas nativas (QPainter Treemap, DiskGlobe, Gauges) + SQLite WAL concorrente + Triggers append-only SHA-256',
          en: '5 native Qt6 views (QPainter Treemap, DiskGlobe, Gauges) + Concurrent SQLite WAL + Append-only SHA-256 triggers',
        },
      },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'firjan-head',
    company: 'Firjan SENAI SESI — Parque Tecnológico',
    role: {
      pt: 'Head of Data Governance & Intelligence AI PMO',
      en: 'Head of Data Governance & Intelligence AI PMO',
    },
    period: { pt: 'Set 2025 – Presente', en: 'Sep 2025 – Present' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'leadership',
    featured: true,
    highlights: {
      pt: [
        'Liderança de equipes multidisciplinares (analistas, pesquisadores e especialistas) na Gerência de PD&I e governança executiva de portfólio multifomento (EMBRAPII, FINEP, BNDES, ANP e SENAI DN — R$ 55M+ em carteira própria e R$ 100M+ / 140 projetos em atuação matricial sob budget > R$ 500M).',
        'Concepção e liderança das plataformas DATA4PMO, Sistema de Gestão de Projetos v3.0 (com simulações de Monte Carlo, avaliação TRL e ativos intangíveis), ecossistema multi-agentes Robô Nexo (8 agentes) e sistemas RAG.',
        'Desenvolvimento de 16 motores de automação para auditoria preventiva contínua e alocação de custos de pessoal, reduzindo em 85% o lead time operacional e mitigando riscos de glosa.',
        'Autoria da Política de Governança de Dados (POL-GPD-001) e do Plano Estratégico de Dados (PEI-GPD-001) alinhados à LGPD, TCU, CGU e ISOs para 5 Institutos SENAI de Inovação.',
        'Liderança em Inovação Aberta (Programa Smart Factory FINEP/SENAI), membro técnico de Comitês da ABNT (TI, IA ISO/IEC 42001, Gestão de Projetos e Finanças) e autor de artigo aprovado no IV SPDE 2026 / homologado no BBSIA (Enap/IBICT).',
      ],
      en: [
        'Lead multidisciplinary teams (analysts, researchers, and specialists) within the R&D Directorate, governing multifunded innovation portfolios (EMBRAPII, FINEP, BNDES, ANP, SENAI DN — R$ 55M+ direct portfolio and R$ 100M+ / 140 projects across a R$ 500M+ controlled budget).',
        'Conceived and spearheaded the DATA4PMO corporate platform, Project Management System v3.0 (Monte Carlo forecasting, TRL evaluation, intangible assets), the 8-agent autonomous Nexo Robot, and enterprise RAG workflows.',
        'Engineered 16 automation engines for continuous preventive auditing and personnel cost allocation, slashing critical compliance lead times by 85% and mitigating disallowance risks.',
        'Authored the Corporate Data Governance Policy (POL-GPD-001) and Strategic Data Plan (PEI-GPD-001) aligned with LGPD, federal audit courts (TCU/CGU), and ISO standards across 5 SENAI Innovation Institutes.',
        'Lead Open Innovation initiatives (Smart Factory FINEP/SENAI), serve on ABNT Technical Standards Committees (AI ISO/IEC 42001, IT, PM, Finance), and authored research approved at IV SPDE 2026 and homologated in Brazil’s Federal AI Repository (Enap/IBICT BBSIA).',
      ],
    },
    tags: ['Agentic AI PMO', 'Data Governance', 'EMBRAPII / FINEP / BNDES', 'Python & SQL', 'Monte Carlo', 'LGPD & ISO 42001'],
  },
  {
    id: 'firjan-especiais',
    company: 'Firjan SENAI SESI',
    role: {
      pt: 'Analista de Projetos Especiais (FP&A & Compliance)',
      en: 'Special Projects Analyst (FP&A & Compliance)',
    },
    period: { pt: 'Jun 2025 – Set 2025', en: 'Jun 2025 – Sep 2025' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'finance_data',
    highlights: {
      pt: [
        'Condução de planejamento e análise financeira (FP&A) de projetos estratégicos apoiados pela Firjan: consolidação de resultados, Budget, Forecast e Rolling Forecast vs. Actual.',
        'Validação rigorosa de documentação contábil e comprobatória para prestações de contas regulatórias e estruturação de dossiês executivos mensais, trimestrais e semestrais para alta liderança.',
      ],
      en: [
        'Led financial planning and analysis (FP&A) for strategic Firjan-backed projects, consolidating financial performance across Budget, Forecast, and Rolling Forecast vs. Actual.',
        'Executed accounting and evidentiary validation for regulatory accountability and structured monthly/quarterly executive financial dossiers and efficiency KPIs.',
      ],
    },
    tags: ['Strategic FP&A', 'Rolling Forecast', 'Regulatory Dossiers', 'KPI Governance'],
  },
  {
    id: 'financas-uff',
    company: 'Associação Atlética Acadêmica Finanças UFF',
    role: {
      pt: 'Coordenador Financeiro',
      en: 'Financial Coordinator',
    },
    period: { pt: 'Set 2025 – Set 2026', en: 'Sep 2025 – Sep 2026' },
    location: 'Niterói, RJ — Brasil',
    category: 'leadership',
    highlights: {
      pt: [
        'Estruturação e acompanhamento do orçamento anual, projeções de fluxo de caixa, compliance transparente de prestação de contas acadêmica e automação de controles financeiros.',
      ],
      en: [
        'Structured annual budgeting, cash-flow forecasting, transparent institutional accountability routines, and financial process automation.',
      ],
    },
    tags: ['Budgeting', 'Cash Flow', 'Financial Automation', 'Compliance'],
  },
  {
    id: 'fiotec-analista',
    company: 'FIOTEC — Fundação de Apoio à Fiocruz',
    role: {
      pt: 'Analista de Projetos — Execução Nacional',
      en: 'Project Analyst — National Execution',
    },
    period: { pt: 'Jan 2025 – Jun 2025 (6 anos 5 meses na instituição)', en: 'Jan 2025 – Jun 2025 (6 yrs 5 mos total tenure)' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'leadership',
    featured: true,
    highlights: {
      pt: [
        'Gerenciamento integral End-to-End (PMBOK & Business Analysis) de projetos estratégicos de execução nacional vinculados à Fiocruz (atuação acumulada em ecossistema de R$ 300M+ / 250 projetos).',
        'Controladoria financeira e FP&A completo de projetos (receitas, despesas, saldos, conciliações bancárias complexas e supervisão da esteira de suprimentos/contratações).',
        'Operação avançada e supervisão no SAP ERP (módulos MM, FI, CO e PS), garantindo rastreabilidade físico-contábil perante financiadores e órgãos de controle.',
      ],
      en: [
        'Full-lifecycle End-to-End management (PMBOK & Business Analysis) of national health and science projects tied to Fiocruz (cumulative ecosystem experience spanning R$ 300M+ / 250 projects).',
        'Project financial controlling and FP&A (revenues, expenditures, complex bank reconciliations, and strategic procurement/contracting oversight).',
        'Advanced operation and supervision in SAP ERP (MM, FI, CO, and PS modules), ensuring seamless physical-to-accounting traceability for funders and auditors.',
      ],
    },
    tags: ['PMBOK End-to-End', 'SAP ERP (PS/FI/CO/MM)', 'Project Controlling', 'Public Procurement'],
  },
  {
    id: 'fiotec-gov',
    company: 'FIOTEC — Fundação de Apoio à Fiocruz',
    role: {
      pt: 'Assistente de Governança de Dados (Contratos & Finanças)',
      en: 'Data Governance Associate (Contracts & Finance)',
    },
    period: { pt: 'Fev 2021 – Dez 2024', en: 'Feb 2021 – Dec 2024' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'finance_data',
    highlights: {
      pt: [
        'Desenvolvimento de painéis gerenciais (Dashboards) e ferramentas analíticas de monitoramento contínuo que reduziram a inadimplência contábil em mais de 40% e elevaram a assertividade financeira em mais de 65%.',
        'Auditoria e baixa contábil de mais de R$ 250 mil em processos de compras corporativas, cruzando pedidos, centros de custo e cartões corporativos.',
        'Modelagem transversal com Jurídico e PMO de nova esteira de contratação de autônomos e apuração de direitos autorais; atuação como multiplicador de treinamento em relatórios SAP ERP.',
      ],
      en: [
        'Built executive KPI dashboards and analytical control tools that reduced accounting delinquency by over 40% and increased financial forecasting accuracy by over 65%.',
        'Audited and cleared R$ 250K+ in corporate purchasing processes across purchase orders, cost centers, and corporate cards.',
        'Co-designed with Legal and PMO a compliant workflow for independent contractors and copyright royalties; served as internal SAP ERP reporting trainer.',
      ],
    },
    tags: ['Data Governance', 'KPI Dashboards', 'Accounting Audit', 'SAP ERP Training'],
  },
  {
    id: 'fiotec-adm',
    company: 'FIOTEC — Fundação de Apoio à Fiocruz',
    role: {
      pt: 'Assistente Administrativo',
      en: 'Administrative Assistant',
    },
    period: { pt: 'Fev 2019 – Fev 2021', en: 'Feb 2019 – Feb 2021' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'foundation',
    highlights: {
      pt: [
        'Suporte operacional, documental e financeiro à execução de convênios e projetos institucionais de pesquisa e saúde pública.',
      ],
      en: [
        'Operational, documentary, and financial support for institutional research grants and public-health agreements.',
      ],
    },
    tags: ['Grant Operations', 'Document Compliance'],
  },
  {
    id: 'dramm',
    company: 'Dramm Drywall Comercial e Distribuidora',
    role: {
      pt: 'Assistente de Contratos & Faturamento',
      en: 'Contracts & Billing Assistant',
    },
    period: { pt: 'Mai 2018 – Nov 2018', en: 'May 2018 – Nov 2018' },
    location: 'Niterói, RJ — Brasil',
    category: 'foundation',
    highlights: {
      pt: [
        'Gestão do ciclo de vida de contratos, Ordens de Serviço (OS), aditivos, faturamento fiscal (NF-e/boletos) e SLA B2B, alcançando redução de 40% nos custos de contratos administrativos.',
      ],
      en: [
        'Managed contract lifecycles, service orders, amendments, tax billing, and corporate SLAs, delivering a 40% reduction in administrative contract costs.',
      ],
    },
    tags: ['Contract Lifecycle', 'Tax Billing', 'Cost Reduction (-40%)'],
  },
  {
    id: 'petrobras',
    company: 'Petrobras Distribuidora S.A. (atual Vibra Energia)',
    role: {
      pt: 'Estagiário Técnico em Administração e Controle',
      en: 'Technical Intern — Administration & Asset Control',
    },
    period: { pt: 'Fev 2017 – Mar 2018', en: 'Feb 2017 – Mar 2018' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'finance_data',
    highlights: {
      pt: [
        'Inteligência de mercado e valoração patrimonial imobiliária (Real Estate), controle de conformidade de CAPEX e frota nacional, e relatórios de depreciação/auditoria interna.',
      ],
      en: [
        'Conducted market intelligence and real-estate asset valuation, national fleet and CAPEX compliance control, and depreciation/internal audit reporting.',
      ],
    },
    tags: ['CAPEX & Real Estate Valuation', 'Asset Control', 'Internal Audit'],
  },
  {
    id: 'early-career',
    company: 'La Estampa · Barcellos Advocacia · 1º Batalhão de Guardas RJ',
    role: {
      pt: 'Tesouraria, Governança Paralegal & Controle Patrimonial Público',
      en: 'Treasury, Paralegal Governance & Public Asset Control',
    },
    period: { pt: 'Mar 2014 – Nov 2017', en: 'Mar 2014 – Nov 2017' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'foundation',
    highlights: {
      pt: [
        'La Estampa (Nov 2016 – Nov 2017): fluxo de caixa diário, contas a pagar B2B e conferência fiscal.',
        'Barcellos Advocacia Empresarial (Mar 2015 – Ago 2015): governança paralegal, controle de SLA em ERP e conciliação bancária.',
        '1º Batalhão de Guardas do Estado do RJ (Mar 2014 – Jan 2015): inventário patrimonial contínuo e relatórios de conformidade do orçamento público.',
      ],
      en: [
        'La Estampa (Nov 2016 – Nov 2017): daily cash-flow management, B2B accounts payable, and tax invoice verification.',
        'Barcellos Corporate Law (Mar 2015 – Aug 2015): paralegal compliance, ERP deadline SLAs, and bank reconciliation.',
        '1st Guards Battalion of Rio de Janeiro State (Mar 2014 – Jan 2015): continuous physical asset inventory and public budget compliance reporting.',
      ],
    },
    tags: ['Treasury & Cash Flow', 'Public Budget', 'ERP SLA'],
  },
  {
    id: 'furnas',
    company: 'Eletrobras Furnas Centrais Elétricas S.A.',
    role: {
      pt: 'Concurso Jovem Aprendiz Administrativo / FP&A',
      en: 'Apprentice — Institutional FP&A & Economic Feasibility',
    },
    period: { pt: 'Mar 2013 – Fev 2014', en: 'Mar 2013 – Feb 2014' },
    location: 'Rio de Janeiro, RJ — Brasil',
    category: 'finance_data',
    highlights: {
      pt: [
        'Estruturação de relatórios analíticos de FP&A, cenários macroeconômicos e análise de viabilidade econômica de investimentos. Vencedor do prêmio corporativo "Best Project".',
      ],
      en: [
        'Structured institutional FP&A analytical reports, macroeconomic projections, and investment feasibility studies. Winner of the corporate "Best Project" award.',
      ],
    },
    tags: ['FP&A Scenarios', 'Economic Feasibility', 'Winner: Best Project Award'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Universidade do Estado do Rio de Janeiro (UERJ)',
    degree: {
      pt: 'Pós-Graduação Lato Sensu (MBA Executivo) — Planejamento Estratégico, Finanças e Valuation',
      en: 'Executive MBA — Strategic Planning, Corporate Finance & Valuation',
    },
    period: { pt: 'Mar 2024 – Jul 2025', en: 'Mar 2024 – Jul 2025' },
    status: { pt: 'Concluído', en: 'Completed' },
  },
  {
    institution: 'Universidade do Estado do Rio de Janeiro (UERJ)',
    degree: {
      pt: 'Bacharelado em Administração de Empresas',
      en: 'Bachelor of Business Administration (BBA)',
    },
    period: { pt: 'Jan 2020 – Jul 2024', en: 'Jan 2020 – Jul 2024' },
    status: { pt: 'Concluído', en: 'Completed' },
  },
  {
    institution: 'Instituto Federal de Rondônia (IFRO)',
    degree: {
      pt: 'Pós-Graduação Lato Sensu (MBA) — Gestão de Instituições Públicas',
      en: 'MBA — Public Institutions Management & Governance',
    },
    period: { pt: 'Set 2026 – 2027', en: 'Sep 2026 – 2027' },
    status: { pt: 'Em curso', en: 'In Progress' },
  },
  {
    institution: 'Universidade Federal Fluminense (UFF)',
    degree: {
      pt: 'Bacharelado em Ciências Contábeis',
      en: 'Bachelor of Science in Accounting',
    },
    period: { pt: 'Fev 2025 – Dez 2028', en: 'Feb 2025 – Dec 2028' },
    status: { pt: 'Em curso', en: 'In Progress' },
  },
  {
    institution: 'ETEC Juscelino Kubitschek de Oliveira',
    degree: {
      pt: 'Curso Técnico Integrado em Administração e Negócios',
      en: 'Technical Degree in Business Administration',
    },
    period: { pt: 'Fev 2011 – Dez 2015', en: 'Feb 2011 – Dec 2015' },
    status: { pt: 'Concluído', en: 'Completed' },
  },
];

export const CERTIFICATIONS: CertificationGroup[] = [
  {
    category: {
      pt: 'IA Agêntica, Cloud & Engenharia de Dados',
      en: 'Agentic AI, Cloud & Data Engineering',
    },
    items: [
      { title: 'AI Research Foundations', issuer: 'Google DeepMind', badge: 'AI Research' },
      { title: 'Generative AI Leader Certification', issuer: 'Google Cloud', badge: 'GenAI' },
      { title: 'Cloud Digital Leader Certification', issuer: 'Google Cloud', badge: 'Cloud' },
      { title: 'Google Cloud Data Analytics & AI Infrastructure', issuer: 'Google Cloud', badge: 'Data' },
      { title: 'Google Student Ambassador (2026)', issuer: 'Google', badge: 'Leadership' },
      { title: 'Generative AI Overview for Project Managers', issuer: 'PMI', badge: 'PMI-AI' },
      { title: 'Data Science Fundamentals & Certified Foundations Associate', issuer: 'Oracle', badge: 'OCI' },
    ],
  },
  {
    category: {
      pt: 'PMO, Governança, Inovação & Liderança Executiva',
      en: 'PMO, Governance, Innovation & Executive Leadership',
    },
    items: [
      { title: 'Aspire Leaders Program', issuer: 'Aspire Institute (Harvard)', badge: 'Global Cohort' },
      { title: 'Google Professional Project Management Certificate', issuer: 'Google', badge: 'PMO' },
      { title: 'Six Sigma Yellow Belt Certified (CSSYB™)', issuer: 'SCRUMstudy / VMEdu', badge: 'Lean 6σ' },
      { title: 'Business Analysis Fundamentals Certified (BAFC)', issuer: 'VMEdu', badge: 'BA' },
      { title: 'Scrum for Ops and DevOps Fundamentals (SODFC)', issuer: 'SCRUMstudy', badge: 'DevOps' },
      { title: 'ISO 56000 / NP 4595 — Gestão da Inovação', issuer: 'ISCTE (Portugal)', badge: 'ISO 56000' },
      { title: 'Formação Governança Corporativa & Pensamento Estratégico', issuer: 'Alura', badge: 'Governance' },
      { title: 'Liderança Executiva & Leadership Communication', issuer: 'Escola Conquer / FIAP', badge: 'Exec' },
    ],
  },
  {
    category: {
      pt: 'Finanças Corporativas, Valuation, ERP & Idiomas',
      en: 'Corporate Finance, Valuation, ERP & Languages',
    },
    items: [
      { title: 'EF SET English Certificate 67/100 (C1 Advanced)', issuer: 'EF Standard English Test', badge: 'C1' },
      { title: 'Formação SAP ERP (Módulos PS, FI, CO, MM)', issuer: 'Alura', badge: 'SAP ERP' },
      { title: 'Avaliação de Empresas (Valuation) & Captação', issuer: 'PUCRS', badge: 'Valuation' },
      { title: 'Master Data Management (MDM) & Saneamento de Dados', issuer: 'Daniel Gasnier', badge: 'MDM' },
      { title: 'Gestão Financeira Internacional & Finanças Públicas', issuer: 'FGV / ENAP', badge: 'FP&A' },
      { title: 'Gestão Financeira de Empresas', issuer: 'FIAP', badge: 'Finance' },
    ],
  },
];

export const STACK_MATRIX = [
  {
    domain: { pt: 'Engenharia de IA & Dados', en: 'AI & Data Engineering' },
    skills: [
      'Python 3.12 (Pandas, NumPy, psutil)',
      'Multi-Agent Systems & RAG',
      'Claude SDK & Gemini API / Live WS',
      'PostgreSQL, PostGIS & Supabase RLS',
      'SQLite WAL + FTS5 Vector Hybrid',
      'Data Lakehouse Architecture',
    ],
  },
  {
    domain: { pt: 'Aplicações & Automação', en: 'Applications & Automation' },
    skills: [
      'TypeScript, React 18/19 & Next.js',
      'FastAPI (REST / WebSocket / SSE)',
      'Node.js 24 & PySide6 (Qt 6)',
      'Force-Graph WebGL & SVG DataViz',
      'Power Automate & M365 Bridges',
      'Docker, Tailscale & GitHub Actions',
    ],
  },
  {
    domain: { pt: 'PMO, Fomento & Governança', en: 'PMO, R&D Funding & Governance' },
    skills: [
      'EMBRAPII, FINEP, BNDES, ANP, Lei do Bem',
      'PMBOK, Scrum, Kanban & Lean Six Sigma',
      'Monte Carlo Risk & TRL Evaluation',
      'LGPD, LAI, TCU & CGU Compliance',
      'ABNT ISO/IEC 42001, 27000 & 56001',
      'Master Data Management (MDM)',
    ],
  },
  {
    domain: { pt: 'Strategic FP&A & ERP', en: 'Strategic FP&A & ERP' },
    skills: [
      'P&L, Budget vs. Actual & Rolling Forecast',
      'Valuation (DCF, TAM / SAM / SOM)',
      'SAP ERP (PS, FI, CO, MM) & Protheus',
      'FinOps & Multi-Model Token Economics',
      'Auditoria Contábil-Financeira Preventiva',
      'Intangible Assets & Royalties Modeling',
    ],
  },
];
