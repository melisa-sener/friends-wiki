function EmptyState({ title = 'No matches yet', message }) {
  return (
    <div className="rounded-[1.8rem] border border-dashed border-[#D6C7B7] bg-[#FFFAF3] px-6 py-12 text-center shadow-[0_10px_30px_rgba(88,66,46,0.05)]">
      <p className="font-['Georgia','Times_New_Roman',serif] text-2xl text-[#3E3128]">{title}</p>
      <p className="mt-3 text-[#6B5B52]">
        {message ?? 'Try a different search or reset your filters to see more results.'}
      </p>
    </div>
  )
}

export default EmptyState
