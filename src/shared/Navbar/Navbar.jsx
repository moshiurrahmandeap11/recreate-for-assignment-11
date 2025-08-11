import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import Loading from "../../components/Loading/Loading";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const photo = user?.photoURL;

  const profileDropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `${
      isActive ? "text-indigo-600 font-semibold" : "text-slate-700"
    } relative transition duration-200 hover:text-indigo-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all after:duration-300`;

  const links = (
    <>
      <NavLink
        to="/"
        className={navLinkClass}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/courses"
        className={navLinkClass}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Courses
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log("logout error", err));
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  if (loading) return <Loading />;

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between ">
      {/* Logo */}
      <div className="text-2xl font-bold text-primary">
        <NavLink to="/">Coursion</NavLink>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {links}
        {user && (
          <div className="space-x-6">
            <NavLink
              to="/addcourse"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add Course
            </NavLink>
            <NavLink
              to="/managecourse"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Manage Course
            </NavLink>
            <NavLink
              to="/my-enrolled-course"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Enrolled Courses
            </NavLink>
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </div>
        )}
      </div>

      {/* Desktop Auth Section */}
      <div
        className="hidden md:flex items-center gap-3 relative"
        ref={profileDropdownRef}
      >
        {user ? (
          <>
            <div
              onClick={toggleProfileDropdown}
              className="avatar cursor-pointer"
              title="Profile"
            >
              <div className="w-10 rounded-full">
                <img src={photo || "/default-avatar.png"} alt="User" />
              </div>
            </div>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-md border rounded-xl p-4 w-48 flex flex-col gap-2 z-50">
                <NavLink
                  to="/profile"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="text-slate-700 hover:text-indigo-600"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink to="/login">
              <button className="text-black font-semibold cursor-pointer">
                Login
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className="px-4 py-1 bg-transparent border-2 rounded cursor-pointer text-black transition">
                Sign Up
              </button>
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Section */}
      <div className="md:hidden">
        {user ? (
          // Profile picture on mobile toggles mobile menu
          <div onClick={toggleMobileMenu} className="avatar cursor-pointer">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL || "/default-avatar.png"} alt="User" />
            </div>
          </div>
        ) : (
          // Guest sees menu icon toggling mobile menu
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Slide Menu */}
      {isMobileMenuOpen && (
        <div
          className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between p-4">
            <div className="text-2xl font-bold text-indigo-600">
              <NavLink to="/" onClick={toggleMobileMenu}>
                Coursion
              </NavLink>
            </div>
            <button onClick={toggleMobileMenu}>
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-6">
            {links}
            {user && (
              <div className="flex flex-col gap-6">
                <NavLink
                  to="/addcourse"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Course
                </NavLink>
                <NavLink
                  to="/managecourse"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Manage Course
                </NavLink>
                <NavLink
                  to="/my-enrolled-course"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Enrolled Courses
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </div>
            )}

            {!user ? (
              <>
                <NavLink to="/login" onClick={toggleMobileMenu}>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition w-full">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup" onClick={toggleMobileMenu}>
                  <button className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition w-full">
                    Sign Up
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  onClick={toggleMobileMenu}
                  className="text-slate-700 hover:text-indigo-600"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="text-red-500 hover:text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
