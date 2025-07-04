import { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { server } from "../../server";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-700 tracking-tight">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Welcome back to NexVendor!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 sm:text-sm"
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
            </div>
            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-700"
                >
                  Remember Me?
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#B66E41] hover:text-orange-600 transition"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            {/* Login Button */}
            <button
              className="w-full h-[44px] flex justify-center items-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-[#B66E41] hover:bg-orange-600 shadow transition"
              type="submit"
            >
              Login
            </button>
            {/* Sign Up Link */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-slate-600">Don't have an account?</span>
              <Link
                to="/sign-up"
                className="text-[#B66E41] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
