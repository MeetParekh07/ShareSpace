function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="text-base font-semibold text-navy">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export default EmptyState
