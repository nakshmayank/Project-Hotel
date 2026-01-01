import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const { setState, setShowLogin, user, setUser, navigate, authLoading } =
    useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open and the click is outside the menu's container
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (authLoading) return null;

  return (
    <nav className="fixed shadow-3xl top-0 transition-all backdrop-blur-sm w-full z-30 px-10 py-5 flex items-center justify-between">
      {/* Left - Logo */}
      <Link to="/" className="w-[8%]">
        <img className="" src="/logo.png" alt="" />
      </Link>

      {/* Center - Menu */}
      <div className="items-center gap-10 hidden md:flex">
        <Link
          to="/"
          className="text-gray-800 text-lg hover:text-orange-600 font-medium"
        >
          Home
        </Link>
        <Link
          to="#services"
          className="text-gray-800 text-lg hover:text-orange-600 font-medium"
        >
          Services
        </Link>
        <Link
          to="#contact"
          className="text-gray-800 text-lg hover:text-orange-600 font-medium"
        >
          Contact
        </Link>
      </div>

      {/* Right - Auth Buttons */}

      {user ? (
        <div className="relative group" ref={profileMenuRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img
              className="w-6 opacity-80 cursor-pointer transition duration-150 hover:scale-110"
              src="/profile_icon.svg"
              alt="profile"
            />
          </button>
          {showProfileMenu && (
            <ul className="absolute w-32 top-10 -right-0 shadow border py-2 w-30 rounded-md z-40 text-sm bg-white/70 backdrop-blur-xl border-b border-gray-100/10">
              <li
                onClick={() => {
                  navigate("/dashboard");
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex p-1.5 pl-3 gap-2 items-center hover:bg-orange-500/10 cursor-pointer font-medium"
              >
                <img className="w-4 opacity-80" src="/dashboard.png" alt="dashboard_icon" />
                <p>Dashboard</p>
              </li>
              <li
                onClick={() => {
                  setUser(null);
                  navigate("/");
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex p-1.5 pl-3 gap-2 hover:bg-orange-500/10 cursor-pointer font-medium"
              >
                <img className="w-4.5" src="/logout.svg" alt="logout_icon" />
                <p>Logout</p>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="space-x-4">
          <button
            onClick={() => {
              setState("login");
              setShowLogin(true);
            }}
            className="px-4 py-2 text-orange-600 border border-orange-600 rounded hover:bg-orange-50"
          >
            Login
          </button>

          <button
            onClick={() => {
              setState("register");
              setShowLogin(true);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
