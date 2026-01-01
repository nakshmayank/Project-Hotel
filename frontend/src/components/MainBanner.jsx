import { useAppContext } from "../context/AppContext";

function MainBanner() {

  const { setState, setShowLogin} = useAppContext();

  return (
    <section className="relative m-20 bg-gradient-to-l from-purple-400/30 to-orange-300/30 rounded-xl transition-shadow shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-[60vh] flex items-center">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Digital Hotel Check-In & Check-Out System
          </h1>

          <p className="text-lg mb-6 text-gray-700">
            Replace handwritten registers with a fast, secure and digital
            visitor management solution for modern hotels.
          </p>

          <button onClick={()=>{setState("register"); setShowLogin(true)}} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-xl hover:bg-orange-700/90 transition">
            Get Started
          </button>
        </div>

        {/* Right: Banner Image */}
        <div className="hidden md:flex w-1/2 justify-end">
          <img
            src="/hero-banner.png"
            alt="Hotel Check-In Illustration"
            className="max-h-[70vh] object-contain"
          />
        </div>

      </div>
    </section>
  );
}

export default MainBanner;
