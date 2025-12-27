import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function CheckIn() {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: "",
    idType: "",
    idNumber: "",
    roomNo: ""
  });

  const handleSubmit = async () => {
    await axios.post("/api/visitors/checkin", form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r z-10 from-orange-400/50 to-amber-400/30">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-6">
          Visitor Check-In
        </h2>

        {/* Name */}
        <input
          className="w-full border p-2 rounded mb-3 outline-orange-500"
          placeholder="Visitor Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Mobile */}
        <input
          className="w-full border p-2 rounded mb-3 outline-orange-500"
          placeholder="Mobile Number"
          maxLength={10}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />

        {/* ID Type */}
        <select
          className="w-full border p-2 rounded mb-3 outline-orange-500"
          value={form.idType}
          onChange={(e) =>
            setForm({ ...form, idType: e.target.value })
          }
        >
          <option value="">Select ID Type</option>
          <option value="Aadhaar">Aadhaar Card</option>
          <option value="PAN">PAN Card</option>
          <option value="Passport">Passport</option>
          <option value="Driving License">Driving License</option>
        </select>

        {/* ID Number */}
        <input
          className="w-full border p-2 rounded mb-3 outline-orange-500"
          placeholder="ID Number"
          onChange={(e) =>
            setForm({ ...form, idNumber: e.target.value })
          }
        />

        {/* Room No */}
        <input
          className="w-full border p-2 rounded mb-4 outline-orange-500"
          placeholder="Room Number"
          onChange={(e) =>
            setForm({ ...form, roomNo: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CheckIn;
