function PageHeader({
  eyebrow,
  title,
  description,
  children,
  descriptionClassName = 'max-w-2xl',
}) {
  return (
    <section className="mb-8 overflow-hidden rounded-4xl border border-[#E8DCCF] bg-[linear-gradient(145deg,#FFFAF3_0%,#FFF4E8_100%)] p-7 shadow-[0_16px_48px_rgba(88,66,46,0.08)] sm:p-9">
      {eyebrow ? (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8E6C88]">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-editorial text-3xl tracking-[-0.03em] text-[#3E3128] sm:text-4xl lg:text-[2.8rem]">
            {title}
          </h2>
          <p className={`mt-3 text-base leading-7 text-[#6B5B52] ${descriptionClassName}`}>{description}</p>
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
    </section>
  )
}

export default PageHeader
