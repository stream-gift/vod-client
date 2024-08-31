"use client";

import { CreateNewVod, UpdateUserVideo } from "@/actions/vod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IVod } from "@/types/vod.type";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbGlobe, TbLock, TbPlus, TbWorld } from "react-icons/tb";
import { toast } from "sonner";

export default function EditVOD({
  editVod: vod,
  open,
  setOpen,
}: {
  editVod: IVod;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState(vod.name);
  const [access, setAccess] = useState<string>(vod.access);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!name) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    await UpdateUserVideo(vod.hash, { name, access });
    toast.success("VOD updated successfully.");
    setIsLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-indigo-950">
        <DialogHeader>
          <DialogTitle>Edit VOD</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <Label>Name</Label>
              <Input
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <Label>Privacy</Label>
              <Tabs
                value={access}
                onValueChange={setAccess}
                className="mt-1.5 w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="public">
                    <TbWorld className="w-4 h-4 mr-1.5" />
                    Public
                  </TabsTrigger>
                  <TabsTrigger value="private">
                    <TbLock className="w-4 h-4 mr-1.5" />
                    Private
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button
              className="mt-5 w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />}
              Edit VOD
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
