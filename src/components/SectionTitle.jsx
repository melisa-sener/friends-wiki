function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8E6C88]">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="font-editorial text-2xl tracking-[-0.03em] text-[#3E3128] sm:text-[1.7rem]">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-[#6B5B52]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export default SectionTitle
