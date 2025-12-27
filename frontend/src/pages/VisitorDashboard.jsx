import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

function VisitorDashboard() {
  const { axios, user, navigate } = useAppContext();
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/visitors/my-stay");
      setVisitor(res.data.visitor);
    } catch {
      setVisitor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/");
      } else {
        fetchDashboard();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [user]);

  const handleCheckIn = async () => {
    // await axios.post("/api/visitors/checkin", {
    //   name: user.name,
    //   mobile: "9999999999",
    //   roomNo: "102",
    // });
    // fetchDashboard();

    navigate("/checkin");
  };

  const handleCheckOut = async () => {
    // await axios.put("/api/visitors/checkout");
    // fetchDashboard();

    navigate("/checkout");
  };

  const hasStay = !!visitor;
  const isActiveStay = visitor && !visitor.checkOutTime;
  const isCompletedStay = visitor && visitor.checkOutTime;

  if (loading) return <Loader />;

  const isCheckedIn = visitor && !visitor.checkOutTime;

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600">Manage your hotel stay digitally</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Stay Information
          </h2>

          {visitor ? (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-medium">Room Number</p>
                <p>{visitor.roomNo}</p>
              </div>

              <div>
                <p className="font-medium">Mobile</p>
                <p>{visitor.mobile}</p>
              </div>

              <div>
                <p className="font-medium">Check-In</p>
                <p>{new Date(visitor.checkInTime).toLocaleString()}</p>
              </div>

              <div>
                <p className="font-medium">Check-Out</p>
                <p>
                  {visitor.checkOutTime
                    ? new Date(visitor.checkOutTime).toLocaleString()
                    : "Not Checked-Out"}
                </p>
              </div>
            </div>
          ) : (
            <p>No active stay</p>
          )}
        </div>

        <div className="max-w-4xl mx-auto flex gap-4 justify-end">
          <button
            disabled={hasStay}
            onClick={handleCheckIn}
            className="bg-green-500 font-semibold text-white px-6 py-3 rounded-lg disabled:bg-gray-300 hover:bg-green-600/60"
          >
            Check-In
          </button>

          <button
            disabled={!isActiveStay}
            onClick={handleCheckOut}
            className="bg-red-500 font-semibold text-white px-6 py-3 rounded-lg disabled:bg-gray-300 hover:bg-red-600/60"
          >
            Check-Out
          </button>
        </div>
      </div>
    </>
  );
}

export default VisitorDashboard;
