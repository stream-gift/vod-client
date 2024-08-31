"use server";

import { authOptions } from "@/lib/auth-options";
import { IVod } from "@/types/vod.type";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export async function GetUserVods(): Promise<IVod[]> {
  const _cookies = cookies();

  const session = await getServerSession(authOptions);
  const userId = `twitch:${session?.user?.name}`;

  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos?userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let vods = data.data.rows;

            // Filter out failed vods
            vods = vods.filter((vod: IVod) => vod.status !== "failed");

            // Sort vods by createdAt in descending order
            vods = vods.sort(
              (a: IVod, b: IVod) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            return resolve(vods);
          } else {
            return reject(data.message);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function GetUserPublicVods(
  userId: string,
  sort: "random" | "date",
  limit: number = 5
): Promise<IVod[]> {
  const _cookies = cookies();

  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos?userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let vods = data.data.rows;

            vods = vods.filter((vod: IVod) => vod.status === "completed");
            vods = vods.filter((vod: IVod) => vod.access === "public");

            if (sort === "date") {
              vods = vods.sort(
                (a: IVod, b: IVod) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
            } else {
              vods = vods.sort(() => Math.random() - 0.5);
            }

            vods = vods.slice(0, limit);

            return resolve(vods);
          } else {
            return reject(data.message);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function GetVodStatus(hash: string): Promise<IVod> {
  const _cookies = cookies();

  const session = await getServerSession(authOptions);
  const userId = `twitch:${session?.user?.name}`;

  return new Promise((resolve, reject) => {
    try {
      fetch(
        `${process.env.VOD_URL}/api/videos/status?hash=${hash}&userid=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-vod-api-key": process.env.VOD_API_KEY!,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return resolve(data.data.video);
          } else {
            return reject(data.message);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function CreateNewVod(
  url: string,
  name: string,
  access: string
): Promise<string> {
  const session = await getServerSession(authOptions);
  const userId = `twitch:${session?.user?.name}`;

  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
        body: JSON.stringify({
          url,
          name,
          access,
          userid: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return resolve(data.data.hash);
          } else {
            return reject(data.message);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function AddVideoView(hash: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
        body: JSON.stringify({ hash }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return resolve();
          } else {
            return reject(data.error);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function UpdateUserVideo(
  hash: string,
  update: { access?: string; name?: string }
): Promise<void> {
  const session = await getServerSession(authOptions);
  const userId = `twitch:${session?.user?.name}`;

  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
        body: JSON.stringify({ hash, userid: userId, update }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return resolve();
          } else {
            return reject(data.error);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function DeleteUserVideo(hash: string): Promise<void> {
  const session = await getServerSession(authOptions);
  const userId = `twitch:${session?.user?.name}`;

  return new Promise((resolve, reject) => {
    try {
      fetch(`${process.env.VOD_URL}/api/videos/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-vod-api-key": process.env.VOD_API_KEY!,
        },
        body: JSON.stringify({ hash, userid: userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return resolve();
          } else {
            return reject(data.error);
          }
        });
    } catch (error) {
      return reject(error);
    }
  });
}
