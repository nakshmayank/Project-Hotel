import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VisitorDashboard from "./pages/VisitorDashboard";

function App() {
  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/dashboard" element={<VisitorDashboard />} />
      </Routes>
      {<Footer />}
    </>
  );
}

export default App;
