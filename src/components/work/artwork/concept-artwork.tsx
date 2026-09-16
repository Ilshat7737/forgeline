import { ArrowIcon } from "@/components/ui/arrow-icon";
import type { CSSProperties, ReactNode } from "react";
import { workArtwork } from "@/content/work-artwork";
import { workConcepts, type WorkConceptId } from "@/content/work";
import { EverydayMobileArtwork } from "./everyday-mobile-artwork";
import { FinancialWorkspaceArtwork } from "./financial-workspace-artwork";

function ArtworkFrame({ id, variant, title, children }: { id: WorkConceptId; variant: string; title: string; children: ReactNode }) {
  const concept = workConcepts.find((concept) => concept.id === id)!;
  return (
    <div className={`product-artwork workspace-artwork ${variant}-artwork`} role="img" aria-label={concept.image.alt}>
      <div className="workspace-artwork__window" aria-hidden="true">
        <div className="workspace-artwork__top"><span>{title}</span><span className="artwork-micro">{workArtwork.sample}</span></div>
        {children}
      </div>
    </div>
  );
}

function WorkflowArtwork() {
  const content = workArtwork.workflow;
  return (
    <ArtworkFrame id="workflow-automation" variant="workflow" title={content.title}>
      <div className="queue-tabs">{content.tabs.map((tab, index) => <span key={tab} data-active={index === 1}>{tab}</span>)}</div>
      <div className="queue-layout">
        <div className="queue-table">
          <div className="queue-row queue-row--head">{content.columns.map((column) => <span key={column}>{column}</span>)}</div>
          {content.records.map((record, index) => <div className="queue-row" key={record.name} data-selected={index === 1}><span>{record.name}</span><span>{record.owner}</span><span className="sample-status" data-alert={index === 1}>{record.status}</span></div>)}
        </div>
        <div className="queue-detail"><span className="artwork-micro">{content.detail}</span><p>{content.reason}</p><small>{content.owner}</small><span className="sample-action">{content.action}</span></div>
      </div>
      <div className="queue-history">{content.history}</div>
    </ArtworkFrame>
  );
}

function CreativeArtwork() {
  const content = workArtwork.creative;
  return (
    <ArtworkFrame id="creative-production-tool" variant="creative" title={content.title}>
      <div className="creative-layout">
        <div className="creative-files"><span className="artwork-micro">{content.filesLabel}</span>{content.files.map((file, index) => <div key={file} data-active={index === 0}><i />{file}</div>)}</div>
        <div className="creative-preview"><span className="artwork-micro">{content.preview}</span><svg viewBox="0 0 300 230" fill="none" aria-hidden="true" focusable="false"><path d="M0 190 130 30 255 230H0Z" fill="var(--color-lavender-300)" /><circle cx="215" cy="75" r="49" fill="var(--color-coral-500)" /><path d="M35 230 190 30 300 210" stroke="var(--color-ivory)" strokeWidth="2" /><path d="M0 180H300M0 200H300" stroke="var(--color-plum-900)" strokeWidth="1" /></svg></div>
        <div className="creative-notes"><span className="artwork-micro">{content.review}</span>{content.notes.map((note, index) => <p key={note}><span>{String(index + 1).padStart(2, "0")}</span>{note}</p>)}</div>
      </div>
      <div className="creative-timeline"><span>{content.timeline}</span>{content.versions.map((version) => <div key={version}><i />{version}</div>)}<small>{content.saved}</small></div>
    </ArtworkFrame>
  );
}

function ProcessingArtwork() {
  const content = workArtwork.processing;
  return (
    <ArtworkFrame id="asset-processing-console" variant="processing" title={content.title}>
      <div className="pipeline-stages">{content.stages.map((stage, index) => <div key={stage} data-active={index === 2}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</div>)}</div>
      <div className="processing-layout">
        <div className="processing-jobs">
          <div className="processing-row artwork-micro">{content.columns.map((column) => <span key={column}>{column}</span>)}</div>
          {content.jobs.map((job, index) => <div key={job.name} className="processing-row"><span>{job.name}</span><div className="sample-progress"><i style={{ "--progress": `${job.progress}%` } as CSSProperties} /></div><span className="sample-status" data-alert={index === 1}>{job.status}</span></div>)}
        </div>
        <div className="processing-detail"><span className="artwork-micro">{content.issue}</span><p>{content.reason}</p><span className="sample-action">{content.retry}</span></div>
      </div>
      <span className="processing-configure">{content.action}<ArrowIcon /></span>
    </ArtworkFrame>
  );
}

function DeliveryArtwork() {
  const content = workArtwork.delivery;
  return (
    <ArtworkFrame id="delivery-flow-workspace" variant="delivery" title={content.title}>
      <div className="delivery-board">{content.stages.map((stage, index) => <div className="delivery-stage" key={stage.title}><p><i />{stage.title}<span>{stage.cards.length}</span></p>{stage.cards.map((card) => <div className="delivery-ticket" key={card.title} data-blocked={index === 1}><span>{card.title}</span><small>{card.detail}</small><i /></div>)}</div>)}</div>
      <div className="delivery-blocker"><span className="sample-status" data-alert="true">{content.blocker}</span><p>{content.reason}</p><small>{content.owner}</small><small>{content.waiting}</small></div>
    </ArtworkFrame>
  );
}

const compositions = {
  "financial-workspace": FinancialWorkspaceArtwork,
  "everyday-mobile-service": EverydayMobileArtwork,
  "workflow-automation": WorkflowArtwork,
  "creative-production-tool": CreativeArtwork,
  "asset-processing-console": ProcessingArtwork,
  "delivery-flow-workspace": DeliveryArtwork,
} satisfies Record<WorkConceptId, () => ReactNode>;

export function ConceptArtwork({ id }: { id: WorkConceptId }) {
  const Composition = compositions[id];
  return <Composition />;
}
