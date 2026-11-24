import React from 'react';
import { Printer, X } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCES,
  STACK_MATRIX,
  UI_TEXT,
  type Lang,
} from '../data/portfolioData';

interface ResumeModalProps {
  lang: Lang;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ lang, onClose }) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Executive Resume Print View">
      <div className="resume-sheet">
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            marginBottom: 22,
            borderBottom: '1px solid #e5e7eb',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>
            {lang === 'pt'
              ? 'MODO CURRÍCULO EXECUTIVO LIMPO (OTIMIZADO PARA IMPRESSÃO / SALVAR COMO PDF)'
              : 'CLEAN EXECUTIVE RESUME VIEW (OPTIMIZED FOR PRINT / SAVE AS PDF)'}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-primary btn-sm"
            >
              <Printer size={14} /> {lang === 'pt' ? 'Imprimir / Salvar PDF' : 'Print / Save PDF'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm"
              style={{ background: '#f3f4f6', color: '#111', borderColor: '#d1d5db' }}
            >
              <X size={14} /> {lang === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <header style={{ borderBottom: '2px solid #111', paddingBottom: 14, marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#09090b' }}>
            RODRIGO LISS PINTO, CSSYB™
          </h1>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fe1301', marginTop: 4 }}>
            Head of Data Governance & Agentic AI PMO | Strategic FP&A | FinOps, Data Engineering & Automation
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3f3f46', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
            Rio de Janeiro, RJ — Brasil · rodrigo.liss13@gmail.com · linkedin.com/in/rodrigo-liss · github.com/rodliss13
          </div>
        </header>

        {/* Summary */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #d4d4d8', paddingBottom: 4, margin: '0 0 8px' }}>
            {lang === 'pt' ? 'Resumo Executivo' : 'Executive Summary'}
          </h2>
          <p style={{ margin: 0, fontSize: '0.84rem', lineHeight: 1.55, color: '#27272a' }}>
            {UI_TEXT.hero.lead[lang]}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #d4d4d8', paddingBottom: 4, margin: '0 0 10px' }}>
            {lang === 'pt' ? 'Experiência Profissional' : 'Professional Experience'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#09090b' }}>
                    {exp.role[lang]} — <span style={{ fontWeight: 600 }}>{exp.company}</span>
                  </strong>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#52525b' }}>
                    {exp.period[lang]}
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0', paddingLeft: 18, fontSize: '0.8rem', lineHeight: 1.48, color: '#27272a' }}>
                  {exp.highlights[lang].map((h) => (
                    <li key={h} style={{ marginBottom: 3 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #d4d4d8', paddingBottom: 4, margin: '0 0 8px' }}>
            {lang === 'pt' ? 'Formação Acadêmica' : 'Academic Education'}
          </h2>
          {EDUCATION.map((ed) => (
            <div
              key={`${ed.institution}-${ed.degree.pt}`}
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.81rem', marginBottom: 5, gap: 12 }}
            >
              <span>
                <strong>{ed.degree[lang]}</strong> — {ed.institution}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#52525b', whiteSpace: 'nowrap' }}>
                {ed.period[lang]} ({ed.status[lang]})
              </span>
            </div>
          ))}
        </section>

        {/* Certifications & Stack */}
        <section>
          <h2 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #d4d4d8', paddingBottom: 4, margin: '0 0 8px' }}>
            {lang === 'pt' ? 'Certificações & Competências Técnicas' : 'Certifications & Technical Competencies'}
          </h2>
          <div style={{ fontSize: '0.79rem', lineHeight: 1.5, color: '#27272a' }}>
            {CERTIFICATIONS.map((cg) => (
              <p key={cg.category.en} style={{ margin: '0 0 6px' }}>
                <strong>{cg.category[lang]}:</strong>{' '}
                {cg.items.map((i) => `${i.title} (${i.issuer})`).join(' · ')}
              </p>
            ))}
            <p style={{ margin: '6px 0 0' }}>
              <strong>Tech & Governance Stack:</strong>{' '}
              {STACK_MATRIX.flatMap((m) => m.skills).join(' · ')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
