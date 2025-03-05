import { CgWorkAlt } from 'react-icons/cg'
import { FaHistory, FaUserCog } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { MdBook, MdDashboard } from 'react-icons/md'
import { PiPersonArmsSpreadFill } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'

export const USER_ROUTES = [
  {
    title: 'Home',
    route: '/',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/user/account',
    icon: <FaUserCog />,
  },
  {
    title: 'Massager',
    route: '/dashboard/user/massager',
    icon: <PiPersonArmsSpreadFill />,
  },
  {
    title: 'Location',
    route: '/dashboard/user/location',
    icon: <TfiLocationPin />,
  },
  {
    title: 'History',
    route: '/dashboard/user/history',
    icon: <FaHistory />,
  },
  {
    title: 'Chat',
    route: '/dashboard/user/chat',
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    title: 'Booking',
    route: '/dashboard/user/booking',
    icon: <MdBook />,
  },
]

export const MASSAGER_ROUTES = [
  {
    title: 'Dashbord',
    route: '/dashboard/massager',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/massager/account',
    icon: <FaUserCog />,
  },
  {
    title: 'History',
    route: '/dashboard/massager/history',
    icon: <FaHistory />,
  },
  {
    title: 'Job',
    route: '/dashboard/massager/job',
    icon: <CgWorkAlt />,
  },
]

export const PROPERTY_OWNER_ROUTES = [
  {
    title: 'Dashbord',
    route: '/dashboard/property-owner',
    icon: <MdDashboard />,
  },
  {
    title: 'Your Account',
    route: '/dashboard/property-owner/account',
    icon: <FaUserCog />,
  },
  {
    title: 'Location',
    route: '/dashboard/property-owner/location',
    icon: <TfiLocationPin />,
  },
  {
    title: 'History',
    route: '/dashboard/property-owner/history',
    icon: <FaHistory />,
  },
]
