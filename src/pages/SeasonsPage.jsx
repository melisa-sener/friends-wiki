import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import StatusView from '../components/StatusView.jsx'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchFriendsEpisodes,
  fetchFriendsSeasons,
  formatLongDate,
  getImageUrl,
} from '../services/tvmaze.js'

function SeasonsPage() {
  const { data, loading, error } = useAsyncData(async () => {
    const [seasons, episodes] = await Promise.all([
      fetchFriendsSeasons(),
      fetchFriendsEpisodes(),
    ])

    return { seasons, episodes }
  }, 'friends-seasons')

  const seasons = data?.seasons ?? []

  return (
    <div>
      <PageHeader
        eyebrow="Season Guide"
        title="All seasons"
        description="Even though seasons are not in the main navigation anymore, this page still matches the new Friends design system and links cleanly into the episode guide."
      />

      <StatusView
        loading={loading}
        error={error}
        hasData={Boolean(seasons.length)}
        emptyMessage="No seasons were returned from the API."
      />

      {seasons.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seasons.map((season) => (
            <article
              key={season.id}
              className="group overflow-hidden rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] shadow-[0_18px_48px_rgba(88,66,46,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(88,66,46,0.12)]"
            >
              <div className="aspect-[4/3] bg-[#F1E3D3] p-4">
                <img
                  src={getImageUrl(season.image, 'original') || getImageUrl(season.image)}
                  alt={`Friends season ${season.number}`}
                  className="h-full w-full rounded-[1.2rem] object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#8E6C88]">
                      Season {season.number}
                    </p>
                    <h3 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-2xl tracking-[-0.04em] text-[#3E3128]">
                      {season.premiereDate?.slice(0, 4)} - {season.endDate?.slice(0, 4)}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#FFF1E4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#3E3128]">
                    {season.episodeOrder} eps
                  </span>
                </div>

                <dl className="mt-6 space-y-3 text-sm text-[#6B5B52]">
                  <div className="flex justify-between gap-4">
                    <dt>Premiere</dt>
                    <dd>{formatLongDate(season.premiereDate)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>End date</dt>
                    <dd>{formatLongDate(season.endDate)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Top episode count</dt>
                    <dd>
                      {
                        data.episodes.filter((episode) => episode.season === season.number)
                          .length
                      }
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/seasons/${season.id}`}
                    className="rounded-full bg-[#556B5D] px-4 py-2 text-sm font-semibold text-[#FFFAF3] transition hover:-translate-y-0.5"
                  >
                    Open season page
                  </Link>
                  <Link
                    to={`/episodes?season=${season.number}`}
                    className="rounded-full bg-[#FFF1E4] px-4 py-2 text-sm font-semibold text-[#3E3128] transition hover:-translate-y-0.5"
                  >
                    Filter episodes
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default SeasonsPage
