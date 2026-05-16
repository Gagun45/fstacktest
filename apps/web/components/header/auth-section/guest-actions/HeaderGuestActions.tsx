import { buttonVariants } from "@/components/ui/button";
import { frontendUrls } from "@/lib/frontendUrls";
import Link from "next/link";

const HeaderGuestActions = () => {
  return (
    <Link
      className={buttonVariants({
        variant: "default",
        className: "text-lg!",
      })}
      href={frontendUrls.auth.signIn}
    >
      Sign In
    </Link>
  );
};

export default HeaderGuestActions;
