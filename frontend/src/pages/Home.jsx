import MainBanner from "../components/MainBanner";
import Services from "../components/Services";
import Partners from "../components/Partners";
import BottomBanner from "../components/BottomBanner";
import { useAppContext } from "../context/AppContext";
import Login from "../components/Login";

function Home() {
  const { showLogin, setShowLogin } = useAppContext();

  return (
    <>
      {/* PAGE CONTENT */}
      <div className={`pt-10 bg-gradient-to-r from-orange-300/70 to-amber-400/30 ${showLogin ? "blur-sm" : ""}`}>
        <MainBanner />
        <Services />
        <Partners />
        <BottomBanner />
      </div>

      {/* AUTH OVERLAY */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={()=>setShowLogin(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
