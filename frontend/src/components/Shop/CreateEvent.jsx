import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createEvent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    if (success) {
      toast.success("Event created successfully");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    if (!e.target.value) {
      setStartDate(null);
      setEndDate(null);
      document.getElementById("end-date").min = "";
      return;
    }
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate =
    startDate && !isNaN(startDate)
      ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      : today;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("finish_Date", endDate.toISOString());
    dispatch(createEvent(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="800px:w-[50%] w-[90%] bg-white h-[80vh] rounded-sm p-3 overflow-y-auto ">
      <h5 className="text-3xl font-[Poppins] text-center">Create Event</h5>
      {/* PRODUCT CREATION FORM */}
      <form onSubmit={handleSubmit}>
        <br />
        <div className="">
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Event product name..."
            required
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full border pt-2 px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event product description..."
            required
          ></textarea>
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            required
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option value={i.title} key={index}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div className="">
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Event product tags..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Event product price..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Event product price with discount..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            required
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Event product stock..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="stock"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            required
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Event product stock..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="stock"
            id="end-date"
            value={
              endDate && endDate instanceof Date && !isNaN(endDate)
                ? endDate.toISOString().slice(0, 10)
                : ""
            }
            required
            className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Event product stock..."
          />
        </div>
        <br />
        <div className="">
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i, index) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={index}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div className="">
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
