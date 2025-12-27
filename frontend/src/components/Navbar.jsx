import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar() {

  const { setState, setShowLogin, user, setUser, navigate, authLoading } = useAppContext();

  if (authLoading) return null;

  return (
    <nav className="bg-white/60 fixed shadow-3xl transition-all border-b border-gray-100/50 backdrop-blur-sm w-full z-30 px-10 py-5 flex items-center justify-between">
      
      {/* Left - Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-600">
        HotelCheck
      </Link>

      {/* Center - Menu */}
      <div className="items-center gap-10 hidden md:flex">
        <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">
          Home
        </Link>
        <Link to="#services" className="text-gray-700 hover:text-orange-600 font-medium">
          Services
        </Link>
        <Link to="#contact" className="text-gray-700 hover:text-orange-600 font-medium">
          Contact
        </Link>
      </div>

      {/* Right - Auth Buttons */}

      {user ? (<div className="space-x-4">
  <button onClick={()=>{setUser(null); navigate("/")}} className="px-4 py-2 text-orange-600 border border-orange-600 rounded hover:bg-orange-50">
    Logout
  </button>
      </div>) : (<div className="space-x-4">
  <button onClick={()=>{setState("login"); setShowLogin(true)}} className="px-4 py-2 text-orange-600 border border-orange-600 rounded hover:bg-orange-50">
    Login
  </button>

  <button onClick={()=>{setState("register"); setShowLogin(true)}} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700">
    Register
  </button>
      </div>)}
      
    </nav>
  );
}

export default Navbar;
