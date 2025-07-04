import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const sidebarItems = [
  {
    label: "Profile",
    icon: RxPerson,
    id: 1,
  },
  {
    label: "Orders",
    icon: HiOutlineShoppingBag,
    id: 2,
  },
  {
    label: "Refund",
    icon: HiOutlineReceiptRefund,
    id: 3,
  },
  {
    label: "Inbox",
    icon: AiOutlineMessage,
    id: 4,
    onClick: (setActive, navigate) => {
      setActive(4);
      navigate("/inbox");
    },
  },
  {
    label: "Track Order",
    icon: MdOutlineTrackChanges,
    id: 5,
  },
  {
    label: "Change Password",
    icon: TbLockPassword,
    id: 6,
  },
  {
    label: "Address",
    icon: TbAddressBook,
    id: 7,
  },
];

const ProfileSidebar = ({ active, setActive }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div
      className="
      bg-white shadow-xl rounded-2xl
      flex flex-col gap-2 items-center
      w-16 min-w-16 h-full
      overflow-hidden
      md:w-full md:min-w-0 md:p-6 md:items-stretch
    "
    >
      {/* Profile info only on md+ screens */}
      <div className="mb-6 flex-col items-center hidden md:flex">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow">
          <RxPerson size={38} className="text-[#B66E41]" />
        </div>
        <span className="mt-3 text-lg font-bold text-[#B66E41] tracking-wide">
          {user?.name || "User"}
        </span>
        <span className="text-xs text-slate-400">{user?.email}</span>
      </div>
      {/* Sidebar nav: responsive */}
      <nav className="flex flex-col gap-1 w-full">
        <div className="flex flex-col justify-start w-full items-center md:items-stretch">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                className={`
                  flex items-center justify-center md:justify-start
                  w-12 h-12 md:w-full md:h-auto
                  px-0 md:px-4 py-0 md:py-3
                  rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-orange-50 text-[#FF6F00] shadow border-l-0 md:border-l-4 border-[#FF6F00]"
                      : "hover:bg-orange-50 text-slate-700"
                  }
                `}
                title={item.label}
                onClick={() =>
                  item.onClick
                    ? item.onClick(setActive, navigate)
                    : setActive(item.id)
                }
                type="button"
              >
                <Icon size={22} color={isActive ? "#FF6F00" : "#B66E41"} />
                <span
                  className={`
                    ml-0 md:ml-4 font-medium text-base transition-colors duration-200
                    ${
                      isActive ? "text-[#FF6F00]" : "group-hover:text-[#B66E41]"
                    }
                    hidden md:inline
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {!isLoading && user && user.role === "Admin" && (
          <Link
            to="/admin/dashboard"
            className={`
              flex items-center justify-center md:justify-start
              w-12 h-12 md:w-full md:h-auto
              px-0 md:px-4 py-0 md:py-3
              rounded-lg transition-all duration-200 group
              ${
                active === 8
                  ? "bg-orange-50 text-[#FF6F00] shadow border-l-0 md:border-l-4 border-[#FF6F00]"
                  : "hover:bg-orange-50 text-slate-700"
              }
            `}
            title="Admin Dashboard"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={22}
              color={active === 8 ? "#FF6F00" : "#B66E41"}
            />
            <span
              className={`
                ml-0 md:ml-4 font-medium text-base transition-colors duration-200
                ${
                  active === 8 ? "text-[#FF6F00]" : "group-hover:text-[#B66E41]"
                }
                hidden md:inline
              `}
            >
              Admin Dashboard
            </span>
          </Link>
        )}
        <button
          className={`
            flex items-center justify-center md:justify-start
            w-12 h-12 md:w-full md:h-auto
            px-0 md:px-4 py-0 md:py-3
            rounded-lg transition-all duration-200 group
            ${
              active === 9
                ? "bg-orange-50 text-[#FF6F00] shadow border-l-0 md:border-l-4 border-[#FF6F00]"
                : "hover:bg-orange-50 text-slate-700"
            }
          `}
          title="Log out"
          onClick={() => {
            setActive(9);
            logoutHandler();
          }}
          type="button"
        >
          <AiOutlineLogin
            size={22}
            color={active === 9 ? "#FF6F00" : "#B66E41"}
          />
          <span
            className={`
              ml-0 md:ml-4 font-medium text-base transition-colors duration-200
              ${active === 9 ? "text-[#FF6F00]" : "group-hover:text-[#B66E41]"}
              hidden md:inline
            `}
          >
            Log out
          </span>
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
