import { FaHistory, FaUserCog } from 'react-icons/fa'
// import { LuMailbox } from 'react-icons/lu'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { MdBook, MdDashboard, MdOutlineAddLocationAlt } from 'react-icons/md'
import { PiPersonArmsSpreadFill } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'

export const USER_ROUTES = [
  {
    title: 'Dashbord',
    route: '/dashboard',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/account',
    icon: <FaUserCog />,
  },
  {
    title: 'massager',
    route: '/dashboard/mailbox',
    icon: <PiPersonArmsSpreadFill />,
  },
  {
    title: 'Location',
    route: '/dashboard/mailbox',
    icon: <TfiLocationPin />,
  },
  {
    title: 'History',
    route: '/dashboard/mailbox',
    icon: <FaHistory />,
  },
  {
    title: 'Chat',
    route: '/dashboard/mailbox',
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    title: 'Booking',
    route: '/dashboard/mailbox',
    icon: <MdBook />,
  },
]

export const MASSAGER_ROUTES = [
  {
    title: 'Dashbord',
    route: '/massager',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/account',
    icon: <FaUserCog />,
  },
  {
    title: 'History',
    route: '/dashboard/mailbox',
    icon: <FaHistory />,
  },
  {
    title: 'Jobs',
    route: '/dashboard/mailbox',
    icon: <FaHistory />,
  },
]

export const PROPERTY_OWNER_ROUTES = [
  {
    title: 'Dashbord',
    route: '/property',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/account',
    icon: <FaUserCog />,
  },
  {
    title: 'Location',
    route: '/dashboard/mailbox',
    icon: <TfiLocationPin />,
  },
  {
    title: 'Add Location',
    route: '/dashboard/mailbox',
    icon: <MdOutlineAddLocationAlt />,
  },
  {
    title: 'History',
    route: '/dashboard/mailbox',
    icon: <FaHistory />,
  },
]
