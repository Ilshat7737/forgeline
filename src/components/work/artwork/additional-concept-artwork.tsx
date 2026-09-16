import type { ReactNode } from "react";
import { additionalWorkArtwork as content } from "@/content/additional-work-artwork";
import { workArtwork } from "@/content/work-artwork";
import { workConcepts, type WorkConceptId } from "@/content/work";

function Frame({ id, variant, title, children }: { id: WorkConceptId; variant: string; title: string; children: ReactNode }) {
  const concept = workConcepts.find((entry) => entry.id === id)!;
  return (
    <div className={`product-artwork additional-artwork additional-artwork--${variant}`} role="img" aria-label={concept.image.alt}>
      <div className="additional-artwork__canvas" aria-hidden="true">
        <div className="additional-artwork__header"><strong>{title}</strong><span>{workArtwork.sample}</span></div>
        {children}
      </div>
    </div>
  );
}

function TextLines() {
  return <div className="illustration-lines"><i /><i /><i /></div>;
}

export function KnowledgeLibraryArtwork() {
  const c = content.library;
  return (
    <Frame id="knowledge-library" variant="library" title={c.title}>
      <div className="library-search">⌕ <span>{c.search}</span></div>
      <div className="library-panels">
        <div className="library-topics">{c.topics.map((topic, i) => <p key={topic} data-active={i === 0}>{topic}</p>)}</div>
        <div className="library-results">{c.results.map((result, i) => <div key={result} data-active={i === 0}><strong>{result}</strong><TextLines /></div>)}</div>
        <div className="library-reader"><span>{c.source}</span><strong>{c.heading}</strong>{c.sections.map((section) => <div key={section}><p>{section}</p><TextLines /></div>)}</div>
      </div>
    </Frame>
  );
}

export function ServiceConfiguratorArtwork() {
  const c = content.configurator;
  return (
    <Frame id="service-configurator" variant="configurator" title={c.title}>
      <div className="configurator-layout">
        <div className="configurator-modules">{c.modules.map((module, i) => <div key={module}><span className="module-symbol">{i === 0 ? "◇" : i === 1 ? "▤" : "+"}</span><strong>{module}</strong><span className="module-check">✓</span></div>)}</div>
        <div className="configurator-plan"><span>{c.selected}</span><div className="configurator-map"><i /><i /><i /></div><p>{c.requires}</p><strong>{c.summary}</strong><span className="illustration-action">{c.action}</span></div>
      </div>
    </Frame>
  );
}

export function OfflineNotesArtwork() {
  const c = content.notes;
  return (
    <Frame id="offline-field-notes" variant="notes" title={c.title}>
      <div className="notes-capture"><span className="illustration-chip">{c.local}</span><strong>{c.note}</strong><p>{c.body}</p><div className="notes-sketch"><svg viewBox="0 0 180 70" fill="none" focusable="false"><path d="M10 55V15H65V55ZM90 55V15H160V55ZM65 35H90M78 27L86 35L78 43" stroke="currentColor" strokeWidth="2" /></svg></div></div>
      <div className="notes-sync"><strong>{c.comparison}</strong>{c.versions.map((version) => <div key={version}><span>{version}</span><TextLines /></div>)}<span className="illustration-action">{c.action}</span></div>
    </Frame>
  );
}

export function MobileAccessArtwork() {
  const c = content.access;
  return (
    <Frame id="mobile-access-pass" variant="access" title={c.title}>
      <div className="access-invitation"><span className="access-mark">◇</span><p>{c.invitation}</p><strong>{c.workspace}</strong><span className="illustration-action">{c.action}</span></div>
      <div className="access-pass"><div className="access-pass__identity"><span>{c.account}</span><strong>{c.role}</strong></div>{c.permissions.map((permission) => <p key={permission}><span>✓</span>{permission}</p>)}<span className="access-leave">{c.leave}</span></div>
    </Frame>
  );
}

export function DataComparisonArtwork() {
  const c = content.comparison;
  return (
    <Frame id="data-comparison-desk" variant="comparison" title={c.title}>
      <div className="comparison-panes">{c.files.map((file, pane) => <div key={file}><strong>{file}</strong><div className="comparison-row comparison-row--head">{c.columns.map((column) => <span key={column}>{column}</span>)}</div>{c.rows.map((row, index) => <div className="comparison-row" key={row[0]} data-changed={index === 1}>{row.map((value, cell) => <span key={cell}>{pane === 1 && index === 1 && cell === 2 ? c.replacement : value}</span>)}</div>)}</div>)}</div>
      <div className="comparison-preview"><span>{c.preview}</span><strong>{c.chosen}</strong><span className="illustration-action">{c.action}</span></div>
    </Frame>
  );
}

export function LocalEnvironmentArtwork() {
  const c = content.environment;
  return (
    <Frame id="local-environment-manager" variant="environment" title={c.title}>
      <div className="environment-layout"><div className="environment-tree"><strong>{c.project}</strong>{c.environments.map((environment, i) => <div key={environment} data-active={i === 0}><i />{environment}</div>)}</div><div className="environment-settings">{c.settings.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong><i /></div>)}</div></div>
      <div className="environment-preview"><span>{c.preview}</span><strong>{c.change}</strong><span className="illustration-action">{c.action}</span></div>
    </Frame>
  );
}

export function TeamCapacityArtwork() {
  const c = content.capacity;
  return (
    <Frame id="team-capacity-planner" variant="capacity" title={c.title}>
      <div className="capacity-layout"><div className="capacity-matrix"><div className="capacity-row"><span />{c.columns.map((column) => <span key={column}>{column}</span>)}</div>{c.teams.map((team, i) => <div className="capacity-row" key={team}><strong>{team}</strong>{c.columns.map((column, j) => <div className="capacity-cell" key={column}>{i !== j && <span data-draft={j === 2}>{c.work[(i + j) % c.work.length]}</span>}</div>)}</div>)}</div><div className="capacity-tray"><span>{c.tray}</span><strong>{c.unassigned}</strong><i>+</i></div></div>
      <p className="capacity-summary">{c.summary}</p>
    </Frame>
  );
}

export function SystemDependencyArtwork() {
  const c = content.dependencies;
  return (
    <Frame id="system-dependency-map" variant="dependencies" title={c.title}>
      <div className="dependencies-layout"><div className="dependencies-graph"><svg viewBox="0 0 300 200" fill="none" focusable="false"><path d="M55 45H220V145H55V45ZM55 45 220 145" stroke="currentColor" strokeWidth="2" /><path d="M55 145 220 45" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" /></svg>{c.services.map((service, i) => <span className={`dependency-node dependency-node--${i}`} key={service}>{service}</span>)}</div><div className="dependencies-detail"><span className="illustration-chip">{c.scope}</span><strong>{c.relationship}</strong><p>{c.detail}</p><TextLines /></div></div>
      <div className="dependencies-legend">{c.legend.map((label, i) => <span key={label}><i data-dashed={i === 1} />{label}</span>)}</div>
    </Frame>
  );
}
