import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
import { CubeArtwork, SlabArtwork } from "./studio-artwork";
export function InsightLinks() {
  return <section className="home-section" aria-labelledby="insights-heading">
    <SectionHeading label={home.insights.label} heading={home.insights.heading} headingId="insights-heading" supporting={homeLayout.insightsSupporting} />
    <div className="insight-entries">{home.insights.entries.map((entry, index) => <Card as="article" key={entry.title} surface={index === 0 ? "lavender" : "dark"} className="insight-entry" shadow="soft">
      <div className="insight-entry__copy"><PillLabel variant="tag">{homeLayout.article}</PillLabel><h3>{entry.title}</h3><p>{entry.summary}</p><p className="insight-entry__status">{home.insights.status}</p><ArrowIcon direction="east" /></div>
      <div className="insight-entry__art">{index === 0 ? <CubeArtwork variant="scatter" /> : <SlabArtwork />}</div>
    </Card>)}</div>
  </section>;
}
