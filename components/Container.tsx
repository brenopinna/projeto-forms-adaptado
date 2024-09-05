export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`${className} py-6 w-full px-8 max-w-full mx-auto `}>{children}</div>
  )
}
