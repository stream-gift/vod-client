export interface IVod {
  id: number;
  userid: string;
  src: string;
  name: string;
  hash: string;
  thumb: string | null;
  gif: string | null;
  duration: string | null;
  thetaid: string | null;
  player: string | null;
  progress: string | null;
  status:
    | "downloading"
    | "downloaded"
    | "processed"
    | "uploading"
    | "completed"
    | "failed";
  access: "public" | "private";
  views: number;
  createdAt: string;
  updatedAt: string;
}
