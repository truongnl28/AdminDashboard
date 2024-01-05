import ShippingIcon from "../assets/icons/shipping.svg";
import UserIcon from "../assets/icons/user.svg";
import LocationIcon from "../assets/icons/location.svg";
import PointsIcon from "../assets/icons/points.svg";
import NotificationIcon from "../assets/icons/notification.svg";
import BadgeIcon from '../assets/icons/badge.svg';
const sidebar_menu = [
  {
    id: 1,
    icon: LocationIcon,
    path: "/",
    title: "Cấu hình khoảng cách",
  },
  {
    id: 2,
    icon: NotificationIcon,
    path: "/notificationPreference",
    title: "Cấu hình tần suất thông báo",
  },
  {
    id: 3,
    icon: PointsIcon,
    path: "/pointsConfigs",
    title: "Cấu hình điểm mặc định",
  },
  {
    id: 4,
    icon: ShippingIcon,
    path: "/manageProductCategories",
    title: "Quản lí danh mục sản phẩm",
  },
  {
    id: 5,
    icon: UserIcon,
    path: "/userManagement",
    title: "Quản lý người dùng",
  },
  {
    id: 6,
    icon: BadgeIcon,
    path: '/rank',
    title: 'Cấp bậc',
},
];

export default sidebar_menu;
