import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; import ReviewHistory from "./pages/ReviewHistory";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/history" element={<ReviewHistory />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/review" element={<CodeReview />} />
    </Routes>
  );
}

export default App;