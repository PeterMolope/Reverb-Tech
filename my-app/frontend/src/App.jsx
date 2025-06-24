import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 font-sans antialiased text-gray-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.8)_0%,rgba(20,20,100,0.6)_45%,rgba(0,0,0,0.9)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
