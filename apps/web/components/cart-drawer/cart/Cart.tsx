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
  if (items.length === 0) {
    return (
      <div className="flex flex-1 text-2xl items-center justify-center text-muted-foreground">
        Your cart is empty
      </div>
    );
  }
  return (
    <div className="mt-6 flex min-h-0 flex-1 flex-col">
      {/* Items */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <CartItemsList items={items} />
      </div>

      {/* Footer */}
      <div className="mt-4 border-t p-4">
        <div className="mb-4 flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onClearCart}
          >
            Clear
          </Button>

          <Link
            href={frontendUrls.orders.checkout}
            onClick={onClose}
            className={buttonVariants({
              className: "flex-1",
            })}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
