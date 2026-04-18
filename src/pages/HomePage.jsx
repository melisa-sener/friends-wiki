import { Link } from 'react-router-dom'
import StatusView from '../components/StatusView.jsx'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchFriendsEpisodes,
  fetchFriendsSeasons,
  fetchFriendsShow,
  formatRating,
  getImageUrl,
  stripHtml,
} from '../services/tvmaze.js'

function HomePage() {
  const { data, loading, error } = useAsyncData(async () => {
    const [show, seasons, episodes] = await Promise.all([
      fetchFriendsShow(),
      fetchFriendsSeasons(),
      fetchFriendsEpisodes(),
    ])
    return { show, seasons, episodes }
  }, 'friends-home')

  return (
    <div>
      {/* Hero */}
      <section className="mb-10 overflow-hidden rounded-4xl bg-[linear-gradient(145deg,#FDF8F2_0%,#EDD9C4_100%)] px-8 py-12 shadow-[0_12px_40px_rgba(88,66,46,0.07)] sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-center">
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#8E6C88]">
              The Friends Universe
            </p>
            <h1 className="font-editorial text-[3.4rem] leading-[1.06] tracking-[-0.03em] text-[#3E3128] sm:text-[4.5rem] lg:text-[5.2rem]">
              Welcome<br />to Central<br />Perk.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#6B5B52]">
              A warm guide to the Friends universe. Browse the characters, episodes, and iconic places that made the show feel like home.
            </p>
          </div>

          {/* Cover image or skeleton */}
          {data ? (
            <div className="hidden overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(88,66,46,0.22)] lg:block">
              <img
                src={getImageUrl(data.show.image, 'original') || getImageUrl(data.show.image)}
                alt="Friends"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="hidden h-80 animate-pulse rounded-3xl bg-[#D8C9BA]/40 lg:block" />
          )}
        </div>
      </section>

      <StatusView loading={loading} error={error} hasData={Boolean(data)} />

      {data ? (
        <div className="space-y-8">
          {/* About the show */}
          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="rounded-4xl border border-[#E8DCCF] bg-[linear-gradient(145deg,#FFF9F2_0%,#F6EBDD_100%)] p-7 shadow-[0_18px_48px_rgba(88,66,46,0.07)] sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8E6C88]">
                About the show
              </p>
              <h2 className="mt-4 font-editorial text-3xl tracking-[-0.03em] text-[#3E3128] sm:text-4xl">
                Six friends. One couch. Ten unforgettable years.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B5B52]">
                {stripHtml(data.show.summary)}
              </p>
            </article>

            <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: 'Seasons', value: data.seasons.length, color: '#8E6C88' },
                { label: 'Episodes', value: data.episodes.length, color: '#D6A54B' },
                { label: 'TVmaze rating', value: formatRating(data.show.rating.average), color: '#556B5D' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_10px_28px_rgba(88,66,46,0.06)]"
                >
                  <span
                    className="mb-3 block h-1 w-8 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs font-medium text-[#6B5B52]">{item.label}</p>
                  <p className="mt-1.5 font-editorial text-4xl tracking-[-0.04em] text-[#3E3128]">
                    {item.value}
                  </p>
                </div>
              ))}
            </aside>
          </section>

          {/* Explore section */}
          <section>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6B5B52]">
              Explore the wiki
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Characters',
                  text: 'Meet the six friends through curated profiles and a personality-based discovery filter.',
                  to: '/characters',
                  accent: '#8E6C88',
                  tag: 'Cast directory',
                },
                {
                  title: 'Episodes',
                  text: 'Browse all 236 episodes across ten seasons with search and season filtering.',
                  to: '/episodes',
                  accent: '#D6A54B',
                  tag: 'Episode guide',
                },
                {
                  title: 'Locations',
                  text: 'Step inside Central Perk and the apartments that gave the show its warmth.',
                  to: '/locations',
                  accent: '#B86B4B',
                  tag: 'Iconic spaces',
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_10px_28px_rgba(88,66,46,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(88,66,46,0.11)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="block h-1 w-8 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B5B52]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl tracking-[-0.02em] text-[#3E3128]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#6B5B52]">{item.text}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default HomePage
