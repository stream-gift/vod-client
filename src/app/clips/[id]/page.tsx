/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useTimeAgo } from "next-timeago";
import { redirect, useParams, useRouter } from "next/navigation";
import {
  AddVideoView,
  GetUserPublicVods,
  GetUserVods,
  GetVodStatus,
} from "@/actions/vod";
import Link from "next/link";
import { IVod } from "@/types/vod.type";
import TimeAgo from "@/components/timeago";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import type { Metadata } from "next";
import { MagicCard } from "@/components/magicui/magic-card";
import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { TbArrowRight, TbSmartHome } from "react-icons/tb";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOut from "@/app/dashboard/SignOut";
import Vod from "@/components/vod";
import { GetStreamGiftUser } from "@/actions/stream-gift";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const vod = await GetVodStatus(params.id as string);

  if (!vod || vod.status !== "completed") {
    return redirect("/");
  }

  const session = await getServerSession(authOptions);

  if (vod.access === "private") {
    if (vod.userid !== `twitch:${session?.user?.name}`) {
      return redirect("/");
    }
  }

  return {
    title: `${vod.name} | vodsaver`,
  };
};

export default async function Clips({ params }: { params: { id: string } }) {
  const vod = await GetVodStatus(params.id as string);

  if (!vod || vod.status !== "completed") {
    return redirect("/");
  }

  const session = await getServerSession(authOptions);

  if (vod.access === "private") {
    if (vod.userid !== `twitch:${session?.user?.name}`) {
      return redirect("/");
    }
  }

  const userVods = await GetUserPublicVods(vod.userid, "random", 5).then(
    (vods) => vods.filter((userPublicVod) => userPublicVod.hash !== vod.hash)
  );

  const streamGiftUser = true;
  // await GetStreamGiftUser(
  //   vod.userid.replace("twitch:", "")
  // );

  await AddVideoView(vod.hash);

  return (
    <div className="bg-indigo-950 flex-1">
      <div className="container px-5 lg:px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={session?.user ? "/dashboard" : "/"}>
              <div className="flex items-center">
                <Image
                  src="https://www.stream.gift/logo.svg"
                  alt="stream.gift logo"
                  width={32}
                  height={32}
                />

                <h1 className="text-2xl font-normal ml-2">vodsaver</h1>
              </div>
            </Link>
          </div>

          {session?.user ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user.image!} />
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="text-lg font-medium mr-2">
                  {session.user.name}
                </div>

                <SignOut className="h-6 w-6" />
              </div>
            </>
          ) : (
            <>
              <Link href="/">
                <Button size="sm">Save VODs</Button>
              </Link>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 auto-rows-min gap-5">
          <div className="col-span-1 lg:col-span-5">
            <div className="sticky top-6">
              <div className="w-full rounded-lg overflow-hidden">
                <iframe
                  src={vod.player!}
                  className="w-full h-full aspect-video"
                />
              </div>

              <h1 className="text-4xl font-medium mt-6">{vod.name}</h1>
              <div className="mt-1 text-white flex items-center gap-3 text-lg">
                {vod.userid.replace("twitch:", "")}
                {!!streamGiftUser && (
                  <Link
                    href={`https://stream.gift/${vod.userid.replace(
                      "twitch:",
                      ""
                    )}`}
                    target="_blank"
                    className="flex items-center gap-1 text-[#27cdd5]"
                  >
                    <Image
                      src="https://stream.gift/logo.svg"
                      alt="stream.gift logo"
                      width={20}
                      height={20}
                      className="filter-blue"
                    />
                    {vod.userid.replace("twitch:", "")}
                  </Link>
                )}
              </div>
              <div className="mt-2 text-gray-400 flex items-center gap-1.5 text-md">
                {vod.access === "private" && (
                  <>
                    <span>Private</span>
                    <span>&bull;</span>
                  </>
                )}
                <span>{vod.views} views</span>
                <span>&bull;</span>
                <span>
                  <TimeAgo date={vod.createdAt} />
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1 h-fit">
            <Link
              href={`https://stream.gift?utm_source=vodsaver&utm_medium=vod&utm_campaign=${vod.hash}`}
              target="_blank"
            >
              <MagicCard className="relative w-full bg-black overflow-hidden rounded-lg border border-[#34325d] transition-all hover:border-[#27cdd5] cursor-pointer">
                <Particles
                  className="absolute inset-0 -z-50"
                  quantity={80}
                  ease={80}
                  color={"#ffffff"}
                  refresh
                />
                {/* <Meteors number={50} /> */}

                <div className="p-4 py-6 text-white flex flex-col items-start justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://stream.gift/logo.svg"
                      alt="stream.gift logo"
                      width={24}
                      height={24}
                    />
                    <p className="text-lg font-medium">stream.gift</p>
                  </div>

                  <div className="w-full">
                    <h1 className="text-xl font-semibold">
                      Get stream donations via crypto
                    </h1>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#27cdd5] hover:bg-[#27cdd5] text-black"
                  >
                    Get Started
                    <TbArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </MagicCard>
            </Link>

            <div className="mt-4">
              More VODs from {vod.userid.replace("twitch:", "")}
            </div>

            <div className="mt-4 flex flex-col gap-6">
              {userVods.map((vod) => (
                <Vod key={vod.hash} vod={vod} isInFeed />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
