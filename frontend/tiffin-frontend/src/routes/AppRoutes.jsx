import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Landing from "../pages/landing/Landing";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Landing />}></Route>

        {/* USER */}
        <Route path="/" element={<Home/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
