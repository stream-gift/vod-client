"use client";

import { useTimeAgo } from "next-timeago";

export default function TimeAgo({ date }: { date: any }) {
  const { TimeAgo } = useTimeAgo();

  return <TimeAgo date={date} live={false} />;
}
