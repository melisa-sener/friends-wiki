import { Link } from 'react-router-dom'
import TagChip from './TagChip.jsx'

function CharacterCard({ character, highlightLabel }) {
  return (
    <Link
      to={`/characters/${character.person.id}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-[#E8DCCF] bg-[#FFFAF3] shadow-[0_14px_40px_rgba(88,66,46,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(88,66,46,0.13)]"
    >
      <div className="aspect-4/4.5 bg-[linear-gradient(145deg,#F5E8D8,#EDD9C4)] p-3.5">
        <img
          src={character.image}
          alt={character.displayName}
          className="h-full w-full rounded-[1.2rem] object-cover object-[center_12%]"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-editorial text-2xl tracking-[-0.02em] text-[#3E3128]">
              {character.characterName}
            </h3>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8E6C88]">
              {character.displayName}
            </p>
          </div>
          {highlightLabel ? (
            <TagChip tone="terracotta" active>{highlightLabel}</TagChip>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-6 text-[#6B5B52]">{character.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <TagChip tone="mustard">{character.job}</TagChip>
          {character.personalityTags.slice(0, 2).map((tag) => (
            <TagChip key={tag} tone="purple">
              {tag}
            </TagChip>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default CharacterCard
