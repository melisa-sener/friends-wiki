import TagChip from './TagChip.jsx'

function LocationCard({ location }) {
  return (
    <article className="rounded-[1.9rem] border border-[#E8DCCF] bg-[#FFFAF3] p-6 shadow-[0_16px_46px_rgba(88,66,46,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(88,66,46,0.11)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8E6C88]">{location.type}</p>
          <h3 className="mt-1 font-['Georgia','Times_New_Roman',serif] text-2xl tracking-[-0.03em] text-[#3E3128]">
            {location.name}
          </h3>
        </div>
        <span
          className="h-4 w-4 rounded-full border border-white/80 shadow-sm"
          style={{ backgroundColor: location.accent }}
        ></span>
      </div>

      <p className="text-sm leading-6 text-[#6B5B52]">{location.description}</p>

    </article>
  )
}

export default LocationCard
