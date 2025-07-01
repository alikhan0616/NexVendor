import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import { loadSeller } from "../../redux/actions/user";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);

  const [avatar, setAvatar] = useState();

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
            `${server}/shop/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Shop avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex 800px:w-[80%] w-full flex-col justify-center my-20 800px:my-10 ">
        <div className="w-full flex items-center justify-center">
          <div className="relative border-2 rounded-full border-slate-700">
            <img
              src={seller?.avatar.url}
              alt="product-img"
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-contain"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex justify-center  items-center cursor-pointer absolute bottom-[15px] right-[15px]">
              <input
                type="file"
                id="image"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera className="cursor-pointer" />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <form
          onSubmit={updateHandler}
          aria-required={true}
          className="flex flex-col items-center 800px:px-0 px-3 "
        >
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Shop Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={seller && seller.name}
              className={`${styles.input} bg-white !w-[100%] mb-4 800px:mb-0 `}
              required
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Shop Description</label>
            <textarea
              type="text"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                seller.description
                  ? seller.description
                  : "Enter shop description..."
              }
              className={`${styles.input} bg-white !w-[100%] mb-4 800px:mb-0 `}
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Shop Address</label>
            <input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={seller && seller.address}
              className={`${styles.input} bg-white !w-[100%] mb-4 800px:mb-0 `}
              required
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Shop Phone Number</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={seller && seller.phoneNumber}
              className={`${styles.input} bg-white !w-[100%] mb-4 800px:mb-0 `}
              required
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <label className="block pb-2">Shop Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder={seller && seller.zipCode}
              className={`${styles.input} bg-white !w-[100%] mb-4 800px:mb-0 `}
              required
            />
          </div>
          <br />
          <div className="w-full 800px:w-[50%]">
            <input
              type="submit"
              readOnly
              value="Update"
              className="mt-2 cursor-pointer appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
