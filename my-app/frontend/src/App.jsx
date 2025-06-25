import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    // <div className="min-h-screen bg-zinc-900 font-sans antialiased text-gray-100">
    //   <div className="absolute inset-0 overflow-hidden">
    //     <div className="absolute inset-0">
    //       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.8)_0%,rgba(20,20,100,0.6)_45%,rgba(0,0,0,0.9)_100%)]" />
    //     </div>
    //   </div>

    //   <div className="relative z-50 pt-20">

    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.8)_0%,rgba(20,20,100,0.6)_45%,rgba(0,0,0,0.9)_100%)]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster
        position="bottom-right" // Or "top-center", etc.
        reverseOrder={false}
        gutter={8} // Space between toasts
        containerClassName=""
        containerStyle={
          {
            // Optional: Styles for the container div that holds all toasts
            // You might use this for global positioning or max-width if needed
          }
        }
        toastOptions={{
          // Default options for all toasts
          className: "", // Add custom classes if you want to use Tailwind directly on the toast wrapper

          // Style for the main toast body
          style: {
            background: "#1A1A1A", // Very dark black
            color: "#ADD8E6", // Light blue for text (lighter than the background of the error icon)
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Darker shadow
            border: "1px solid #333", // Subtle dark border
            borderRadius: "8px",
            padding: "16px",
          },
          duration: 3000, // Default duration for all toasts

          // Styles for different types of toasts
          success: {
            iconTheme: {
              primary: "#00BFFF", // Deep sky blue for the success checkmark
              secondary: "#1A1A1A", // Dark black for the background of the checkmark
            },
            style: {
              // You can override default styles here specifically for success toasts
              // background: '#2B2B2B', // Slightly different shade for success
            },
          },
          error: {
            iconTheme: {
              primary: "#FF6347", // Tomato red for the error X mark
              secondary: "#1A1A1A", // Dark black for the background of the X mark
            },
            style: {
              // background: '#2B2B2B', // Slightly different shade for error
            },
          },
          loading: {
            iconTheme: {
              primary: "#00BFFF", // Blue for loading spinner
              secondary: "#1A1A1A",
            },
            style: {
              // background: '#2B2B2B',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
