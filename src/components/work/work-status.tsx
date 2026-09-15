import { workPage } from "@/content/work";

export type WorkStatus = "ready" | "loading" | "error";

export function WorkStatusMessage({ status, onRetry }: { status: WorkStatus; onRetry: () => void }) {
  if (status === "ready") return null;
  return (
    <div className="work-status" role="status">
      <p>{status === "loading" ? workPage.loading : workPage.error}</p>
      {status === "error" && <button type="button" className="work-reset" onClick={onRetry}>{workPage.retry}</button>}
    </div>
  );
}
