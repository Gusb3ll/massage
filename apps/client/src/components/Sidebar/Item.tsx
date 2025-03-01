import Link from 'next/link'

type SidebarItemProps = {
  title: string
  route: string
  currentRoute: string
  icon: React.ReactNode
} & React.HTMLProps<HTMLButtonElement>

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  route,
  currentRoute,
  icon,
}) => {
  return (
    <Link
      href={route}
      className={`flex flex-row items-center justify-start gap-2 rounded-[6px] p-2 ${route === currentRoute ? 'bg-primary bg-opacity-10' : 'opacity-60'} hover:bg-primary transition-all hover:bg-opacity-10`}
    >
      {icon}
      <p className="text-md font-normal">{title}</p>
    </Link>
  )
}

export default SidebarItem
