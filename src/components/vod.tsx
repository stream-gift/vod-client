/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import { IVod } from "@/types/vod.type";
import { Button } from "./ui/button";
import {
  TbCopy,
  TbDotsVertical,
  TbEdit,
  TbExternalLink,
  TbLink,
  TbLoader2,
  TbTrash,
} from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AnimatedCircularProgressBar from "./magicui/animated-circular-progress-bar";
import { BorderBeam } from "./magicui/border-beam";
import TimeAgo from "./timeago";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import EditVOD from "@/app/dashboard/EditVOD";
import { DeleteUserVideo } from "@/actions/vod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function DeleteVOD({
  deleteVod: vod,
  open,
  setOpen,
}: {
  deleteVod: IVod;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await DeleteUserVideo(vod.hash);
    setIsLoading(false);
    toast.success("VOD deleted successfully.");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-indigo-950">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this VOD?</DialogTitle>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && (
                <TbLoader2 className="size-4 animate-spin mr-1.5" />
              )}
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function Vod({
  vod,
  isInFeed = false,
}: {
  vod: IVod;
  isInFeed?: boolean;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/clips/${vod.hash}`
    );
    toast.success("VOD URL copied to clipboard.");
  };

  return (
    <>
      <DeleteVOD deleteVod={vod} open={deleteOpen} setOpen={setDeleteOpen} />
      <EditVOD editVod={vod} open={editOpen} setOpen={setEditOpen} />

      <div key={vod.id}>
        <div className="relative w-full aspect-video cursor-pointer hover:scale-[1.03] transition-all duration-300">
          {vod.thumb && (
            <Link
              href={`${
                vod.status === "completed" ? `/clips/${vod.hash}` : "#"
              }`}
              target="_blank"
            >
              <img
                src={`/assets/vod${vod.thumb}`}
                alt={vod.name}
                className="w-full rounded-lg border border-gray-800 shadow-md"
                id={`vod-${vod.hash}`}
                onMouseEnter={() => {
                  const elem = document.querySelector(`#vod-${vod.hash}`) as
                    | HTMLImageElement
                    | undefined;
                  if (elem) {
                    elem.src = `/assets/vod${vod.gif}`;
                  }
                }}
                onMouseLeave={() => {
                  const elem = document.querySelector(`#vod-${vod.hash}`) as
                    | HTMLImageElement
                    | undefined;
                  if (elem) {
                    elem.src = `/assets/vod${vod.thumb}`;
                  }
                }}
              />
            </Link>
          )}

          {vod.status === "uploading" && (
            <div className="absolute z-50 w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.80)] rounded-md flex flex-col items-center justify-center">
              <AnimatedCircularProgressBar
                className="mb-1.5"
                max={100}
                min={0}
                value={parseInt(vod.progress || "0")}
                gaugePrimaryColor="rgb(79 70 229)"
                gaugeSecondaryColor="rgb(79 70 100)"
              />
              <p className="text-white font-medium">Uploading</p>
            </div>
          )}

          {(vod.status === "downloading" ||
            vod.status === "downloaded" ||
            vod.status === "processed") && (
            <>
              <div className="relative z-50 w-full h-full top-0 left-0 rounded-md flex flex-col bg-black/50 items-center justify-center">
                <p className="text-white font-medium">Downloading</p>
                <BorderBeam
                  size={250}
                  duration={12}
                  delay={9}
                  colorFrom="#9146FF"
                  colorTo="#000000"
                />
              </div>
            </>
          )}

          {vod.duration && (
            <div className="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.75)] rounded-md px-2 py-1 text-xs">
              <p className="text-white">
                {vod.duration.startsWith("00:")
                  ? vod.duration.replace("00:", "")
                  : vod.duration}
              </p>
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-between items-start">
          <div>
            <p className="text-xl font-medium">{vod.name}</p>
            <small className="text-gray-400 flex items-center gap-1.5">
              {!isInFeed && (
                <>
                  <span>{vod.access === "public" ? "Public" : "Private"}</span>
                  <span>&bull;</span>
                </>
              )}
              <span>{vod.views} views</span>
              <span>&bull;</span>
              <span>
                <TimeAgo date={vod.createdAt} />
              </span>
            </small>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "px-1 py-1 h-auto rounded-full hover:bg-indigo-600/50",
                  isInFeed && "hidden"
                )}
              >
                <TbDotsVertical className="w-auto h-6 lg:h-5 p-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56 text-lg" align="end">
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <TbEdit className="size-4 mr-1.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyUrl}>
                <TbLink className="size-4 mr-1.5" />
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm text-red-500 focus:text-red-500"
                onClick={() => setDeleteOpen(true)}
                disabled={vod.status !== "completed"}
              >
                <TbTrash className="size-4 mr-1.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
