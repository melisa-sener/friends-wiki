import centralPerkImg from '../assets/central-perk.jpg'
import joeyAptImg from '../assets/joey-apt.jpg'
import monicaAptImg from '../assets/monica-apt.jpg'
import phoebeAptImg from '../assets/phoebe-apt.webp'
import rossAptImg from '../assets/ross-apt.jpg'
import PageHeader from '../components/PageHeader.jsx'
import { locations } from '../data/locations.js'

const locationImages = {
  'central-perk': centralPerkImg,
  'monicas-apartment': monicaAptImg,
  'joey-chandler-apartment': joeyAptImg,
  'ross-apartment': rossAptImg,
  'phoebe-apartment': phoebeAptImg,
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function LocationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Iconic Spaces"
        title="Spaces of Friends"
        description="Every great show lives in its places. Step through the rooms, corners, and cafés where it all happened."
        descriptionClassName="max-w-none lg:whitespace-nowrap"
      />

      <section className="overflow-hidden rounded-4xl border border-[#E8DCCF] bg-[#FFF8F1] shadow-[0_20px_60px_rgba(88,66,46,0.09)]">
        {locations.map((location, index) => {
          const image = locationImages[location.id]
          const isReversed = index % 2 === 1
          const panelBackground = `linear-gradient(145deg, ${hexToRgba(location.accent, 0.17)} 0%, ${hexToRgba(location.accent, 0.07)} 18%, rgba(255, 248, 241, 0.96) 45%, #FFF5EC 100%)`

          return (
            <article
              key={location.id}
              className={[
                'flex flex-col lg:flex-row',
                isReversed ? 'lg:flex-row-reverse' : '',
                index < locations.length - 1 ? 'border-b border-[#E8DCCF]' : '',
              ].join(' ')}
            >
              {/* Image panel with title overlay */}
              <div className="relative min-h-72 overflow-hidden lg:min-h-88 lg:w-[42%]">
                <img
                  src={image}
                  alt={location.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,16,0.05)_0%,rgba(27,20,16,0.22)_42%,rgba(27,20,16,0.72)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 px-7 py-8 lg:px-9 lg:py-10">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65">
                    {location.type}
                  </p>
                  <h2 className="font-editorial text-4xl leading-tight text-white lg:text-5xl">
                    {location.name}
                  </h2>
                </div>
              </div>

              {/* Info panel */}
              <div
                className="relative flex flex-1 flex-col justify-center overflow-hidden px-7 py-8 lg:px-12 lg:py-10"
                style={{ backgroundImage: panelBackground }}
              >
                <div
                  className="absolute right-[-3.5rem] top-[-3.5rem] h-36 w-36 rounded-full blur-3xl"
                  style={{ backgroundColor: hexToRgba(location.accent, 0.18) }}
                />
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="h-px w-12"
                      style={{ backgroundColor: location.accent }}
                    />
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{
                        backgroundColor: hexToRgba(location.accent, 0.12),
                        color: location.accent,
                      }}
                    >
                      Signature spot
                    </span>
                  </div>

                  <p className="max-w-lg text-lg leading-9 text-[#5F4D43]">
                    {location.description}
                  </p>

                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default LocationsPage
