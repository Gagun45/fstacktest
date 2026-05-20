import { useAppDispatch, useAppSelector } from "@/redux";
import React from "react";
import CartItemsList from "./list/CartItemsList";
import Link from "next/link";
import { frontendUrls } from "@/lib/frontendUrls";
import { Button, buttonVariants } from "@/components/ui/button";
import { clearCart } from "@/redux/slices/cart-slice";

interface Props {
  onClose: () => void;
}

const Cart = ({ onClose }: Props) => {
  const { items, totalAmount } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const onClearCart = () => {
    dispatch(clearCart());
  };
  if (items.length === 0) return <p>Cart is empty</p>;
  return (
    <>
      <CartItemsList items={items} />
      <Button onClick={onClearCart} variant={"destructive"}>
        Clear cart
      </Button>
      <p>Total: {totalAmount}</p>
      <Link
        onClick={onClose}
        href={frontendUrls.orders.checkout}
        className={buttonVariants()}
      >
        Proceed to checkout
      </Link>
    </>
  );
};

export default Cart;
