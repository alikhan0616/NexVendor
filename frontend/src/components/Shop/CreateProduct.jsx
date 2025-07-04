import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (success) {
      toast.success("Product created successfully");
      navigate("/dashboard");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  const handleImageChange = (e) => {
    e.preventDefault();
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
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-3xl mx-auto -mt-4 bg-white p-8 rounded-xl shadow text-slate-700">
      <h2 className="text-3xl font-bold text-center text-[#B66E41] mb-6">
        Create Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 h-[70vh] overflow-y-auto px-1"
      >
        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name..."
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description..."
            rows="4"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
          >
            <option value="">Choose a category</option>
            {categoriesData.map((i, idx) => (
              <option value={i.title} key={idx}>
                {i.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Product tags..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Original Price</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Original price..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Discount Price *</label>
            <input
              type="number"
              required
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Discounted price..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock *</label>
          <input
            type="number"
            value={stock}
            required
            onChange={(e) => setStock(e.target.value)}
            placeholder="Product stock..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-600 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Images *</label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
            required
          />
          <label
            htmlFor="upload"
            className="flex items-center gap-2 mt-2 text-orange-600 hover:text-orange-800 cursor-pointer"
          >
            <AiOutlinePlusCircle size={24} /> Upload Images
          </label>
          <div className="flex flex-wrap mt-3 gap-2">
            {images.map((img, i) => (
              <img
                src={img}
                key={i}
                alt="preview"
                className="h-[100px] w-[100px] object-cover rounded-md border border-slate-200"
              />
            ))}
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="Create Product"
            className="w-full bg-[#B66E41] hover:bg-orange-600 text-white py-2 rounded-md font-semibold shadow transition cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
