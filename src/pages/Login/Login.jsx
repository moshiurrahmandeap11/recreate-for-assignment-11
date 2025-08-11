import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import loginlottie from "../../assets/lottieReact/loginlottie.json";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login, loading, googleLogin, facebookLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    document.title = "Log In | Coursion";
  }, [location.pathname]);

  const inputStyle =
    "w-full border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 py-2";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => {
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleForgotPassword = () => {
    setResetEmail(emailInputRef.current?.value || "");
    setShowModal(true);
  };

  const handleReset = () => {
    if (!resetEmail) {
      toast.error("Please enter your email to reset.");
      return;
    }

    resetPassword(resetEmail)
      .then(() => {
        toast.success("Reset link sent to your email ");
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Failed to send reset link ");
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-transparent backdrop-blur-2xl border rounded-xl shadow-xl max-w-6xl w-full overflow-hidden">
        {/* Animation Side */}
        <div className="lg:w-1/2 w-full p-6 flex items-center justify-center">
          <Lottie animationData={loginlottie} loop className="w-full max-w-md" />
        </div>

        {/* Form Side */}
        <div className="lg:w-1/2 w-full p-8">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center">Login Please</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              placeholder="your@gmail.com"
              className={inputStyle}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`${inputStyle} pr-10`}
                required
              />
              <span
                onClick={togglePassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <p
              className="text-sm text-right text-blue-500 hover:underline cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>

            <input
              type="submit"
              value="Login"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            />
          </form>

          <p className="pt-3 text-center">
            Don’t have an account?{" "}
            <Link className="text-primary font-semibold" to="/signup">
              Sign Up
            </Link>
          </p>

          <div className="divider">OR</div>

          <div className="text-center mt-8">
            <h1 className="text-2xl font-bold text-primary mb-4">Login With</h1>
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={googleLogin}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-primary shadow-md transition"
              >
                <FaGoogle size={20} className="text-red-500" />
              </button>
              <button
                onClick={facebookLogin}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-primary hover:text-white transition"
              >
                <FaFacebook size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
