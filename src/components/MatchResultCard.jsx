import TagChip from './TagChip.jsx'

function MatchResultCard({ bestMatch, selectedCount, fallbackMessage }) {
  return (
    <section className="rounded-4xl border border-[#D8C5B8] bg-[linear-gradient(135deg,#FFF8F1_0%,#F8EDE0_100%)] p-6 shadow-[0_16px_44px_rgba(88,66,46,0.09)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8E6C88]">
        Character match
      </p>

      {bestMatch ? (
        <>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-editorial text-3xl tracking-[-0.03em] text-[#3E3128]">
                {bestMatch.characterName}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-7 text-[#6B5B52]">
                {bestMatch.shortDescription}
              </p>
            </div>
            <TagChip tone="terracotta">Top match</TagChip>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <TagChip tone="mustard">{bestMatch.job}</TagChip>
            {bestMatch.personalityTags.slice(0, 3).map((tag) => (
              <TagChip key={tag} tone="purple">
                {tag}
              </TagChip>
            ))}
          </div>

          <p className="mt-4 text-xs text-[#6B5B52]">
            Based on {selectedCount} active filter{selectedCount === 1 ? '' : 's'}.
          </p>
        </>
      ) : (
        <>
          <h3 className="mt-4 font-editorial text-3xl tracking-[-0.03em] text-[#3E3128]">
            Discover your Friend
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6B5B52]">
            {fallbackMessage ??
              'Use the filters below to surface the character that fits your personality, job, and relationship style.'}
          </p>
        </>
      )}
    </section>
  )
}

export default MatchResultCard
