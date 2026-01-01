import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function CheckOut() {
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const maskMobile = (num) => num.replace(/(\d{0})\d{6}(\d{4})/, "$1******$2");

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/stays/checkout/send-otp", { mobile });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/stays/checkout/verify-otp", {
        mobile,
        otp,
      });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP resend countdown
  useEffect(() => {
    if (step === 2) {
      setTimer(30);
      setCanResend(false);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300/70 to-amber-400/30">
      <div className="flex justify-center items-center gap-40">
        <div className="w-[38%]">
          <img className="" src="/checkout_banner2.png" alt="checkout_banner" />
        </div>
        <div className="bg-gray-200/40 p-8 rounded-xl max-h-fit shadow-lg w-[23%]">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            Visitor Check-Out
          </h2>

          {/* SUCCESS */}
          {success && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-green-600 font-semibold">
                Check-Out Successful
              </p>
            </div>
          )}

          {/* STEP 1: MOBILE */}
          {!success && step === 1 && (
            <div className="flex flex-col items-center">
              <input
                className="w-full border-2 p-3 shadow-md rounded-lg bg-gray-100/70 placeholder:text-orange-600 focus:placeholder:text-gray-500 focus:border-orange-500 focus:shadow-lg outline-none mb-4"
                placeholder="Registered Mobile Number"
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
              />

              {error && <p className="text-orange-500 text-sm mb-2">{error}</p>}

              <button
                onClick={sendOtp}
                disabled={loading || mobile.length !== 10}
                className="w-fit p-5 bg-orange-600/80 hover:bg-orange-700/90 hover:shadow-xl text-white py-2 shadow-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {!success && step === 2 && (
            <>
              <p className="text-sm font-medium text-gray-800 mb-2">
                OTP sent to {maskMobile(mobile)}
              </p>

              <input
                className="w-full border-2 p-3 rounded-lg placeholder:text-orange-600 focus:placeholder:text-gray-500 focus:border-orange-500 outline-none mb-3"
                placeholder="Enter OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-green-500 text-white py-2 rounded disabled:bg-gray-300 mb-3"
              >
                {loading ? "Verifying..." : "Confirm Check-Out"}
              </button>

              {canResend ? (
                <button
                  onClick={sendOtp}
                  className="text-orange-700 text-sm underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-400 text-sm">Resend OTP in {timer}s</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
