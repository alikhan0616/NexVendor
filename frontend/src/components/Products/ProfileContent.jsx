import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import Loader from "../../components/Layout/Loader";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInfo,
} from "../../redux/actions/user";
import axios from "axios";
import { getAllOrdersUser } from "../../redux/actions/order";

const ProfileContent = ({ active, setActive }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error]);
  const hanldeSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(email, password, phoneNumber, name));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multiport/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadUser());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="w-full ">
      {/* PROFILE PAGE */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#1D2D44]"
                alt="profile-icon"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex justify-center  items-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera className="cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={hanldeSubmit} aria-required={true}>
              <div className="w-full block 800px:flex pb-3">
                <div className="800px:w-[50%] w-full ">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="800px:w-[50%] w-full ">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full block 800px:flex pb-3">
                <div className="800px:w-[50%] w-full ">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="800px:w-[50%] w-full ">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <input
                className="w-[250px] h-[40px] border border-[#1D2D44] text-center text-[#1D2D44] rounded-[3px] mt-8 cursor-pointer"
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* ORDER PAGE */}
      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}

      {/* REFUND ORDER PAGE */}
      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}
      {/* TRACK ORDER PAGE */}
      {active === 5 && (
        <div className="">
          <TrackOrder />
        </div>
      )}

      {/* CHANGE PASSWORD PAGE */}
      {active === 6 && (
        <div className="">
          <ChangePassword />
        </div>
      )}

      {/* USER ADDRESS PAGE */}
      {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, []);
  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
        pagination
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
        pagination
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, []);
  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full  px-5">
      <h1 className="text-2xl text-center font-semibold text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          className="flex flex-col items-center"
          aria-required
          onSubmit={passwordChangeHandler}
        >
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Old Password</label>
            <input
              type="password"
              className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">New Password</label>
            <input
              type="password"
              className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-2">
            <label className="block pb-2">Confirm New Password</label>
            <input
              type="password"
              className={`${styles.input} bg-white !w-[95%] mb-4 800px:mb-0 `}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            className="w-[250px] h-[40px] border border-[#1D2D44] text-center text-[#1D2D44] rounded-[3px] mt-8 cursor-pointer"
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, addressLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="flex fixed z-10 w-full h-screen items-center top-0 left-0 bg-[#00000041] justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded relative shadow-md overflow-y-auto">
            <div className="w-full flex justify-end p-4">
              <RxCross1
                onClick={() => setOpen(false)}
                size={25}
                className="cursor-pointer"
              />
            </div>
            <h1 className="text-[25px] font-[Poppins] text-center">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-2">
                  <div className="w-full p-2">
                    <label className="block pb-2">
                      Country <span className="text-red-600">*</span>
                    </label>

                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] p-2 rounded-sm border-gray-200"
                    >
                      <option value="" className="block pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2">
                      Province/State <span className="text-red-600">*</span>
                    </label>

                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] p-2 rounded-sm border-gray-200"
                    >
                      <option value="" className="block pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2">
                      Address 1 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="address"
                      className={`${styles.input} px-2 border-gray-400`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input} px-2 border-gray-400`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2">
                      ZipCode <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      className={`${styles.input} px-2 border-gray-400`}
                      value={zipCode}
                      required
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full p-2">
                    <label className="block pb-2">
                      Address Type <span className="text-red-600">*</span>
                    </label>

                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] p-2 rounded-sm border-gray-200"
                    >
                      <option value="" className="block pb-2">
                        choose an address type
                      </option>
                      {addressTypeData.map((i) => (
                        <option value={i.name} key={i.name}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <input
                      type="submit"
                      value="Create"
                      required
                      readOnly
                      className="mt-4 cursor-pointer appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          onClick={() => setOpen(true)}
          className={`${styles.button} !rounded-md bg-[#B66E41] hover:bg-[#FF6F00] duration-300 `}
        >
          <span className="text-white ">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((i, index) => (
          <div
            key={index}
            className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold text-slate-900">
                {i.addressType}
              </h5>
            </div>
            <div className="pl-8 flex items-center ">
              <h6 className="text-xs 800px:text-base">{`${i.address1}  ${i?.address2}`}</h6>
            </div>
            <div className="pl-8 flex items-center ">
              <h6 className="hidden 800px:inline">{user?.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                onClick={() => handleDelete(i)}
                size={25}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-5 text-2xl">
          You don't have any saved addresses
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
