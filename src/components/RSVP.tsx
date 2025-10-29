import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RSVP() {
  const { data, error } = useSWR("https://aces.femboyin.tech/count", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (error) return <span className="font-bold text-rose-300">error!</span>;
  if (!data) return <span className="font-bold animate-pulse ">...</span>

  return <span className="font-bold">{data.record_count}</span>
}