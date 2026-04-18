import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatusView from '../components/StatusView.jsx'
import TagChip from '../components/TagChip.jsx'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchEpisodeById,
  fetchFriendsEpisodes,
  formatEpisodeCode,
  formatLongDate,
  formatRating,
  getImageUrl,
  stripHtml,
} from '../services/tvmaze.js'

function EpisodeDetailPage() {
  const { episodeId } = useParams()
  const { data, loading, error } = useAsyncData(
    async () => {
      const [episode, episodes] = await Promise.all([
        fetchEpisodeById(episodeId),
        fetchFriendsEpisodes(),
      ])

      const currentIndex = episodes.findIndex(
        (candidate) => String(candidate.id) === String(episodeId),
      )

      return {
        episode,
        previousEpisode: currentIndex > 0 ? episodes[currentIndex - 1] : null,
        nextEpisode:
          currentIndex >= 0 && currentIndex < episodes.length - 1
            ? episodes[currentIndex + 1]
            : null,
      }
    },
    episodeId,
  )
  const episode = data?.episode

  return (
    <div>
      <PageHeader
        eyebrow="Episode Detail"
        title={episode ? episode.name : 'Episode details'}
        description={episode ? `Season ${episode.season}, Episode ${episode.number}` : 'Loading episode details...'}
      >
        <Link
          to="/episodes"
          className="rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-5 py-3 text-sm font-medium text-[#3E3128] transition hover:-translate-y-0.5 hover:bg-[#F1E3D3]"
        >
          ← All episodes
        </Link>
      </PageHeader>

      <StatusView loading={loading} error={error} hasData={Boolean(episode)} />

      {episode ? (
        <div className="space-y-6">
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="overflow-hidden rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] shadow-[0_16px_44px_rgba(88,66,46,0.08)]">
              <div className="aspect-video bg-[linear-gradient(145deg,#F5E8D8,#EDD9C4)] p-4">
                <img
                  src={getImageUrl(episode.image, 'original') || getImageUrl(episode.image)}
                  alt={episode.name}
                  className="h-full w-full rounded-[1.35rem] object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <TagChip tone="mustard">
                    {formatEpisodeCode(episode.season, episode.number)}
                  </TagChip>
                  {episode.rating?.average ? (
                    <TagChip tone="purple">{formatRating(episode.rating.average)}</TagChip>
                  ) : null}
                </div>
                <h3 className="mt-4 font-editorial text-3xl tracking-[-0.03em] text-[#3E3128]">
                  {episode.name}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#6B5B52]">
                  {stripHtml(episode.summary) || 'No summary available for this episode.'}
                </p>
              </div>
            </article>

            <aside className="rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_16px_44px_rgba(88,66,46,0.08)]">
              <SectionTitle title="Episode details" />
              <dl className="space-y-4 text-sm text-[#6B5B52]">
                <MetaRow label="Air date" value={formatLongDate(episode.airdate)} />
                <MetaRow label="Runtime" value={`${episode.runtime ?? 'Unknown'} min`} />
                <MetaRow label="Rating" value={formatRating(episode.rating?.average)} />
                <MetaRow label="TVmaze ID" value={episode.id} />
              </dl>
            </aside>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {data.previousEpisode ? (
              <Link
                to={`/episodes/${data.previousEpisode.id}`}
                className="rounded-[1.6rem] border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_10px_28px_rgba(88,66,46,0.07)] transition hover:-translate-y-1"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8E6C88]">
                  Previous episode
                </p>
                <p className="mt-3 font-editorial text-xl text-[#3E3128]">
                  {data.previousEpisode.name}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-[#D6C7B7] p-5 text-sm text-[#6B5B52]">
                First episode in the series.
              </div>
            )}

            {data.nextEpisode ? (
              <Link
                to={`/episodes/${data.nextEpisode.id}`}
                className="rounded-[1.6rem] border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_10px_28px_rgba(88,66,46,0.07)] transition hover:-translate-y-1"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8E6C88]">
                  Next episode
                </p>
                <p className="mt-3 font-editorial text-xl text-[#3E3128]">
                  {data.nextEpisode.name}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-[#D6C7B7] p-5 text-sm text-[#6B5B52]">
                Last episode in the series.
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  )
}

function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#F0E4D8] pb-3 last:border-b-0 last:pb-0">
      <dt>{label}</dt>
      <dd className="text-right text-[#3E3128]">{value}</dd>
    </div>
  )
}

export default EpisodeDetailPage
