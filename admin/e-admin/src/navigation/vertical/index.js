import {
  Mail,
  Home,
  Users,
  Package,
  User,
  Activity,
  BarChart,
  Truck,
  ShoppingCart,
  Pocket,
  Settings,
  Plus,
  LogOut,
  MessageCircle,
  Bookmark,
  Gift,
  Server
} from "react-feather"
import { IoWalletOutline } from "react-icons/io5"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsArrowsAngleContract } from "react-icons/bs"
import { PiUsersThreeBold } from "react-icons/pi"
import { VscListSelection } from "react-icons/vsc"
import { GrUpdate } from "react-icons/gr"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <BarChart size={20} />,
    navLink: "/dashboard"
  },
  {
    id: "advertisement",
    title: "Advertisement",
    icon: <Bookmark size={20} />,
    navLink: "/advertisement"
  }
]
