"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaTwitch } from "react-icons/fa";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginTwitch() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    await signIn("twitch");
  };

  return (
    <Button
      onClick={login}
      className="bg-[#9146FF] hover:bg-[#9146FF]/90 text-white z-50"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <FaTwitch className="h-4 w-4 mr-2" />
      )}
      Login with Twitch
    </Button>
  );
}
