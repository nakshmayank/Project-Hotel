import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { state, setState, setShowLogin, axios, setUser, navigate } =
    useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identifier, setIdentifier] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (state === "register") {
        if (mobile.length !== 10) {
          alert("Enter valid 10-digit mobile number");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
      }

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        mobile,
        identifier,
        password,
      });
      
      if (data.success) {
        if (state === "login") {
          setUser(data.user);
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        setShowLogin(false);
        // toast.success(data.message);
      } else {
        // toast.error(data.message);
      }
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative">
      <form onSubmit={submitHandler}>
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>

        {state === "login" ? (
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        ) : (
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        )}

        {/* name */}
        {state === "register" && (
          <>
            <div className="w-full">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
                className="w-full border p-3 rounded mb-4 outline-orange-500/70"
                type="text"
                required
              />
            </div>

            {/* Email */}
            <div className="w-full ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                className="w-full border p-3 rounded mb-4 outline-orange-500/70"
                type="email"
                required
              />
            </div>

            {/* Mobile */}
            <div className="w-full ">
              <input
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full border p-3 rounded mb-4 outline-orange-500/70"
                type="number"
                required
              />
            </div>
          </>
        )}

        {/* Email or Mobile Number */}
        {state === "login" && (
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email/Mobile Number"
            className="w-full border p-3 rounded mb-4 outline-orange-500/70"
            required
          />
        )}

        {/* Password */}
        <div className="w-full ">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full border p-3 rounded mb-4 outline-orange-500/70"
            type="password"
            required
          />
        </div>

        {/* Confirm Password */}
        {state === "register" && (
          <div className="w-full">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm Password"
              className="w-full border p-3 rounded mb-4 outline-orange-500/70"
              type="text"
              required
            />
          </div>
        )}

        <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold">
          {state === "register" ? "Create Account" : "Login"}
        </button>

        {state === "register" ? (
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button
              onClick={() => setState("login")}
              className="text-orange-600 font-semibold"
            >
              Login
            </button>
          </p>
        ) : (
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => setState("register")}
              className="text-orange-600 font-semibold"
            >
              Register
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
