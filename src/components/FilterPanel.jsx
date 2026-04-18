function FilterPanel({ title, description, children, actions }) {
  return (
    <section className="rounded-[1.8rem] border border-[#E8DCCF] bg-[#FFFAF3] p-5 shadow-[0_12px_36px_rgba(88,66,46,0.07)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-editorial text-xl tracking-[-0.02em] text-[#3E3128] sm:text-2xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6B5B52]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}

export default FilterPanel
