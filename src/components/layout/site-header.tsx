import { Wordmark } from "@/components/ui/wordmark";
import { HeaderNavigation } from "./header-navigation";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <div className="site-header-slot">
      <header className="site-header" data-sticky="false" data-surface="canvas">
        <div className="site-header__inner site-container flex h-full items-center justify-between gap-3">
          <Wordmark />
          <HeaderNavigation />
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
