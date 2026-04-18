import { useMemo, useState } from 'react'
import CharacterCard from '../components/CharacterCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import MatchResultCard from '../components/MatchResultCard.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatusView from '../components/StatusView.jsx'
import TagChip from '../components/TagChip.jsx'
import {
  enrichCastEntry,
  jobOptions,
  personalityOptions,
  relationshipOptions,
} from '../data/friendsProfiles.js'
import { useAsyncData } from '../hooks/useAsyncData.js'
import { fetchFriendsCast, getImageUrl } from '../services/tvmaze.js'

function CastPage() {
  const { data: cast, loading, error } = useAsyncData(
    fetchFriendsCast,
    'friends-cast',
  )
  const [selectedPersonality, setSelectedPersonality] = useState('')
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedRelationship, setSelectedRelationship] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const enrichedCast = useMemo(
    () =>
      (cast ?? []).map((entry) =>
        enrichCastEntry(
          entry,
          getImageUrl(entry.character.image, 'original') ||
            getImageUrl(entry.character.image) ||
            getImageUrl(entry.person.image, 'original') ||
            getImageUrl(entry.person.image),
        ),
      ),
    [cast],
  )

  const selectedCount = [
    selectedPersonality,
    selectedJob,
    selectedRelationship,
  ].filter(Boolean).length

  // match result — only used by the finder section, not by the grid
  const matchResult = useMemo(() => {
    return enrichedCast
      .map((entry) => {
        const score =
          (selectedPersonality && entry.personalityTags.includes(selectedPersonality) ? 1 : 0) +
          (selectedJob && entry.job === selectedJob ? 1 : 0) +
          (selectedRelationship && entry.relationshipStatus === selectedRelationship ? 1 : 0)
        return { ...entry, matchScore: score }
      })
      .filter(
        (entry) =>
          (!selectedPersonality || entry.personalityTags.includes(selectedPersonality)) &&
          (!selectedJob || entry.job === selectedJob) &&
          (!selectedRelationship || entry.relationshipStatus === selectedRelationship),
      )
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [enrichedCast, selectedPersonality, selectedJob, selectedRelationship])

  const bestMatch = selectedCount > 0 && matchResult.length ? matchResult[0] : null
  const visibleCast = enrichedCast.slice(0, visibleCount)

  function resetFilters() {
    setSelectedPersonality('')
    setSelectedJob('')
    setSelectedRelationship('')
  }

  return (
    <div>
      <section className="mb-8 overflow-hidden rounded-4xl border border-[#E8DCCF] bg-[linear-gradient(145deg,#FFFAF3_0%,#FFF4E8_100%)] shadow-[0_16px_48px_rgba(88,66,46,0.08)]">
        <div className="p-7 sm:p-9">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8E6C88]">
            Character Directory
          </p>
          <h2 className="font-editorial text-3xl tracking-[-0.03em] text-[#3E3128] sm:text-4xl lg:text-[2.8rem]">
            The Friends
          </h2>
          <p className="mt-3 text-base leading-7 text-[#6B5B52] lg:whitespace-nowrap">
            Browse the full cast, then use the character finder below to discover which Friend fits your personality.
          </p>
        </div>
        <div className="aspect-[16/7] bg-[linear-gradient(145deg,#F5E8D8,#EDD9C4)]">
          <img
            src="https://static.tvmaze.com/uploads/images/original_untouched/219/548045.jpg"
            alt="Friends cast promotional still"
            className="h-full w-full object-cover object-[center_3%]"
          />
        </div>
      </section>

      <StatusView
        loading={loading}
        error={error}
        hasData={Boolean(enrichedCast.length)}
        emptyMessage="No cast data was returned from the API."
      />

      {enrichedCast.length ? (
        <div className="space-y-6">
          {/* — Cast grid: always shows all characters — */}
          <section className="rounded-4xl border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_14px_40px_rgba(88,66,46,0.07)]">
            <SectionTitle
              eyebrow="Cast directory"
              title="All characters"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleCast.map((entry) => (
                <CharacterCard key={entry.person.id} character={entry} />
              ))}
            </div>

            {visibleCast.length < enrichedCast.length ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + 12)}
                  className="rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-5 py-3 text-sm font-medium text-[#3E3128] transition hover:-translate-y-0.5 hover:bg-[#F1E3D3]"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </section>

          {/* — Character finder: separate match experience — */}
          <MatchResultCard
            bestMatch={bestMatch}
            selectedCount={selectedCount}
            fallbackMessage="Select a few filters below to discover which Friend matches your personality and vibe."
          />

          <FilterPanel
            title="Filter the cast"
            description="Narrow by personality, job, or relationship energy to find your closest match."
            actions={
              selectedCount > 0 ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-2 text-sm font-medium text-[#6B5B52] transition hover:bg-[#F1E3D3]"
                >
                  Clear all
                </button>
              ) : null
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B52]">
                Job
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="rounded-2xl border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#3E3128] outline-none transition focus:border-[#8E6C88]"
                >
                  <option value="">Any job</option>
                  {jobOptions.map((job) => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B52]">
                Relationship
                <select
                  value={selectedRelationship}
                  onChange={(e) => setSelectedRelationship(e.target.value)}
                  className="rounded-2xl border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#3E3128] outline-none transition focus:border-[#8E6C88]"
                >
                  <option value="">Any relationship vibe</option>
                  {relationshipOptions.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B52]">
                Personality
              </p>
              <div className="flex flex-wrap gap-2">
                {personalityOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedPersonality((c) => (c === tag ? '' : tag))
                    }
                    className="rounded-full transition"
                  >
                    <TagChip tone="purple" active={selectedPersonality === tag}>
                      {tag}
                    </TagChip>
                  </button>
                ))}
              </div>
            </div>

            {matchResult.length === 0 && selectedCount > 0 ? (
              <EmptyState
                title="No character matches that combination"
                message="Try loosening one of the filters."
              />
            ) : null}
          </FilterPanel>
        </div>
      ) : null}
    </div>
  )
}

export default CastPage
