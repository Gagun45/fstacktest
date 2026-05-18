import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { hydrateCart } from "./slices/cart-slice";

const CartPersistence = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  useEffect(() => {
    const savedCart = localStorage.getItem("app_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        dispatch(hydrateCart(parsed));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (cart.items.length > 0 || localStorage.getItem("app_cart")) {
      localStorage.setItem("app_cart", JSON.stringify(cart));
    }
  }, [cart]);
  return null;
};

export default CartPersistence;
