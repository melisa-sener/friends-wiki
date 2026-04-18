import { Link } from 'react-router-dom'
import TagChip from './TagChip.jsx'

function EpisodeCard({ episode, compact = false }) {
  const seasonAbbr = episode.code?.slice(0, 3) ??
    `S${String(episode.season ?? 1).padStart(2, '0')}`

  return (
    <Link
      to={`/episodes/${episode.id}`}
      className="group flex gap-4 rounded-3xl border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_10px_28px_rgba(88,66,46,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(88,66,46,0.10)]"
    >
      <div className="flex shrink-0 flex-col items-center pt-0.5">
        <p className="font-editorial text-2xl leading-none tracking-tight text-[#3E3128]">
          {String(episode.number ?? 1).padStart(2, '0')}
        </p>
        {!compact ? (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8E6C88]">
            {seasonAbbr}
          </p>
        ) : null}
      </div>

      <div className="mt-1 self-stretch w-px bg-[#E8DCCF]" />

      <div className="min-w-0 flex-1">
        <h3 className="font-medium leading-snug text-[#3E3128] group-hover:text-[#5c3d28] transition-colors">
          {episode.name}
        </h3>
        {!compact && episode.snippet ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#6B5B52]">
            {episode.snippet}
          </p>
        ) : null}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {episode.airDate ? <TagChip>{episode.airDate}</TagChip> : null}
          {episode.runtimeLabel ? (
            <TagChip tone="mustard">{episode.runtimeLabel}</TagChip>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default EpisodeCard
