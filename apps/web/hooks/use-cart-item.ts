// use-cart-item.ts

import { useAppDispatch, useAppSelector } from "@/redux";
import { addToCart, removeFromCart } from "@/redux/slices/cart-slice";
import { IProductCard } from "@repo/shared";

export const useCartItem = (product: IProductCard) => {
  const dispatch = useAppDispatch();

  const isAdded = useAppSelector((s) =>
    s.cart.items.some((item) => item.id === product.id),
  );

  const toggleCart = () => {
    if (isAdded) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const add = () => dispatch(addToCart(product));
  const remove = () => dispatch(removeFromCart(product.id));

  return {
    isAdded,
    toggleCart,
    add,
    remove,
  };
};
