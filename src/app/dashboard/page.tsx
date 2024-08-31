/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignOut from "./SignOut";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TbArrowRight,
  TbDownload,
  TbLogout,
  TbLogout2,
  TbPlus,
  TbVideo,
} from "react-icons/tb";
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { GetUserVods } from "@/actions/vod";
import Vod from "@/components/vod";
import Meteors from "@/components/magicui/meteors";
import Particles from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateVOD from "./CreateVOD";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard | vodsaver",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  // const vods: any[] = [];
  const vods = await GetUserVods();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 bg-indigo-700 text-white shadow-md">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="https://www.stream.gift/logo.svg"
              alt="stream.gift logo"
              width={24}
              height={24}
            />

            <h1 className="text-xl font-normal ml-2">vodsaver</h1>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={session.user.image!} />
              <AvatarFallback>
                {session.user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-md font-medium mr-2">{session.user.name}</div>

            <SignOut className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="bg-indigo-950 flex-1">
        <div className="container px-5 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 auto-rows-min gap-5">
            <div className="col-span-1 lg:col-span-5">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                  Your VODs {vods.length ? `[${vods.length}]` : ""}
                </h1>
                <CreateVOD />
              </div>
              <div className="w-full">
                <div
                  className={cn(
                    vods.length > 0
                      ? "hidden"
                      : "flex flex-col items-center justify-center py-20 px-8 border border-[#34325d] rounded-lg border-dashed"
                  )}
                >
                  <TbVideo className="w-10 h-10 mb-2" />
                  <p className="text-lg font-medium mb-1">Add your first VOD</p>
                  <p className="text-sm text-gray-400">
                    Save your VODs from Twitch, Kick, YouTube & more. Get
                    started by clicking the button above.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {vods.map((vod) => (
                    <Vod key={vod.id} vod={vod} />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1 h-fit">
              <Link
                href="https://stream.gift?utm_source=vodsaver&utm_medium=dashboard"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
