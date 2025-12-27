import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; //to send cookies in api request
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //to set backend url as default base url for any api call made through this axios package

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState("login");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
  try {
    const res = await axios.get("/api/user/is-auth");
    if (res.data.success) {
      setUser(res.data.user);
    } else {
      setUser(null);
    }
  } catch {
    setUser(null);
  } finally {
    setAuthLoading(false);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  const values = {
    state,
    setState,
    showLogin,
    setShowLogin,
    axios,
    setUser,
    navigate,
    user,
    authLoading,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
