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
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";
import AnimatedDownload from "./AnimatedDownload";
import Marquee from "@/components/magicui/marquee";
import Vod from "@/components/vod";
import TimeAgo from "@/components/timeago";
import vod from "@/components/vod";
import { Link } from "lucide-react";
import { VODMarquee } from "./VODMarquee";
import { TbDownload } from "react-icons/tb";
import Ripple from "@/components/magicui/ripple";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="https://stream.gift?utm_source=vod-saver&utm_medium=banner"
        target="_blank"
        className="py-2 bg-[#27cdd5] z-50 shadow-sm text-black w-full items-center justify-center text-center text-sm font-medium"
      >
        <div className="flex flex-row items-center justify-center tracking-normal">
          <Image
            src="https://www.stream.gift/images/logo.svg"
            alt="stream.gift logo"
            width={16}
            height={16}
            className="mr-1 filter invert"
          />
          stream.gift &mdash; accept crypto donations
        </div>
      </a>

      <div className="flex flex-col items-center justify-center h-full flex-1 bg-indigo-900">
        <GridPattern
          width={95}
          height={95}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,white,rgba(255,255,255,0.5),rgba(255,255,255,0.5),transparent,transparent)] "
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 w-full h-full">
          <div className="h-full justify-center items-center p-5 lg:p-20 space-y-4 lg:space-y-6">
            <div className="flex items-center">
              <Image
                src="https://www.stream.gift/images/logo.svg"
                alt="stream.gift logo"
                width={36}
                height={36}
              />

              <h1 className="text-2xl font-normal ml-3">vodsaver</h1>
            </div>

            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
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

            <div className="flex gap-4">
              <LoginTwitch />
              {/* <LoginKick /> */}
            </div>
          </div>

          <div className="h-full justify-center items-center p-5 lg:p-10 space-y-8 md:overflow-clip">
            <div className="relative">
              <MagicCard className="hidden lg:flex absolute -top-6 -left-10 size-20 z-50 rounded-full">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <AnimatedDownload />
                </div>
              </MagicCard>
              <div className="relative flex w-full p-1 rounded-xl bg-background shadow-lg">
                <div className="w-full py-3">
                  <VODMarquee />
                </div>
                <BorderBeam
                  size={250}
                  duration={12}
                  delay={9}
                  colorFrom="#4338ca"
                  colorTo="#000000"
                />
              </div>
              <MagicCard className="hidden lg:flex absolute -bottom-4 -right-3 size-20 z-50 rounded-full">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <TbDownload className="" strokeWidth={2.3} />
                </div>
                <Ripple
                  mainCircleSize={0.5}
                  mainCircleOpacity={0.24}
                  numCircles={5}
                />
              </MagicCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
