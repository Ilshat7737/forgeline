export type NavigationLink = { label: string; href: string };

export const navigation = {
  label: "Main navigation",
  mobileLabel: "Mobile navigation",
  footerLabel: "Footer navigation",
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
  mobileLabel: string;
  footerLabel: string;
  links: readonly NavigationLink[];
  contact: NavigationLink;
  menu: { open: string; close: string };
};
