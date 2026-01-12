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

enum DevlogState {
  PUBLISHED = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  OTHER = 3,
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusBadge(state: number, cardsAwarded: number) {
  switch (state) {
    case DevlogState.PUBLISHED:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Pending Review
        </span>
      );
    case DevlogState.ACCEPTED:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Approved • {cardsAwarded} cards
        </span>
      );
    case DevlogState.REJECTED:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Rejected
        </span>
      );
    case DevlogState.OTHER:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Under Review
        </span>
      );
    default:
      return null;
  }
}

export default function DevlogCard({ devlog }: { devlog: Devlog }) {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-semibold text-gray-500">
            {formatDate(devlog.created_at)}
          </span>
          {getStatusBadge(devlog.state, devlog.cards_awarded)}
        </div>
        
        <p className="text-gray-900 leading-relaxed mb-5 font-medium text-lg">{devlog.content}</p>
        
        {devlog.media_url && (
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-md bg-gray-50 flex items-center justify-center" style={{ height: '256px' }}>
            <Image
              src={devlog.media_url}
              alt="Cash Out media"
              width={256}
              height={256}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        
        <div className="mt-5 pt-4 border-t-2 border-gray-100 text-sm font-semibold text-gray-600">
          {devlog.hours_snapshot.toFixed(1)} hours logged
        </div>
      </div>
    </div>
  );
}
