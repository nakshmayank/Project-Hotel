import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function CheckIn() {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState([
    {
      firstName: "",
      lastName: "",
      mobile: "",
      idType: "",
      idNumber: "",
      roomNo: ""
    }
  ]);

  const addVisitor = () => {
    setVisitors([
      ...visitors,
      {
        firstName: "",
        lastName: "",
        mobile: "",
        idType: "",
        idNumber: "",
        roomNo: ""
      }
    ]);
  };

  const updateVisitor = (index, field, value) => {
    const updated = [...visitors];
    updated[index][field] = value;
    setVisitors(updated);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Check-In</h2>

      {visitors.map((v, i) => (
        <div key={i} className="bg-white p-4 mb-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" onChange={(e)=>updateVisitor(i,"firstName",e.target.value)} />
            <input placeholder="Last Name" onChange={(e)=>updateVisitor(i,"lastName",e.target.value)} />
            <input placeholder="Mobile" onChange={(e)=>updateVisitor(i,"mobile",e.target.value)} />
            <input placeholder="Room No" onChange={(e)=>updateVisitor(i,"roomNo",e.target.value)} />
            <select onChange={(e)=>updateVisitor(i,"idType",e.target.value)}>
              <option value="">ID Type</option>
              <option>Aadhaar</option>
              <option>PAN</option>
              <option>Passport</option>
              <option>Driving License</option>
            </select>
            <input placeholder="ID Number" onChange={(e)=>updateVisitor(i,"idNumber",e.target.value)} />
          </div>
        </div>
      ))}

      <button onClick={addVisitor} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
        + Add Visitor
      </button>

      <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded">
        Confirm Check-In
      </button>
    </div>
  );
}

export default CheckIn;
