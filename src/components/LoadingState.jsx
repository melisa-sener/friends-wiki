function LoadingState({ title = 'Loading the Friends universe...', message }) {
  return (
    <div className="rounded-[1.8rem] border border-dashed border-[#D6C7B7] bg-[#FFFAF3] px-6 py-12 text-center shadow-[0_10px_30px_rgba(88,66,46,0.05)]">
      <div className="mx-auto mb-4 flex w-fit items-center gap-2">
        <span className="h-3 w-3 animate-pulse rounded-full bg-[#B86B4B]"></span>
        <span className="h-3 w-3 animate-pulse rounded-full bg-[#D6A54B] [animation-delay:120ms]"></span>
        <span className="h-3 w-3 animate-pulse rounded-full bg-[#556B5D] [animation-delay:240ms]"></span>
      </div>
      <p className="font-['Georgia','Times_New_Roman',serif] text-2xl text-[#3E3128]">{title}</p>
      <p className="mt-3 text-[#6B5B52]">
        {message ?? 'Pulling together a cozy batch of TVmaze data for you.'}
      </p>
    </div>
  )
}

export default LoadingState
