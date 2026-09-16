import { Icon } from "@/components/ui/icon";
import { artwork } from "@/content/artwork";

export function EverydayMobileArtwork({ label }: { label?: string } = {}) {
  const content = artwork.mobile;
  return (
    <div className="product-artwork mobile-artwork" role="img" aria-label={label ?? content.alt}>
      <div className="mobile-artwork__composition" aria-hidden="true">
        <div className="task-screen task-screen--list">
          <div className="task-screen__top"><span className="artwork-micro">{content.sample}</span><span><Icon name="sparkle" /></span></div>
          <p className="task-screen__title">{content.title}</p>
          <div className="task-screen__tabs">{content.tabs.map((tab, index) => <span key={tab} data-active={index === 0}>{tab}</span>)}</div>
          <div className="task-screen__tasks">{content.tasks.map((task, index) => (
            <div className="task-screen__task" key={task.title}>
              <span className="task-screen__checkbox">{index === 0 ? <Icon name="check" /> : null}</span>
              <div><span>{task.title}</span><small>{task.detail}</small></div>
            </div>
          ))}</div>
          <div className="task-screen__bottom-rule" />
        </div>
        <div className="task-screen task-screen--progress">
          <p className="task-screen__title">{content.progressTitle}</p>
          <div className="task-screen__progress"><span>{content.progressValue}</span></div>
          <p className="task-screen__progress-label">{content.progressLabel}</p>
          <div className="task-screen__next"><span className="artwork-micro">{content.nextLabel}</span><p>{content.nextTask}</p></div>
        </div>
      </div>
    </div>
  );
}
