import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Landing from "../pages/landing/Landing";
import UserHome from "../pages/user/UserHome";
import ProviderDashboard from "../pages/provider/ProviderDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Landing />}></Route>

        {/* USER */}
        <Route path="/user" element={<UserHome/>} />
        
        {/* Provider */}
        <Route path="/provider" element={<ProviderDashboard/>} />

      </Routes>
    </BrowserRouter>
  );
}
