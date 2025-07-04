import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (i) => {
    navigate(`/products?categories=${i.title}`);
    setDropDown(false);
  };

  return (
    <div className="w-[270px] bg-white shadow-xl rounded-lg overflow-hidden z-[9999] relative">
      {categoriesData && categoriesData.length > 0 ? (
        categoriesData.map((i, index) => (
          <div
            key={index}
            onClick={() => handleSubmit(i)}
            className="flex items-center px-4 py-3 gap-3 cursor-pointer hover:bg-orange-50 transition duration-150"
          >
            <img
              src={i.image_Url}
              alt={i.title}
              className="w-[28px] h-[28px] object-contain"
            />
            <span className="text-slate-700 font-medium text-sm">
              {i.title}
            </span>
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-center text-sm text-slate-500">
          No categories found.
        </div>
      )}
    </div>
  );
};

export default DropDown;
