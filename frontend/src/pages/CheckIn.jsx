import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function CheckIn() {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [visitorForm, setVisitorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    idType: "",
    idNumber: "",
    roomNo: "",
  });

  const [visitors, setVisitors] = useState([]);

  const handleChange = (field, value) => {
    setVisitorForm({ ...visitorForm, [field]: value });
  };

  const addVisitor = () => {
    setVisitors([...visitors, visitorForm]);

    // reset form
    setVisitorForm({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      idType: "",
      idNumber: "",
      roomNo: "",
    });
  };

  const handleSubmit = async () => {
    const stayRes = await axios.post("/api/stays/start");
    const stayId = stayRes.data.stayId;

    for (let v of visitors) {
      await axios.post(`/api/stays/${stayId}/visitors`, v);
    }

    navigate("/dashboard");
  };

  return (
    <div className=" flex justify-between min-h-screen py-28 bg-gradient-to-r from-orange-300/80 to-amber-400/30">
      <div className="p-10 w-[45%] ml-24 rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-6">
          Visitor Check-In
        </h2>

        {/* 🔹 Visitor Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addVisitor();
          }}
        >
          <div className="mb-4 gap-3 grid bg-gray-200/40 p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 rounded-lg border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg  focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
                placeholder="First Name"
                value={visitorForm.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
              <input
                className="p-2 rounded-lg border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
                placeholder="Last Name"
                value={visitorForm.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>

            <input
              className="p-2 rounded-lg w-full border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
              placeholder="Email"
              value={visitorForm.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
              placeholder="Mobile"
              value={visitorForm.mobile}
              maxLength={10}
              onChange={(e) => handleChange("mobile", e.target.value)}
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
              placeholder="Address"
              value={visitorForm.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
            <input
              className="p-2 rounded-lg w-full border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
              placeholder="Room No"
              value={visitorForm.roomNo}
              onChange={(e) => handleChange("roomNo", e.target.value)}
              required
            />
            <div className="flex grid-cols-2 gap-4">
              <select
                className="w-[37%] p-2 rounded-lg border-2 shadow-md bg-gray-100/70 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
                value={visitorForm.idType}
                onChange={(e) => handleChange("idType", e.target.value)}
                required
              >
                <option value="">ID Type</option>
                <option>Aadhaar</option>
                <option>PAN</option>
                <option>Passport</option>
                <option>Driving License</option>
              </select>
              <input
                className="p-2 w-full rounded-lg border-2 shadow-md bg-gray-100/70 placeholder:text-orange-600/90 focus:shadow-lg focus:placeholder:text-gray-500/90 focus:border-orange-500/90 outline-none"
                placeholder="ID Number"
                value={visitorForm.idNumber}
                onChange={(e) => handleChange("idNumber", e.target.value)}
                required
              />
            </div>
          </div>

          {/* 🔹 Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <button
              type="submit"
              className="px-5 py-3 bg-purple-900/80 shadow-md text-white rounded-lg hover:bg-purple-900/90 hover:shadow-lg"
            >
              Add Visitor
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={visitors.length === 0}
              className={`px-5 py-3 font-semibold rounded-lg shadow ${
                visitors.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-600/80 text-white shadow-md hover:bg-orange-700/90 hover:shadow-lg"
              }`}
            >
              Confirm Check-In
            </button>
          </div>
        </form>

        {/* 🔹 Added Visitors List */}
        {visitors.length > 0 && (
          <div className="p-10">
            <h3 className="font-bold text-lg mb-3">Added Visitors</h3>
            <div className="flex flex-wrap bg-gray-200/40 p-4 rounded-xl gap-5">
              {visitors.map((v, i) => (
                <div
                  key={i}
                  className="bg-gray-100/70 shadow-md p-4 rounded-lg text-sm min-w-44"
                >
                  <p>
                    <strong>
                      {v.firstName} {v.lastName}
                    </strong>
                  </p>
                  <p>{v.mobile}</p>
                  <p>Room {v.roomNo}</p>
                  <p>
                    {v.idType} : {v.idNumber}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Side banner */}
      <div className="w-[45%] mr-24 flex items-center justify-center">
        <img className="max-w-xl" src="/checkin_banner2.png" alt="" />
      </div>
    </div>
  );
}

export default CheckIn;
