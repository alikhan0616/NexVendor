import { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { server } from "../../server";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Image should be in JPEG, JPG, or PNG format only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Please select an image for avatar.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      return;
    }
    setLoading(true);
    axios
      .post(`${server}/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setPasswordError("");
        navigate("/login");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Join NexVendor and start your journey!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 sm:text-sm"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 sm:text-sm"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className={`block w-full px-3 py-2 border ${
                    passwordError ? "border-red-500" : "border-slate-200"
                  } rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 sm:text-sm`}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-slate-400 hover:text-orange-600"
                    size={22}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-slate-400 hover:text-orange-600"
                    size={22}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 mt-1">{passwordError}</p>
              )}
            </div>
            {/* Profile Upload */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-slate-100  shadow">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-12 w-12 text-[#B66E41]" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-2 text-sm font-medium text-[#B66E41] bg-orange-50 hover:bg-orange-100 flex items-center justify-center px-4 py-2 border border-orange-200 rounded-md shadow-sm cursor-pointer transition"
                >
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full h-[44px] cursor-pointer disabled:opacity-45 flex justify-center items-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-[#B66E41] hover:bg-orange-600 shadow transition"
              type="submit"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
            {/* Already have account */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-slate-600">Already have an account?</span>
              <Link
                to="/login"
                className="text-[#B66E41] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
