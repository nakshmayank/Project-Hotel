import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

function VisitorDashboard() {
  const { axios, navigate } = useAppContext();
  const [stay, setStay] = useState(null);
  const [visitors, setVisitors] = useState([]);

  const fetchStayData = async () => {
    const res = await axios.get("/api/stays/my-stay");
    setStay(res.data.stay);
    setVisitors(res.data.visitors);
  };

  useEffect(() => {
    fetchStayData();
  }, []);

  const hasStay = !!stay;
  const isActiveStay = stay?.status === "ACTIVE";

  return (
    <>
      <Navbar />
      <div className="pt-24 p-6 bg-gray-50 min-h-screen">
        <div className="mx-96 relative">
          <div className="justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">My Stay</h1>

            {stay && (
              <div className="bg-orange-200 p-5 justify-center items-center rounded-lg">
                <div className="mb-6">
                  <p>
                    <b>Check-In:</b>{" "}
                    {new Date(stay.checkInTime).toLocaleString()}
                  </p>
                  <p>
                    <b>Status:</b> {stay.status}
                  </p>
                </div>

                <div className="flex gap-5">
                  {visitors.map((v, i) => (
                  <div key={i} className="bg-white p-4 mb-3 rounded shadow">
                    <p>
                      <b>Name:</b> {v.firstName} {v.lastName}
                    </p>
                    <p>
                      <b>Room:</b> {v.roomNo}
                    </p>
                    <p>
                      <b>Mobile:</b> {v.mobile}
                    </p>
                  </div>
                ))}
                </div>
                
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6 justify-end">
            {/* Check-In Button */}
            <button
              onClick={() => navigate("/checkin")}
              disabled={hasStay}
              className={`px-6 py-3 rounded font-semibold transition ${
                hasStay
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Check-In
            </button>

            {/* Check-Out Button */}
            <button
              onClick={() => navigate("/checkout")}
              disabled={!isActiveStay}
              className={`px-6 py-3 rounded font-semibold transition ${
                isActiveStay
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Check-Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitorDashboard;
