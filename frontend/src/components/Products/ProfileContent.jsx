import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { updateUserInfo } from "../../redux/actions/user";
import axios from "axios";

const ProfileContent = ({ active, setActive }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  console.log(avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
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
        window.location.reload();
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

      {/* PAYMENT METHODS PAGE */}
      {active === 6 && (
        <div className="">
          <PaymentMethod />
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
  const orders = [
    {
      _id: "3bnj1lho219827121",
      orderItems: [
        {
          name: "Iphone 14 Pro Max ",
        },
      ],
      totalPrice: 340,
      orderStatus: "Processing",
    },
  ];
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
            <Link to={`/order/${params.id}`}>
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "PKR " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        autoPageSize
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "3bnj1lho219827121",
      orderItems: [
        {
          name: "Iphone 14 Pro Max ",
        },
      ],
      totalPrice: 340,
      orderStatus: "Processing",
    },
  ];
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
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
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
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "PKR " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        autoPageSize
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "PKR " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableRowSelectionOnClick
        autoPageSize
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div
          className={`${styles.button} !rounded-md bg-[#B66E41] hover:bg-[#FF6F00] duration-300 `}
        >
          <span className="text-white ">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            className="h-5"
            src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png"
            alt="payment-icon"
          />
          <h5 className="pl-5 font-semibold text-slate-900">Ali Khan</h5>
        </div>
        <div className="pl-8 flex items-center ">
          <h6 className="">1234 **** **** ****</h6>
          <h5 className="pl-6 ">08/2028</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
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
  const { user } = useSelector((state) => state.user);
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
    }
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="flex fixed z-10 w-full h-screen items-center top-0 left-0 bg-[#00000041] justify-center "></div>
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
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-semibold text-slate-900">Default</h5>
        </div>
        <div className="pl-8 flex items-center ">
          <h6 className="">House# 52, ABC Street, Burger Town, Capital City</h6>
        </div>
        <div className="pl-8 flex items-center ">
          <h6 className="">(062) 111-222-3</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
