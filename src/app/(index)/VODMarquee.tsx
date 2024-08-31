import Marquee from "@/components/magicui/marquee";

import { cn } from "@/lib/utils";
import Image from "next/image";

const vods = [
  {
    hash: "1",
    img: "/images/lol.webp",
    title: "League of Legends",
    createdAt: "3 hours ago",
    duration: "12:34",
  },
  {
    hash: "2",
    img: "/images/cs2.jpg",
    title: "CS2",
    createdAt: "2 days ago",
    duration: "12:34",
  },
  {
    hash: "3",
    img: "/images/irl.webp",
    title: "IRL Stream",
    createdAt: "1 month ago",
    duration: "12:34",
  },
  {
    hash: "4",
    img: "/images/val.jpg",
    title: "Valorant",
    createdAt: "6 hours ago",
    duration: "12:34",
  },
  {
    hash: "5",
    img: "/images/ow.png",
    title: "Overwatch Playthrough",
    createdAt: "a week ago",
    duration: "12:34",
  },
  {
    hash: "6",
    img: "/images/gta.jpg",
    title: "GTA",
    createdAt: "20 minutes ago",
    duration: "12:34",
  },
];

const firstRow = vods.slice(0, vods.length / 2);
const secondRow = vods.slice(vods.length / 2);

const VodCard = ({
  img,
  title,
  createdAt,
  duration,
}: {
  img: string;
  title: string;
  createdAt: string;
  duration: string;
}) => {
  return (
    <figure className={cn("relative w-48 mr-4")}>
      <div className="relative w-full aspect-video duration-300">
        <Image
          src={img}
          alt={title}
          width={192}
          height={108}
          className="w-full rounded-lg border border-gray-800 shadow-md object-cover"
        />

        <div className="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.75)] rounded-md px-2 py-1 text-xs">
          <p className="text-white">{duration}</p>
        </div>
      </div>

      <div className="mt-1 flex justify-between items-start">
        <div>
          <p className="text-md font-medium">{title}</p>
          <small className="text-gray-400 flex items-center gap-1.5 text-xs">
            <span>{1234} views</span>
            <span>&bull;</span>
            <span>{createdAt}</span>
          </small>
        </div>
      </div>
    </figure>
  );
};

export function VODMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Marquee className="[--duration:20s]">
        {firstRow.map((vod) => (
          <VodCard key={vod.hash} {...vod} />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s] mt-3">
        {secondRow.map((vod) => (
          <VodCard key={vod.hash} {...vod} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
