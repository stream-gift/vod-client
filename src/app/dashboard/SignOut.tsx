"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export default function SignOut({ className }: { className?: string }) {
  return (
    <IoLogOutOutline
      onClick={() => signOut()}
      className={cn("cursor-pointer", className)}
    />
  );
}
