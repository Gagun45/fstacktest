"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import { useCheckout } from "@/features/orders/hooks/mutations/use-checkout";
import CheckoutCustomerInfoForm from "@/forms/checkout/CheckoutCustomerInfoForm";
import { frontendUrls } from "@/lib/frontendUrls";
import { useAppDispatch, useAppSelector } from "@/redux";
import { clearCart } from "@/redux/slices/cart-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerInfoSchema, ICustomerInfoDto } from "@repo/shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CheckoutItemsList from "./list/CheckoutItemsList";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Checkout = () => {
  const { items, totalAmount } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const { data: user } = useMe();
  const router = useRouter();
  const { mutate, isPending } = useCheckout();

  const form = useForm<ICustomerInfoDto>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      shippingCountry: "",
      shippingAddress1: "",
      shippingCity: "",
      shippingAddress2: "",
      shippingNote: "",
      shippingPostalCode: "",
    },
  });
  useEffect(() => {
    if (!user) return;

    form.reset({
      ...form.getValues(),
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
  }, [user, form]);

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
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>

        <p className="text-muted-foreground">
          Add some products before proceeding to checkout.
        </p>

        <Link href={frontendUrls.products.all} className={buttonVariants()}>
          Continue shopping
        </Link>
      </div>
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
          onSubmit={onSubmit}
          form={form}
          onReset={() => form.reset()}
          isPending={isPending}
        />
      </section>
    </div>
  );
};

export default Checkout;
