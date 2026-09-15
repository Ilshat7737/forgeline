export type NavigationLink = { label: string; href: string };

export const navigation = {
  label: "Main navigation",
  links: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/#approach" },
    { label: "About", href: "/#about" },
  ],
  contact: { label: "Discuss your project", href: "/contact" },
  menu: { open: "Open menu", close: "Close menu" },
} as const satisfies {
  label: string;
  links: readonly NavigationLink[];
  contact: NavigationLink;
  menu: { open: string; close: string };
};

// Enable only once real Privacy Policy and Website Terms routes are supplied.
// No placeholder destinations are rendered in V1.
export const legalNavigation: readonly NavigationLink[] = [];
