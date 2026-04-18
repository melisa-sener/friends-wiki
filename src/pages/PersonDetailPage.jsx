import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatusView from '../components/StatusView.jsx'
import TagChip from '../components/TagChip.jsx'
import { enrichCastEntry } from '../data/friendsProfiles.js'
import { useAsyncData } from '../hooks/useAsyncData.js'
import {
  fetchFriendsCast,
  fetchPersonById,
  formatLongDate,
  getImageUrl,
} from '../services/tvmaze.js'

function PersonDetailPage() {
  const { personId } = useParams()
  const { data, loading, error } = useAsyncData(
    async () => {
      const [person, cast] = await Promise.all([
        fetchPersonById(personId),
        fetchFriendsCast(),
      ])

      const enrichedCast = cast.map((entry) =>
        enrichCastEntry(
          entry,
          getImageUrl(entry.person.image, 'original') ||
            getImageUrl(entry.person.image) ||
            getImageUrl(entry.character.image),
        ),
      )
      const castEntry = enrichedCast.find(
        (entry) => String(entry.person.id) === String(personId),
      )

      return {
        person,
        castEntry: castEntry ?? null,
        relatedCharacters: enrichedCast.filter((entry) =>
          castEntry?.notableRelationships.includes(entry.characterName),
        ),
      }
    },
    personId,
  )
  const person = data?.person

  return (
    <div>
      <PageHeader
        eyebrow="Character Profile"
        title={data?.castEntry ? data.castEntry.characterName : person ? person.name : 'Character profile'}
        description={data?.castEntry?.shortDescription ?? 'Actor and character details from the Friends universe.'}
      >
        <Link
          to="/characters"
          className="rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-5 py-3 text-sm font-medium text-[#3E3128] transition hover:-translate-y-0.5 hover:bg-[#F1E3D3]"
        >
          ← All characters
        </Link>
      </PageHeader>

      <StatusView loading={loading} error={error} hasData={Boolean(person)} />

      {person ? (
        <div className="space-y-6">
          <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="overflow-hidden rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] shadow-[0_16px_44px_rgba(88,66,46,0.08)]">
              <div className="aspect-4/5 bg-[linear-gradient(145deg,#F5E8D8,#EDD9C4)] p-4">
                <img
                  src={
                    getImageUrl(data.castEntry?.character?.image, 'original') ||
                    getImageUrl(data.castEntry?.character?.image) ||
                    getImageUrl(person.image, 'original') ||
                    getImageUrl(person.image)
                  }
                  alt={person.name}
                  className="h-full w-full rounded-[1.35rem] object-cover object-[center_10%]"
                />
              </div>
            </aside>

            <article className="rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_16px_44px_rgba(88,66,46,0.08)] sm:p-8">
              <div className="flex flex-wrap gap-2">
                {data.castEntry?.job ? <TagChip tone="mustard">{data.castEntry.job}</TagChip> : null}
                {data.castEntry?.relationshipStatus ? (
                  <TagChip tone="terracotta">{data.castEntry.relationshipStatus}</TagChip>
                ) : null}
              </div>
              <h3 className="mt-5 font-editorial text-4xl tracking-[-0.03em] text-[#3E3128]">
                {data.castEntry ? data.castEntry.characterName : person.name}
              </h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8E6C88]">
                Played by {person.name}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B5B52]">
                {data.castEntry?.fullDescription ??
                  'Character details are pulled from the TVmaze API and enriched with curated profile data.'}
              </p>

              {data.castEntry?.personalityTags?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.castEntry.personalityTags.map((tag) => (
                    <TagChip key={tag} tone="purple">
                      {tag}
                    </TagChip>
                  ))}
                </div>
              ) : null}
            </article>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_12px_32px_rgba(88,66,46,0.07)]">
              <SectionTitle title="Character details" />
              <dl className="space-y-4 text-sm text-[#6B5B52]">
                <DetailRow label="Memorable trait" value={data.castEntry?.memorableTrait || 'Unknown'} />
                <DetailRow label="Friend group" value={data.castEntry?.bestFriendGroup || 'Unknown'} />
                <DetailRow label="Home base" value={data.castEntry?.apartment || 'Unknown'} />
              </dl>
            </article>

            <article className="rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_12px_32px_rgba(88,66,46,0.07)]">
              <SectionTitle title="Actor details" />
              <dl className="space-y-4 text-sm text-[#6B5B52]">
                <DetailRow label="Birthday" value={formatLongDate(person.birthday)} />
                <DetailRow label="Country" value={person.country?.name || 'Unknown'} />
                <DetailRow label="Gender" value={person.gender || 'Unknown'} />
              </dl>
            </article>

            <article className="rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_12px_32px_rgba(88,66,46,0.07)]">
              <SectionTitle title="Relationships" />
              <div className="flex flex-wrap gap-2">
                {(data.castEntry?.notableRelationships ?? []).length ? (
                  data.castEntry.notableRelationships.map((name) => (
                    <TagChip key={name}>{name}</TagChip>
                  ))
                ) : (
                  <p className="text-sm text-[#6B5B52]">No relationship data available.</p>
                )}
              </div>
            </article>
          </section>

          {data.relatedCharacters?.length ? (
            <section className="rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_14px_40px_rgba(88,66,46,0.07)]">
              <SectionTitle
                eyebrow="Related characters"
                title="Connected to this profile"
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.relatedCharacters.map((entry) => (
                  <Link
                    key={entry.person.id}
                    to={`/characters/${entry.person.id}`}
                    className="rounded-[1.4rem] border border-[#E8DCCF] bg-[#FFF7EE] p-4 transition hover:-translate-y-0.5 hover:bg-[#F1E3D3]"
                  >
                    <p className="font-medium text-[#3E3128]">{entry.characterName}</p>
                    <p className="mt-1 text-sm text-[#6B5B52]">{entry.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#F0E4D8] pb-3 last:border-b-0 last:pb-0">
      <dt>{label}</dt>
      <dd className="text-right text-[#3E3128]">{value}</dd>
    </div>
  )
}

export default PersonDetailPage
