type AdditionalArtworkContent = {
  library: { title: string; search: string; topics: readonly string[]; results: readonly string[]; source: string; heading: string; sections: readonly string[] };
  configurator: { title: string; modules: readonly string[]; selected: string; requires: string; summary: string; action: string };
  notes: { title: string; local: string; note: string; body: string; comparison: string; versions: readonly string[]; action: string };
  access: { title: string; workspace: string; account: string; role: string; permissions: readonly string[]; invitation: string; action: string; leave: string };
  comparison: { title: string; files: readonly string[]; columns: readonly string[]; rows: readonly (readonly string[])[]; replacement: string; preview: string; chosen: string; action: string };
  environment: { title: string; project: string; environments: readonly string[]; settings: readonly (readonly [string, string])[]; preview: string; change: string; action: string };
  capacity: { title: string; teams: readonly string[]; columns: readonly string[]; work: readonly string[]; tray: string; unassigned: string; summary: string };
  dependencies: { title: string; services: readonly string[]; relationship: string; scope: string; detail: string; legend: readonly string[] };
};

export const additionalWorkArtwork = {
  library: {
    title: "Knowledge library", search: "Search: workspace setup", topics: ["Getting started", "Working together", "Reference"],
    results: ["Workspace setup", "Account settings", "Sharing guidance"], source: "Source / Guide A", heading: "Workspace setup", sections: ["Choose a workspace", "Check your role", "Find shared resources"],
  },
  configurator: {
    title: "Configure your workspace", modules: ["Core workspace", "Shared library", "Guest access"], selected: "Selected modules", requires: "Guest access requires a shared library", summary: "Configuration A / Draft", action: "Review choices",
  },
  notes: {
    title: "Capture a note", local: "Stored on this device", note: "Observation A", body: "Keep the entry point visible.", comparison: "Review shared changes", versions: ["Local note", "Shared note"], action: "Keep both observations",
  },
  access: {
    title: "Workspace invitation", workspace: "Workspace A", account: "Account A", role: "Contributor", permissions: ["Read shared notes", "Add observations", "Edit own entries"], invitation: "Invitation from Team A", action: "Review & join", leave: "Leave workspace",
  },
  comparison: {
    title: "Compare local data", files: ["Dataset A", "Dataset B"], columns: ["Record", "Group", "Value"], rows: [["Record A", "Group A", "20"], ["Record B", "Group B", "40"], ["Record C", "Group A", "60"]], replacement: "50", preview: "Chosen values", chosen: "Record B / 40 → 50", action: "Preview export",
  },
  environment: {
    title: "Local environments", project: "Project A", environments: ["Sandbox", "Local test", "Shared defaults"], settings: [["Data source", "Local sample"], ["Connection", "Loopback"], ["Logging", "Detailed"]], preview: "Switch preview", change: "Sandbox → Local test", action: "Review settings",
  },
  capacity: {
    title: "Draft allocation", teams: ["Team A", "Team B", "Team C"], columns: ["Block A", "Block B", "Block C"], work: ["Work A", "Work B", "Work C", "Work D"], tray: "Unassigned work", unassigned: "Work E", summary: "Draft plan / Not shared",
  },
  dependencies: {
    title: "System relationships", services: ["Service A", "Service B", "Service C", "Service D"], relationship: "Service B → Service C", scope: "Proposed change", detail: "Confirm the shared data contract.", legend: ["Confirmed", "Needs review"],
  },
} as const satisfies AdditionalArtworkContent;
