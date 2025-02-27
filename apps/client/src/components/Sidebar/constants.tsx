import { FaHistory, FaUserCog } from 'react-icons/fa'
// import { LuMailbox } from 'react-icons/lu'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { MdBook, MdDashboard } from 'react-icons/md'
import { PiPersonArmsSpreadFill } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'

export const EMAIL_ROUTES = [
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

// export const USER_ROUTES = [
//   {
//     title: 'ตั้งค่าผู้ใช้',
//     route: '/dashboard/profile',
//     icon: <FaUserCog />,
//   },
//   {
//     title: 'การสมัครสมาชิก',
//     route: '/dashboard/subscription',
//     icon: <MdAttachMoney />,
//   },
// ]

// export const HISTORY_ROUTES = [
//   {
//     title: 'ประวัติการใช้งาน',
//     route: '/dashboard/usage',
//     icon: <></>,
//   },
//   {
//     title: 'ประวัติการเติมเงิน',
//     route: '/dashboard/transaction',
//     icon: <></>,
//   },
// ]
