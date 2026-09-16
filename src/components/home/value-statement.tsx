import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
const surfaces: CardSurface[] = ["dark", "lavender", "coral"];
const icons: IconName[] = ["cube", "layers", "users"];
export function ValueStatement() {
  return <Card as="section" className="about-card" aria-labelledby="about-heading" shadow="soft">
    <div className="about-card__copy">
      <p className="section-heading__label">{home.about.label}</p>
      <h2 id="about-heading">{home.about.heading.split(". ").map((line, index) => <span key={line}>{line}{index === 0 ? ". " : ""}</span>)}</h2>
      <p>{home.about.body}</p>
      <p className="about-card__note">{home.about.note}</p>
      <Link href={home.about.link.href} className="editorial-link home-section__link">{home.about.link.label}<ArrowIcon direction="east" /></Link>
    </div>
    <div className="about-tiles">{homeLayout.aboutTiles.map((tile, index) => <Card key={tile.title} surface={surfaces[index]} radius="tile" padding="sm"><Icon name={icons[index]} /><h3>{tile.title}</h3><p>{tile.body}</p></Card>)}</div>
  </Card>;
}
