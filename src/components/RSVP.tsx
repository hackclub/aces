"use client"

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RSVP() {
  const { data, error } = useSWR("/api/rsvp", fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
  });

  if (error) return <span className="font-bold text-rose-300">error!</span>;
  if (!data || data.count === -1) return <span className="font-bold animate-pulse ">...</span>

  return <span className="font-bold">{data.count}</span>
}