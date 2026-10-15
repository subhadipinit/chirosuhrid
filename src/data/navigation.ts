export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigationData: (NavItem | NavGroup)[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "What We Do",
    items: [
      {
        title: "Our Programs",
        href: "/programs",
        description: "Education, Health, and Livelihood initiatives",
      },
      {
        title: "Our Impact",
        href: "/impact",
        description: "Measurable change in the communities we serve",
      },
      {
        title: "Our Centers",
        href: "/centers",
        description: "Community hubs where we deliver our programs",
      },
      {
        title: "Events & Camps",
        href: "/events",
        description: "Health camps, eye clinics, and rural workshops",
      },
    ],
  },
  {
    title: "Stories",
    href: "/stories",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const mobileNavigationData = [
  {
    group: "About",
    items: [
      { title: "About Us", href: "/about" },
    ],
  },
  {
    group: "Our Work",
    items: [
      { title: "Programs", href: "/programs" },
      { title: "Impact", href: "/impact" },
      { title: "Centers", href: "/centers" },
      { title: "Events & Camps", href: "/events" },
      { title: "Stories", href: "/stories" },
      { title: "Gallery", href: "/gallery" },
    ],
  },
  {
    group: "Connect",
    items: [
      { title: "Contact", href: "/contact" },
    ],
  },
];
