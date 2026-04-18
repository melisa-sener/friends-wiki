import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import StatusView from '../components/StatusView.jsx'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchFriendsEpisodes,
  fetchFriendsSeasons,
  formatEpisodeCode,
  formatLongDate,
  formatRating,
  getImageUrl,
  truncateText,
} from '../services/tvmaze.js'

function SeasonDetailPage() {
  const { seasonId } = useParams()
  const { data, loading, error } = useAsyncData(async () => {
    const [seasons, episodes] = await Promise.all([
      fetchFriendsSeasons(),
      fetchFriendsEpisodes(),
    ])

    const season = seasons.find((entry) => String(entry.id) === String(seasonId))

    if (!season) {
      throw new Error('Season not found.')
    }

    return {
      season,
      seasonEpisodes: episodes.filter((episode) => episode.season === season.number),
    }
  }, seasonId)

  const season = data?.season
  const seasonEpisodes = data?.seasonEpisodes ?? []
  const topEpisode = [...seasonEpisodes].sort(
    (left, right) => (right.rating.average ?? 0) - (left.rating.average ?? 0),
  )[0]

  return (
    <div>
      <PageHeader
        eyebrow="Season Detail"
        title={season ? `Season ${season.number}` : 'Season details'}
        description="This extra page makes the wiki feel more complete and gives you a stronger set of routes for the assignment."
      >
        <Link
          to="/seasons"
          className="rounded-full bg-[#f4ecda] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
        >
          Back to seasons
        </Link>
      </PageHeader>

      <StatusView loading={loading} error={error} hasData={Boolean(season)} />

      {season ? (
        <div className="space-y-6">
          <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(60,37,10,0.08)]">
              <div className="aspect-[4/5] bg-[#e9d8b8]/45 p-4">
                <img
                  src={getImageUrl(season.image, 'original') || getImageUrl(season.image)}
                  alt={`Season ${season.number}`}
                  className="h-full w-full rounded-[1.35rem] object-cover"
                />
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(60,37,10,0.08)] sm:p-8">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-[#f4ecda] px-4 py-2 text-sm font-medium text-slate-700">
                  {season.episodeOrder} episodes
                </span>
                <span className="rounded-full bg-[#f4ecda] px-4 py-2 text-sm font-medium text-slate-700">
                  {formatLongDate(season.premiereDate)}
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                A closer look at Season {season.number}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                This season page groups the episodes together so your site reads more like a real guide instead of just one long master list. It also helps show stronger route structure in your React app.
              </p>
              {topEpisode ? (
                <div className="mt-6 rounded-[1.4rem] bg-[#fbf5ea] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Highest-rated episode in this season
                  </p>
                  <Link
                    to={`/episodes/${topEpisode.id}`}
                    className="mt-3 block text-xl font-semibold text-slate-900"
                  >
                    {topEpisode.name}
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {truncateText(topEpisode.summary, 130)}
                  </p>
                </div>
              ) : null}
            </article>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(60,37,10,0.08)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Episode list
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                  Every episode in this season
                </h3>
              </div>
              <Link
                to={`/episodes?season=${season.number}`}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Open filtered episode page
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {seasonEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  to={`/episodes/${episode.id}`}
                  className="rounded-[1.4rem] bg-[#fbf5ea] px-5 py-4 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {formatEpisodeCode(episode.season, episode.number)}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">
                        {episode.name}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-[0.2em] text-slate-700">
                      {formatRating(episode.rating.average)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {truncateText(episode.summary, 96)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default SeasonDetailPage
