function TagChip({ children, tone = 'neutral', active = false }) {
  const tones = {
    neutral: active
      ? 'border-[#3E3128] bg-[#3E3128] text-[#FFFAF3]'
      : 'border-[#E8DCCF] bg-[#FFF7EE] text-[#6B5B52]',
    terracotta: active
      ? 'border-[#B86B4B] bg-[#B86B4B] text-[#FFFAF3]'
      : 'border-[#E8DCCF] bg-[#FFF4EF] text-[#B86B4B]',
    mustard: active
      ? 'border-[#D6A54B] bg-[#D6A54B] text-[#3E3128]'
      : 'border-[#E8DCCF] bg-[#FFF6E5] text-[#8D6A1F]',
    purple: active
      ? 'border-[#8E6C88] bg-[#8E6C88] text-[#FFFAF3]'
      : 'border-[#E8DCCF] bg-[#F7F0F7] text-[#7A5C74]',
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.01em] transition',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default TagChip
