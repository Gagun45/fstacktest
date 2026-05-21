export const backendUrls = {
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
    refresh: "auth/refresh",
    logout: "auth/logout",
    me: "auth/me",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    verifyAccount: "auth/verify-account",
  },
  products: {
    all: "products",
    create: "products",
    my: "products/me",
    getUploadUrl: "products/upload-url",
    myById: (productId: number) => `products/me/${productId}`,
    detailsById: (productId: number) => `products/${productId}/details`,
    update: (productId: number) => `products/${productId}`,
    favorites: {
      ids: "/products/favorites/ids",
      all: "/products/favorites",
      addOrRemove: (productId: number) => `/products/favorites/${productId}`,
    },
  },
  orders: {
    checkout: "/orders/checkout",
    getMyPurchases: "/orders/my/purchases",
    getMySales: "/orders/my/sales",
  },
};
