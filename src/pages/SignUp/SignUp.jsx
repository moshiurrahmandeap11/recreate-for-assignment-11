import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import signuplottie from "../../assets/lottieReact/signup.json";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
  document.title = "Sign Up | Coursion";
}, [location.pathname]);

  const validations = [
    { id: 1, label: "At least 8 characters", valid: password.length >= 8 },
    { id: 2, label: "1 uppercase letter", valid: /[A-Z]/.test(password) },
    { id: 3, label: "1 lowercase letter", valid: /[a-z]/.test(password) },
    { id: 4, label: "1 number", valid: /[0-9]/.test(password) },
    {
      id: 5,
      label: "1 special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
    {
      id: 6,
      label: "Password doesn't include email",
      valid: !email || !password.includes(email),
    },
    {
      id: 7,
      label: "Passwords match",
      valid: password && password === confirmPassword,
    },
  ];

  const inputStyle =
    "w-full border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 py-2";

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    const { email, password, name, photo, ...restFormData } = userData;
    const fullUserData = { email, name, photo, ...restFormData };

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        if (user) {

          updateProfile(user, {
            displayName: name,
            photoURL: photo,
          })
            .then(() => {

              axios
                .post("https://coursion-server.vercel.app/users", fullUserData)
                .then((res) => {
                  const userDB = res.data;
                  console.log("User saved in DB:", userDB);

                  if (userDB.insertedId) {
                    Swal.fire({
                      title: "Sign Up Successful!",
                      icon: "success",
                      timer: 1500,
                    });
                  }


                  navigate(from, { replace: true });
                })
                .catch((err) => {
                  toast.warn("User created, but DB failed!");
                  console.error("MongoDB error:", err);
                });
            })
            .catch((err) => {
              toast.error("User created, but profile update failed!");
              console.error("Firebase profile update error:", err);
            });
        }
      })
      .catch((err) => {
        console.log("Sign up error", err);
        toast.error("Sign up failed");
        navigate("/signup")
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-transparent backdrop-blur-2xl border rounded-xl shadow-xl max-w-6xl w-full overflow-hidden">
        {/* Lottie Section */}
        <div className="lg:w-1/2 w-full p-6 flex items-center justify-center">
          <Lottie
            animationData={signuplottie}
            loop={true}
            className="w-full max-w-md"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full p-8">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
            Create an Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={inputStyle}
              required
            />
            <input
              type="url"
              name="photo"
              placeholder="Photo URL"
              className={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="your@gmail.com"
              className={inputStyle}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={inputStyle}
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setTouched(true)}
            />
            {touched && validations.some((v) => !v.valid) && (
              <ul className="text-sm space-y-1 mb-4">
                {validations.map((v) => (
                  <li
                    key={v.id}
                    className={`transition-colors duration-300 ${
                      v.valid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {v.label}
                  </li>
                ))}
              </ul>
            )}

            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className={inputStyle}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            />
          </form>
          <p className="pt-3 text-center">
            Already Have an Account?{" "}
            <Link className="text-primary font-semibold" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
