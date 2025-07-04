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
  const [passwordError, setPasswordError] = useState("");
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
    if (!file) return;

    // Allowed types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Image should be in JPEG, JPG, or PNG format only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        await axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then((res) => {
            dispatch(loadUser());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0 && value.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="w-full">
      {/* PROFILE PAGE */}
      {active === 1 && (
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar.url}
                className="w-[140px] h-[140px] rounded-full object-cover border-4 border-[#B66E41] shadow-lg"
                alt="profile-icon"
              />
              <div className="w-[36px] h-[36px] bg-orange-100 border-2 border-[#B66E41] rounded-full flex justify-center items-center cursor-pointer absolute bottom-[8px] right-[8px] shadow">
                <input
                  type="file"
                  id="image"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera
                    className="cursor-pointer text-[#B66E41]"
                    size={22}
                  />
                </label>
              </div>
            </div>
          </div>
          <form
            onSubmit={hanldeSubmit}
            aria-required={true}
            className="w-full max-w-2xl mt-8 bg-white rounded-xl shadow-lg px-8 py-8"
          >
            <div className="w-full flex flex-col md:flex-row gap-6 mb-4">
              <div className="md:w-1/2 w-full">
                <label className="block pb-2 text-slate-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <label className="block pb-2 text-slate-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 mb-4">
              <div className="md:w-1/2 w-full">
                <label className="block pb-2 text-slate-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <label className="block pb-2 text-slate-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className={`block w-full px-3 py-2 border ${
                    passwordError ? "border-red-500" : "border-slate-200"
                  } rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white`}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            <button
              className="w-full h-[44px] flex justify-center items-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-[#B66E41] hover:bg-orange-600 shadow transition mt-4"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      )}

      {/* ORDER PAGE */}
      {active === 2 && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 mt-4">
          <AllOrders />
        </div>
      )}

      {/* REFUND ORDER PAGE */}
      {active === 3 && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 mt-4">
          <AllRefundOrders />
        </div>
      )}
      {/* TRACK ORDER PAGE */}
      {active === 5 && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 mt-4">
          <TrackOrder />
        </div>
      )}

      {/* CHANGE PASSWORD PAGE */}
      {active === 6 && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 mt-4">
          <ChangePassword />
        </div>
      )}

      {/* USER ADDRESS PAGE */}
      {active === 7 && (
        <div className="bg-white rounded-xl shadow-lg px-4 py-6 mt-4">
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
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Delivered"
              ? "bg-green-100 text-green-700"
              : params.value === "Processing refund"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span className="font-semibold text-[#B66E41]">{params.value}</span>
      ),
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-bold text-orange-600">{params.value}</span>
      ),
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
          <Link to={`/user/order/${params.id}`}>
            <Button
              className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow transition"
              style={{ minWidth: 0 }}
            >
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="pl-0 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
        pagination
        autoHeight
        sx={{
          borderRadius: 3,
          border: "none",
          boxShadow: 2,
          background: "#fff",
          "& .MuiDataGrid-columnHeaders": {
            background: "#FFF7F0",
            color: "#B66E41",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: "12px 12px 0 0",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #F3E8E0",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 15,
          },
          "& .MuiDataGrid-footerContainer": {
            background: "#FFF7F0",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "#B66E41",
          },
        }}
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
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Delivered"
              ? "bg-green-100 text-green-700"
              : params.value === "Processing refund"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span className="font-semibold text-[#B66E41]">{params.value}</span>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-bold text-orange-600">{params.value}</span>
      ),
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow transition"
            style={{ minWidth: 0 }}
          >
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
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
    <div className="pl-0 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
        pagination
        autoHeight
        sx={{
          borderRadius: 3,
          border: "none",
          boxShadow: 2,
          background: "#fff",
          "& .MuiDataGrid-columnHeaders": {
            background: "#FFF7F0",
            color: "#B66E41",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: "12px 12px 0 0",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #F3E8E0",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 15,
          },
          "& .MuiDataGrid-footerContainer": {
            background: "#FFF7F0",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "#B66E41",
          },
        }}
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
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Delivered"
              ? "bg-green-100 text-green-700"
              : params.value === "Processing refund"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span className="font-semibold text-[#B66E41]">{params.value}</span>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-bold text-orange-600">{params.value}</span>
      ),
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/track/order/${params.id}`}>
          <Button
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow transition"
            style={{ minWidth: 0 }}
          >
            <MdOutlineTrackChanges size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="pl-0 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        pageSize={10}
        pagination
        autoHeight
        sx={{
          borderRadius: 3,
          border: "none",
          boxShadow: 2,
          background: "#fff",
          "& .MuiDataGrid-columnHeaders": {
            background: "#FFF7F0",
            color: "#B66E41",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: "12px 12px 0 0",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #F3E8E0",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 15,
          },
          "& .MuiDataGrid-footerContainer": {
            background: "#FFF7F0",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "#B66E41",
          },
        }}
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("New password should be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    await axios
      .put(
        `${server}/user/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccess(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-8 py-8">
        <h1 className="text-2xl text-center font-semibold text-[#B66E41] pb-4">
          Change Password
        </h1>
        <form
          className="flex flex-col gap-5"
          aria-required
          onSubmit={passwordChangeHandler}
        >
          <div>
            <label className="block pb-2 text-slate-700 font-medium">
              Old Password
            </label>
            <input
              type="password"
              className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </div>
          <div>
            <label className="block pb-2 text-slate-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              className={`block w-full px-3 py-2 border ${
                error && newPassword.length < 6
                  ? "border-red-500"
                  : "border-slate-200"
              } rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block pb-2 text-slate-700 font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              className={`block w-full px-3 py-2 border ${
                error && newPassword !== confirmPassword && confirmPassword
                  ? "border-red-500"
                  : "border-slate-200"
              } rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 bg-white`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}
          <button
            type="submit"
            className="w-full h-[44px] flex justify-center items-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-[#B66E41] hover:bg-orange-600 shadow transition mt-2"
          >
            Update Password
          </button>
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
