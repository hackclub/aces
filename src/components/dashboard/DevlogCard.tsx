import Image from "next/image";

export type Devlog = {
  id: number;
  user_id: number;
  project_id: number;
  content: string;
  media_url: string;
  created_at: string;
  updated_at: string | null;
  hours_snapshot: number;
  cards_awarded: number;
  state: number;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DevlogCard({ devlog }: { devlog: Devlog }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <span className="text-sm text-gray-500">
        {formatDate(devlog.created_at)}
      </span>
      <p className="text-gray-800 mt-2">{devlog.content}</p>
      {devlog.media_url && (
        <Image
          src={devlog.media_url}
          alt="Devlog media"
          width={600}
          height={400}
          className="mt-3 rounded-lg w-full h-auto object-cover"
        />
      )}
    </div>
  );
}
