export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`w-fit px-8 max-w-full mx-auto ${className}`}>{children}</div>
}
