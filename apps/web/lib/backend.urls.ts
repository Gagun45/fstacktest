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
    myById: (productId: number) => `products/me/${productId}`,
    detailsById: (productId: number) => `products/${productId}/details`,
    update: (productId: number) => `products/${productId}`,
  },
};
