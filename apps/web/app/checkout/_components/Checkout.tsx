"use client";

import { useAppDispatch, useAppSelector } from "@/redux";
import CheckoutItemsList from "./list/CheckoutItemsList";
import { useForm } from "react-hook-form";
import {
  customerInfoSchema,
  ICheckoutDto,
  ICustomerInfoDto,
} from "@repo/shared";
import { useCheckout } from "@/features/orders/hooks/mutations/use-checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutCustomerInfoForm from "@/forms/checkout/CheckoutCustomerInfoForm";
import { toast } from "sonner";
import { clearCart } from "@/redux/slices/cart-slice";
import { useRouter } from "next/navigation";
import { frontendUrls } from "@/lib/frontendUrls";
import { useMe } from "@/features/auth/hooks/useMe";
import { useEffect } from "react";

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
  if (items.length === 0) return <p>No items in cart</p>;
  return (
    <>
      <CheckoutItemsList items={items} />
      <p>Total: {totalAmount}</p>
      <CheckoutCustomerInfoForm
        onSubmit={onSubmit}
        form={form}
        onReset={() => form.reset()}
        isPending={isPending}
      />
    </>
  );
};

export default Checkout;
