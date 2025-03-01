"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="w-6 h-6 mr-4 mt-4 animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none relative p-2 md:p-4">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="hidden sm:block">{session.user?.name}</span>
              <Avatar className="w-8 h-8 md:w-10 md:h-10 hover:opacity-75 transition">
                <AvatarImage
                  className="w-8 h-8 md:w-10 md:h-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="bg-white text-[#141e30] rounded shadow-lg w-32 py-2"
          >
            <DropdownMenuItem
              className="h-10 flex items-center justify-center hover:bg-gray-200"
              onClick={handleSignOut}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/sign-in"
            className="text-white bg-transparent border border-white px-2 py-1 md:px-4 md:py-2 rounded transition-colors duration-300 hover:bg-white hover:text-[#141e30] text-sm md:text-base"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-white bg-transparent border border-white px-2 py-1 md:px-4 md:py-2 rounded transition-colors duration-300 hover:bg-white hover:text-[#141e30] text-sm md:text-base"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
