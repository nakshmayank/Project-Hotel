import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function VisitorDashboard() {
  const { axios, navigate, user } = useAppContext();
  const [stay, setStay] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [completedStays, setCompletedStays] = useState([]);
  const [completedVisitors, setCompletedVisitors] = useState([]);

  const fetchStayData = async () => {
    const res = await axios.get("/api/stays/my-stay");
    setStay(res.data.stay);
    setVisitors(res.data.visitors);
    setCompletedStays(res.data.completedStays || []);
    setCompletedVisitors(res.data.completedVisitors || []);
  };

  useEffect(() => {
    fetchStayData();
  }, []);

  const hasActiveStay = stay?.status === "ACTIVE";

  return (
    <>
      <div className="pt-24 p-6 bg-gradient-to-r from-orange-300/80 to-amber-400/30 min-h-screen">
        <div className="mx-96 relative">
          <div className="justify-center items-center">
            <div className="mb-5">
              <h1 className="text-2xl font-bold">
              Welcome, {user ? user.name : "Guest"}
            </h1>
            <h3 className="text-sm">Manage your stay digitally</h3>
            </div>

            {stay ? (
              <div className="bg-gray-200/40 p-5 justify-center items-center rounded-xl">
                <div className="mb-6">
                  <div className="mb-2">
                    <p className="font-bold text-xl text-orange-600">Stay Information</p>
                  </div>
                  <p>
                    <b>Full Name:</b>{" "}
                    {user.name}
                  </p>
                  <p>
                    <b>Email:</b>{" "}
                    {user.email}
                  </p>
                  <p>
                    <b>Mobile:</b>{" "}
                    {user.mobile}
                  </p>
                  <p>
                    <b>Check-In:</b>{" "}
                    {new Date(stay.checkInTime).toLocaleString()}
                  </p>
                  <p>
                    <b>Check-Out:</b>{" "}
                    {new Date(stay.checkInTime).toLocaleString()}
                  </p>
                  <p>
                    <b>Status:</b> {stay.status}
                  </p>
                </div>

                <div className="flex gap-5">
                  {visitors.map((v, i) => (
                    <div
                      key={i}
                      className="bg-gray-100/70 p-4 mb-3 rounded-xl shadow-md"
                    >
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
            ) : (
              <div className="bg-gray-200/40 p-5 shadow justify-center items-center rounded-xl">
                <div className="mb-6">
                  <p className="italic text-gray-900">
                    🌸 No active stay right now — ready for your next visit? 🌿
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6 justify-end">
            {/* Check-In Button */}
            <button
              onClick={() => navigate("/checkin")}
              disabled={hasActiveStay}
              className={`px-5 py-3 rounded-lg font-semibold transition shadow-md ${
                hasActiveStay
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-900/80 text-white hover:bg-purple-900/90"
              }`}
            >
              Check-In
            </button>

            {/* Check-Out Button */}
            <button
              onClick={() => navigate("/checkout")}
              disabled={!hasActiveStay}
              className={`px-5 py-3 rounded-lg font-semibold transition shadow-md ${
                hasActiveStay
                  ? "bg-orange-600/90 text-white hover:bg-orange-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Check-Out
            </button>
          </div>

          <div className="mt-14 p-5">
            {completedStays.length > 0 && (
              <div className="">
                <h2 className="text-xl font-bold mb-4">Your Previous Stays</h2>

                {completedStays.map((s) => (
                  <div
                    key={s._id}
                    className="bg-gray-200/40 p-4 mb-4 rounded-xl shadow"
                  >
                    <p>
                      <b>Check-In:</b>{" "}
                      {new Date(s.checkInTime).toLocaleString()}
                    </p>
                    <p>
                      <b>Check-Out:</b>{" "}
                      {new Date(s.checkOutTime).toLocaleString()}
                    </p>

                    {/* Visitors for this completed stay */}
                    <div className="mt-3 flex gap-4 flex-wrap">
                      {completedVisitors
                        .filter((v) => v.stayId === s._id)
                        .map((v, i) => (
                          <div
                            key={i}
                            className="bg-gray-100/70 p-3 rounded-xl shadow-md"
                          >
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitorDashboard;
