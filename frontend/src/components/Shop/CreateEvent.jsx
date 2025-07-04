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
      dispatch({ type: "clearErrors" });
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

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setStartDate(null);
      setEndDate(null);
      document.getElementById("end-date").min = "";
      return;
    }
    const start = new Date(value);
    const minEnd = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(start);
    setEndDate(null);
    document.getElementById("end-date").min = minEnd.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 6) {
      toast.error("You can only upload up to 6 images.");
      return;
    }
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Image should be in JPEG, JPG, or PNG format only.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createEvent({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        images,
        shopId: seller._id,
        start_Date: startDate.toISOString(),
        finish_Date: endDate.toISOString(),
      })
    );
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 mx-auto">
      <h1 className="text-3xl font-semibold text-[#B66E41] text-center mb-6">
        Create Event
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 h-[70vh] px-1 overflow-y-auto"
      >
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event product name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Description *
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event product description..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-600"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Category *
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <option value="">Choose a category</option>
            {categoriesData.map((cat, i) => (
              <option key={i} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Event product tags..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Original Price
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Original price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Discount Price *
            </label>
            <input
              type="number"
              required
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Discount price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Stock *
          </label>
          <input
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Event product stock..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Event Start Date *
            </label>
            <input
              type="date"
              required
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Event End Date *
            </label>
            <input
              type="date"
              required
              id="end-date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Upload Images *
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
            required
          />
          <div className="flex items-center flex-wrap mt-2">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} className="text-[#B66E41]" />
            </label>
            {images.map((img, idx) => (
              <img
                src={img}
                key={idx}
                alt="preview"
                className="h-24 w-24 object-cover m-2 border border-gray-300 rounded-md"
              />
            ))}
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="Create"
            className="bg-[#B66E41] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#a15630] transition-colors cursor-pointer w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
