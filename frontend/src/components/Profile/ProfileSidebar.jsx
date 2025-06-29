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

const ProfileSidebar = ({ active, setActive }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 1 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 2 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#FF6F00" : ""}
        />
        <span
          className={`${
            active === 3 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Refund
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 4 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 5 ? "#FF6F00" : ""}
        />
        <span
          className={`${
            active === 5 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <TbLockPassword size={20} color={active === 6 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 6 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Change Password
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 7 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Address
        </span>
      </div>
      {!isLoading && user && user.role == "Admin" && (
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8)}
        >
          <Link to="/admin/dashboard" className="flex">
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "#FF6F00" : ""}
            />
            <span
              className={`${
                active === 8 ? "text-[#FF6F00]" : ""
              } 800px:block hidden pl-3`}
            >
              Admin Dashboard
            </span>
          </Link>
        </div>
      )}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(9) || logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active === 9 ? "#FF6F00" : ""} />
        <span
          className={`${
            active === 9 ? "text-[#FF6F00]" : ""
          } 800px:block hidden pl-3`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
