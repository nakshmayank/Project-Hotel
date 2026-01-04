import { useAppContext } from "../context/AppContext";

const MainBanner = () => {

  const { setState, setShowLogin} = useAppContext();

  return (
    <section className="relative mx-5 my-14 md:m-20 bg-gradient-to-b md:bg-gradient-to-l
 from-purple-400/30 to-orange-300/30 rounded-xl transition-shadow shadow-xl">
      <div className="max-w-7xl mx-auto p-6 flex flex-col-reverse md:flex-row items-center">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight">
            Digital Hotel Check-In & Check-Out System
          </h1>

          <p className="text-lg mb-6 text-gray-700 md:max-w-none max-w-xl mx-auto">
            Replace handwritten registers with a fast, secure and digital
            visitor management solution for modern hotels.
          </p>

          <button onClick={()=>{setState("register"); setShowLogin(true)}} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-xl hover:bg-orange-700/90 transition">
            Get Started
          </button>
        </div>

        {/* Right: Banner Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
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
