"use client";

import { store } from "@/redux";
import CartPersistence from "@/redux/CartPersistence";
import { Provider } from "react-redux";
// Adjust path to your store file

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
}
