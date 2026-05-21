import { frontendUrls } from "@/lib/frontendUrls";
import { ILink } from "@/types/link.types";

export const PUBLIC_LINKS: ILink[] = [
  {
    href: "/test",
    label: "Populate",
  },
];
export const USER_LINKS: ILink[] = [
  {
    href: frontendUrls.products.all,
    label: "All products",
  },
  {
    href: frontendUrls.products.my,
    label: "My products",
  },
  {
    href: frontendUrls.orders.orders,
    label: "My orders",
  },
  {
    href: frontendUrls.orders.sales,
    label: "My sales",
  },
  {
    href: "/populate",
    label: "Populate",
  },
  // {
  //   href: "/orders",
  //   label: "My orders",
  // },
  // {
  //   href: "/favorites",
  //   label: "My favorites",
  // },
  // {
  //   href: "/my-products",
  //   label: "My products",
  // },
  {
    href: "/products/create",
    label: "Add product",
  },
  // {
  //   href: "/my-sales",
  //   label: "My sales",
  // },
];
export const ORGANIZER_LINKS: ILink[] = [];

export const ADMIN_LINKS: ILink[] = [];
