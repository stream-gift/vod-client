"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaTwitch } from "react-icons/fa";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SiKick } from "react-icons/si";

export default function LoginTwitch() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    await signIn("twitch");
  };

  return (
    <Button
      onClick={login}
      className="bg-[#00e701] hover:bg-[#00e701]/90 text-black"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <SiKick className="h-3 w-3 mr-2" />
      )}
      Login with Kick
    </Button>
  );
}
