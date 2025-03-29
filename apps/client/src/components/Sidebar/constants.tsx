import { FaUserCog } from 'react-icons/fa'
import { MdBook, MdDashboard, MdOutlineAddLocationAlt } from 'react-icons/md'
import { PiPersonArmsSpreadFill } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'

export const USER_ROUTES = [
  {
    title: 'Home',
    route: '/',
    icon: <MdDashboard />,
  },
  {
    title: 'Account',
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
    route: '/dashboard/user/property',
    icon: <TfiLocationPin />,
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
    title: 'Booking',
    route: '/dashboard/massager/job',
    icon: <MdBook />,
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
    route: '/dashboard/property-owner/profile',
    icon: <FaUserCog />,
  },
  {
    title: 'Location',
    route: '/dashboard/property-owner/location',
    icon: <TfiLocationPin />,
  },
  {
    title: 'Add location',
    route: '/dashboard/property-owner/location/create',
    icon: <MdOutlineAddLocationAlt />,
  },
]
