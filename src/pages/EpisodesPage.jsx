import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EpisodeCard from '../components/EpisodeCard.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatusView from '../components/StatusView.jsx'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchFriendsEpisodes,
  formatEpisodeCode,
  formatShortDate,
  truncateText,
} from '../services/tvmaze.js'

function EpisodesPage() {
  const { data: episodes, loading, error } = useAsyncData(
    fetchFriendsEpisodes,
    'friends-episodes',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') ?? ''
  const seasonFilter = searchParams.get('season') ?? 'all'
  const [visibleCount, setVisibleCount] = useState(18)

  function updateParam(key, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (!value || value === 'all') {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }

    setVisibleCount(18)
    setSearchParams(nextParams, { replace: true })
  }

  const seasonOptions = Array.from(
    new Set((episodes ?? []).map((episode) => String(episode.season))),
  )

  const filteredEpisodes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return (episodes ?? [])
      .filter((episode) => {
        const matchesSeason =
          seasonFilter === 'all' || String(episode.season) === seasonFilter
        const matchesQuery =
          !normalizedQuery || episode.name.toLowerCase().includes(normalizedQuery)

        return matchesSeason && matchesQuery
      })
      .map((episode) => ({
        ...episode,
        code: formatEpisodeCode(episode.season, episode.number),
        runtimeLabel: `${episode.runtime ?? 'N/A'} min`,
        airDate: formatShortDate(episode.airdate),
        seasonLabel: `Season ${episode.season}`,
        snippet: truncateText(episode.summary, 130),
      }))
  }, [episodes, searchQuery, seasonFilter])

  const visibleEpisodes = filteredEpisodes.slice(0, visibleCount)

  return (
    <div>
      <PageHeader
        eyebrow="Episode Guide"
        title="Explore iconic episodes"
        description="All 236 episodes across ten seasons — search by title or filter by season to find what you're looking for."
        descriptionClassName="max-w-none lg:whitespace-nowrap"
      />

      <StatusView
        loading={loading}
        error={error}
        hasData={Boolean(episodes?.length)}
        emptyMessage="No episodes were returned from the API."
      />

      {episodes?.length ? (
        <div className="space-y-6">
          <FilterPanel
            title="Search episodes"
            description="Look up an episode title or narrow the list by season."
          >
            <div className="grid gap-4 md:grid-cols-[1.35fr_240px]">
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B52]">
                Search by title
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => updateParam('q', event.target.value)}
                  placeholder="Try The One With..."
                  className="rounded-2xl border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#3E3128] outline-none transition focus:border-[#8E6C88]"
                />
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B52]">
                Season
                <select
                  value={seasonFilter}
                  onChange={(event) => updateParam('season', event.target.value)}
                  className="rounded-2xl border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#3E3128] outline-none transition focus:border-[#8E6C88]"
                >
                  <option value="all">All seasons</option>
                  {seasonOptions.map((season) => (
                    <option key={season} value={season}>
                      Season {season}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </FilterPanel>

          <section className="rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_14px_40px_rgba(88,66,46,0.07)]">
            <SectionTitle
              eyebrow="Episode directory"
              title="All episodes"
              description={`Showing ${filteredEpisodes.length} of ${episodes.length} episodes.`}
            />

            <div className="grid gap-4 md:grid-cols-2">
              {visibleEpisodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>

            {visibleEpisodes.length < filteredEpisodes.length ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + 18)}
                  className="rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-5 py-3 text-sm font-medium text-[#3E3128] transition hover:-translate-y-0.5 hover:bg-[#F1E3D3]"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default EpisodesPage
