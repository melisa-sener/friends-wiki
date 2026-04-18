function Footer() {
  return (
    <footer className="mt-16 border-t border-[#E8DCCF] px-2 py-8">
      <div className="flex flex-col gap-4 text-sm text-[#6B5B52] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-editorial text-lg text-[#3E3128]">Friends Wiki</p>
        </div>
        <div className="flex flex-col gap-1 text-xs sm:text-right">
          <p className="text-[#6B5B52]">Data via TVmaze API</p>
          <p className="text-[#6B5B52]">Built with React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
