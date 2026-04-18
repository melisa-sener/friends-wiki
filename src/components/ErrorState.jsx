function ErrorState({ message }) {
  return (
    <div className="rounded-[1.8rem] border border-[#E7C8BE] bg-[#FFF4EF] px-6 py-12 text-center shadow-[0_10px_30px_rgba(184,107,75,0.06)]">
      <p className="font-['Georgia','Times_New_Roman',serif] text-2xl text-[#3E3128]">
        Something spilled at Central Perk
      </p>
      <p className="mt-3 text-[#6B5B52]">{message}</p>
    </div>
  )
}

export default ErrorState
