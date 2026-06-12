"use client";

import StateScreen from "@/components/general/StateScreen";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMe } from "@/features/auth/hooks/useMe";
import { useCheckout } from "@/features/orders/hooks/mutations/use-checkout";
import CheckoutCustomerInfoForm from "@/forms/checkout/CheckoutCustomerInfoForm";
import { frontendUrls } from "@/lib/frontendUrls";
import { useAppDispatch, useAppSelector } from "@/redux";
import { clearCart } from "@/redux/slices/cart-slice";
import { ICustomerInfoDto } from "@repo/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CheckoutItemsList from "./list/CheckoutItemsList";
import Loader from "@/components/general/Loader";

const Checkout = () => {
  const { items, totalAmount } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate, isPending } = useCheckout();
  const { data: me, isLoading, isError } = useMe();
  if (isLoading) return <Loader />;
  if (isError || !me)
    return (
      <StateScreen
        title="Failed to load user data"
        description="Try again later"
      />
    );

  const onSubmit = (values: ICustomerInfoDto) => {
    mutate(
      {
        customer: values,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      },
      {
        onSuccess: () => {
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          router.push(frontendUrls.orders.orders);
        },
        onError: (e) => {
          const msg = e.response?.data.message || "Something went wrong";
          toast.error(msg);
        },
      },
    );
  };
  if (items.length === 0) {
    return (
      <StateScreen
        title="Your cart is empty"
        description="Add some products before proceeding to checkout."
        action={
          <Button asChild>
            <Link href={frontendUrls.products.all} className={buttonVariants()}>
              Continue shopping
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-2 w-full">
      <aside className="order-1 xl:order-2 rounded-lg border p-4">
        <h2 className="font-semibold">Order summary</h2>

        <CheckoutItemsList items={items} />

        <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
      </aside>

      <section className="order-2 xl:order-1 flex justify-center">
        <CheckoutCustomerInfoForm
          user={me}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </section>
    </div>
  );
};

export default Checkout;
