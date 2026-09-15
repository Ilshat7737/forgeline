type ArtworkContent = {
  financial: { alt: string; sample: string; title: string; navigation: readonly string[]; balanceLabel: string; balance: string; period: string; chartLabel: string; activityLabel: string; action: string; accounts: readonly { name: string; status: string; amount: string }[] };
  mobile: { alt: string; sample: string; title: string; tabs: readonly string[]; tasks: readonly { title: string; detail: string }[]; progressTitle: string; progressValue: string; progressLabel: string; nextLabel: string; nextTask: string };
};

// All figures and records are illustrative interface data, never delivery claims.
export const artwork = {
  financial: {
    alt: "Illustrative financial dashboard with a sample balance, activity chart and three account records.",
    sample: "SAMPLE WORKSPACE", title: "Overview",
    navigation: ["Overview", "Activity", "Accounts", "Settings"],
    balanceLabel: "Total balance", balance: "$12,000", period: "This month", chartLabel: "Balance activity", activityLabel: "Recent activity", action: "Review pending",
    accounts: [
      { name: "Account A", status: "Received", amount: "+ $2,000" },
      { name: "Account B", status: "Pending", amount: "$1,000" },
      { name: "Account C", status: "Sent", amount: "− $500" },
    ],
  },
  mobile: {
    alt: "Illustrative mobile task interfaces showing sample recurring tasks, progress and a next activity, without device hardware.",
    sample: "SAMPLE TASKS", title: "Your day", tabs: ["Today", "Upcoming"],
    tasks: [
      { title: "Plan the day", detail: "Morning routine" },
      { title: "Take a short walk", detail: "A moment to reset" },
      { title: "Review your notes", detail: "Afternoon routine" },
    ],
    progressTitle: "Your progress", progressValue: "2 / 4", progressLabel: "Tasks complete", nextLabel: "UP NEXT", nextTask: "Review your notes",
  },
} as const satisfies ArtworkContent;
