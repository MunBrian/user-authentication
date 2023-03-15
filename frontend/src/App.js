import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
