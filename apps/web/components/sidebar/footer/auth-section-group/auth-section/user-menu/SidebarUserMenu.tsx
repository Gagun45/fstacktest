import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { User } from "@repo/shared";
import Link from "next/link";

interface Props {
  user: User;
}

const SidebarUserMenu = ({ user }: Props) => {
  const { mutate } = useLogout();

  const avatarSrc = user.avatar || "/default-avatar.png";
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-4 w-full">
          <Avatar>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <span>{user.username}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => mutate()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export default SidebarUserMenu;
