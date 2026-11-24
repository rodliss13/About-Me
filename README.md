# Rodrigo Liss, CSSYB™ — Executive Portfolio & Engineering Showcases

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-rodliss13.github.io%2FAbout--Me-FE1301?style=for-the-badge)](https://rodliss13.github.io/About-Me/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rodrigo_Liss-0A66C2?style=for-the-badge)](https://www.linkedin.com/in/rodrigo-liss)
[![Zero-Leak Security](https://img.shields.io/badge/DevSecOps-Zero--Leak_Verified-10B981?style=for-the-badge)](#security--devsecops-protocol)

> **Live Web Application (PT-BR / EN Instant Bilingual):** **[https://rodliss13.github.io/About-Me/](https://rodliss13.github.io/About-Me/)**

---

## 🇧🇷 Visão Executiva (PT-BR)

Portfólio executivo e vitrine interativa de engenharia de **Rodrigo Liss (Rodrigo Liss Pinto, CSSYB™)** — **Head of Data Governance & Agentic AI PMO | Strategic FP&A | FinOps, Data Engineering & Automation**.

Com mais de **10 anos de trajetória** em ambientes altamente regulados (**Firjan SENAI SESI**, **Fiocruz / FIOTEC**, **Petrobras Distribuidora / Vibra Energia** e **Eletrobras Furnas**), lidero a convergência entre **Governança de Dados, Sistemas Multi-Agentes de IA, Engenharia de Automação e Controladoria/FP&A** em portfólios de PD&I superiores a **R$ 55M diretos** sob orçamento controlado de **R$ 500M+**.

### Vitrines Interativas ("Live Showcases" no Navegador)
A aplicação permite testar ao vivo 4 sistemas autorais reais (alimentados 100% por telemetria sintética segura):

1. **Rastreador de Entregas Integrado (`Node.js 24 SSE · OSRM + 5-API ETA Fusion · Recipient Match`)** — Central logística em tempo real com deduplicação multi-provedor (17TRACK, Ship24, Correios CWS, Mercado Livre, SSW DANFE, NF-e XML), máquina do tempo no mapa viário, motor de fusão de ETA com regras da Lei 13.103 e score aditivo de destinatário (`match.js`).
2. **SASE — Sistema de Auditoria Social Empresarial (`Next.js 16 · React 19 · TypeScript · Force-Graph · Supabase · Gemini/Claude`)** — Plataforma de Data-Intelligence desenvolvida na Cátedra de Auditoria Social da UFF cobrindo 50 companhias abertas da B3 em 20 setores por meio de 30 rotas de API e Score auditável em 6 dimensões legais (`D1–D6`).
3. **Agente J.A.R.V.I.S. (`Python 3.12 · FastAPI WS · Jev Router · Harness² · Taint Security Gate`)** — Sistema operacional agêntico local-first com roteador multi-modelo Claude ⇄ Gemini (**-89% de custo medido**), auto-aperfeiçoamento recursivo **Harness²**, voz offline (`Whisper` + `Piper`), defesa determinística contra *prompt injection* por contaminação de sessão (*taint tracking* + TOTP) e auditoria encadeada por SHA-256.
4. **PulseClean AI (`Python 3.12 · PySide6 Qt6 · SQLite WAL · Explainable Similarity sim-1`)** — Analisador e limpador desktop 100% offline baseado no perfil real de uso do Windows (`UserAssist`, `SetWinEventHook`, `Recent`), com **Safety Guard Deny-by-Default**, Dry-Run estrutural assinado por `plan_hash` SHA-256 e quarentena reversível de 14 dias.

---

## 🌐 Executive Overview (EN)

Interactive executive portfolio and live engineering showcase of **Rodrigo Liss, CSSYB™** — **Head of Data Governance & Agentic AI PMO | Strategic FP&A | FinOps, Data Engineering & Automation**.

With **10+ years of experience** across mission-critical, highly regulated institutions (**Firjan SENAI SESI**, **Fiocruz / FIOTEC**, **Vibra / Petrobras Distribuidora**, and **Eletrobras Furnas**), I unite **Corporate Data Governance, Multi-Agent AI Architecture, Process Automation, and Strategic FP&A** across **R$ 55M+ direct R&D portfolios** within **R$ 500M+ controlled budgets**.

### Key Features of This Application
- **Instant Bilingual Architecture (`PT-BR` / `EN`)**: Real-time translation across executive biography, career trajectory, academic credentials, and all 4 interactive sandboxes.
- **Bespoke Editorial + Dark Vermilion Design System**: High-contrast Dark Mode default (`#020202` / `#0F1014` / `#FE1301`) + toggleable Contemporary Editorial Light Mode (`#F8F8F8` / `#FFFFFF`).
- **Headhunter Mode & Printable Executive CV**: Dedicated clean print/PDF sheet (`window.print()`) dynamically rendered in either Portuguese or English.

---

## Security & DevSecOps Protocol

This repository enforces a strict **Zero-Leak Policy**:
- Zero API keys, OAuth secrets, `.env` files, `.db`/`.sqlite` files, internal corporate URLs, or local machine paths.
- Zero third-party or personal sensitive records (CPFs, private addresses, real tracking IDs, or tax invoices).
- All interactive showcases operate self-contained in the browser using deterministic synthetic datasets.

---

## Local Development & Build

```bash
npm install
npm run dev      # Local dev server
npm run build    # TypeScript strict check + Vite production bundle (base: '/About-Me/')
npm run preview  # Preview production build locally
```

---

**Contact:** [LinkedIn (/in/rodrigo-liss)](https://www.linkedin.com/in/rodrigo-liss) · `rodrigo.liss13@gmail.com`
