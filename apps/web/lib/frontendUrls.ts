export const frontendUrls = {
  auth: {
    signIn: "/auth",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  products: {
    all: "/products",
    my: "/my-products",
    create: "/products/create",
    details: (productId: number) => `/products/${productId}`,
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
