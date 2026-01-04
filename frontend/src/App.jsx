import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VisitorDashboard from "./pages/VisitorDashboard";
import Loader from "./components/Loader";
import { useAppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  const { authLoading } = useAppContext();

  if (authLoading) {
    return <Loader/>;
  }

  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={
    <ProtectedRoute>
      <CheckIn />
    </ProtectedRoute>
  } />
        <Route path="/checkout" element={
    <ProtectedRoute>
      <CheckOut />
    </ProtectedRoute>
  } />
        <Route path="/dashboard" element={
    <ProtectedRoute>
      <VisitorDashboard />
    </ProtectedRoute>
  } />
      </Routes>
      {<Footer />}
    </>
  );
}

export default App;
