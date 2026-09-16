import { Icon } from "@/components/ui/icon";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import type { CSSProperties } from "react";
import { artwork } from "@/content/artwork";

const bars = [22, 32, 28, 44, 36, 50, 62, 44, 70, 54, 64, 82, 62, 76, 66, 90, 78, 100];

export function FinancialWorkspaceArtwork() {
  const content = artwork.financial;
  return (
    <div className="product-artwork financial-artwork" role="img" aria-label={content.alt}>
      <div className="financial-dashboard" aria-hidden="true">
        <aside className="financial-dashboard__sidebar">
          <span className="artwork-emblem"><Icon name="sparkle" /></span>
          {content.navigation.map((item, index) => <span key={item} className="financial-dashboard__nav" data-active={index === 0}><i />{item}</span>)}
          <span className="financial-dashboard__sidebar-rule" />
        </aside>
        <div className="financial-dashboard__main">
          <div className="financial-dashboard__top"><span>{content.title}</span><span className="artwork-micro">{content.sample}</span></div>
          <div className="financial-dashboard__columns">
            <div className="financial-dashboard__balance">
              <div className="financial-dashboard__labels"><span>{content.balanceLabel}</span><span>{content.period}</span></div>
              <p className="financial-dashboard__amount">{content.balance}</p>
              <p className="artwork-micro">{content.chartLabel}</p>
              <div className="financial-dashboard__chart">
                {bars.map((height, index) => <span key={index} style={{ "--bar-height": `${height}%` } as CSSProperties} />)}
              </div>
            </div>
            <div className="financial-dashboard__activity">
              <p>{content.activityLabel}</p>
              {content.accounts.map((account) => (
                <div key={account.name} className="financial-dashboard__record">
                  <span className="financial-dashboard__avatar"><ArrowIcon /></span>
                  <div><span>{account.name}</span><small>{account.status}</small></div>
                  <span>{account.amount}</span>
                </div>
              ))}
              <span className="financial-dashboard__action">{content.action}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
