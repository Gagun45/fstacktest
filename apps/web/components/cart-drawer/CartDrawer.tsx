import { useAppSelector } from "@/redux";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart/Cart";
import { useState } from "react";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useAppSelector((s) => s.cart);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCart className="size-5!" />
          <span>{totalItems}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Manage your items</SheetDescription>
        </SheetHeader>
        <Cart onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
