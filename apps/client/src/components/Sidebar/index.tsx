import SidebarDesktop from './Desktop'
import SidebarMobile from './Mobile'

const Sidebar = () => {
  return (
    <div className="drawer w-0 md:min-w-[240px]">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <SidebarDesktop />
      <SidebarMobile />
    </div>
  )
}

export default Sidebar
