import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";

import LoginButton from "./LoginTwitch";
import { redirect } from "next/navigation";

import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";

import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import LoginTwitch from "./LoginTwitch";
import LoginKick from "./LoginKick";
import { MagicCard } from "@/components/magicui/magic-card";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center h-full flex-1 bg-indigo-900">
        <GridPattern
          width={95}
          height={95}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,rgba(255,255,255,0.5),rgba(255,255,255,0.5))] "
          )}
        />

        <div className="grid grid-cols-1 w-full h-full">
          <div className="h-full flex flex-col justify-center items-center text-center lg:p-20 lg:space-y-5">
            <div className="flex items-center">
              <Image
                src="https://www.stream.gift/images/logo.svg"
                alt="stream.gift logo"
                width={40}
                height={40}
              />

              <h1 className="text-2xl font-normal ml-3">vodsaver</h1>
            </div>

            <h1 className="text-4xl text-5xl font-semibold leading-tight">
              Save your live streams and VODs indefinitely
            </h1>

            <p className="text-lg text-white/80 font-normal">
              vodsaver is a free tool, powered by{" "}
              <a
                href="https://stream.gift?utm_source=vod-saver&utm_medium=homepage"
                target="_blank"
              >
                <Image
                  src="https://www.stream.gift/images/logo.svg"
                  alt="stream.gift logo"
                  width={16}
                  height={16}
                  className="inline-block mr-1"
                />
                stream.gift
              </a>
              , to save your live streams{" "}
              <span className="underline underline-offset-2">forever</span> from
              Twitch, Kick and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
