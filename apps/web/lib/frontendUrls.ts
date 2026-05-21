export const frontendUrls = {
  auth: {
    signIn: "/auth",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  products: {
    all: "/products",
    favorites: "/products/favorites",
    my: "/my-products",
    create: "/products/create",
    edit: (productId: number) => `/products/${productId}/edit`,
    details: (productId: number) => `/products/${productId}`,
  },
  orders: {
    checkout: "/checkout",
    orders: "/orders",
    sales: "/sales",
  },
  sales: {
    my: "/sales",
  },
  organizer: {
    addEvent: "/organizer/add-event",
    ownEvents: "/organizer/own-events",
  },
  admin: "/admin",
  home: "/",
  profile: "/profile",
  forbidden: "/forbidden",
};
